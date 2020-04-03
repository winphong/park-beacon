const { Reservation } = require("../model/reservation");
const { Carpark } = require("../model/carpark");
const { ParkingLot } = require("../model/parkingLot");
const _ = require("lodash");
const carparks = require("./../util/carpark.json");
const { getDistanceList } = require("../services/map");
const logger = require("../util/logger")(module);
const axios = require("axios");

// Get all reservations of logged in customer
makeReservation = async (customerId, event) => {
  /* 
    TODO:
    0. Ensure the reservation has been made for the event (check calendarEventId in all reservations)
    1. Extract location from event and call getDistanceList(origin, destinations) to calculate shortest distance
    2. Loop through the list of carpark and attempt to make reservation
    3. Break if reservation is successful
    4. Else move on to the next carpark (nearest carpark is full)
    5. NOTE: Send push notification when the nearest carpark is full
  */

  /** NOTE: Commented out to test
   * let reservation = await Reservation.findOne({ calendarEventId: event.id });
     if (reservation) return; // don't make duplicate reservation for the same event
   */

  const destinations = carparks.map(carpark => _.pick(carpark, ["lat", "lng"]));
  const response = await getDistanceList(event.location, destinations);

  const distanceList = _.get(response, "rows[0].elements");

  const carparkDistanceList = carparks.map((e, index) => {
    return { ...carparks[index], ...distanceList[index] };
  });
  carparkDistanceList.sort((a, b) => a.distance.value - b.distance.value);

  let carpark;
  let parkingLot;

  for (let i = 0; i < carparkDistanceList.length; i++) {
    const { carparkName, lat, lng } = carparkDistanceList[i];

    // Check carpark for empty slot
    carpark = await Carpark.findOne({ carparkName })
      .populate("parkingLots", "-__v")
      .select("-__v");

    if (!carpark) throw Error("Carpark not found");
    if (carpark.numOfSlotAvailable > 0) {
      carpark.numOfSlotAvailable = carpark.numOfSlotAvailable - 1;

      const { _id } = carpark.parkingLots.find(
        parkingLot => parkingLot.status === "VACANT"
      );
      parkingLot = await ParkingLot.findById(_id);
      parkingLot.status = "RESERVED";

      console.log("checking carpark availability");

      await parkingLot.save();
      await carpark.save();
    } else {
      // check next carpark
      continue;
    }

    console.log("making reservation");

    // Make reservation
    const body = {
      carpark: { carparkName, lat, lng },
      parkingLotNumber: parkingLot.parkingLotNumber,
      customerId,
      calendarEventId: event.id,
      releaseCode: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    };
    reservation = new Reservation(body);
    await reservation.save().then(() => {
      // TODO: Send parkingLot.pin to Flask to lower the conse
      axios
        .get(
          // `http://172.31.134.73:5001/api/reservation/${carparkName}/${parkingLot.pin}`
          `http://localhost:5001/api/reservation/${carparkName}/${parkingLot.pin}`
        )
        .then(response => {
          logger.info(response.data);
          setTimeout(() => {
            console.log("timeouted");
            axios
              .get(
                `http://localhost:5001/api/reservation/${carparkName}/${parkingLot.pin}/True`
              )
              .then(async () => {
                console.log("cone lowered after timeout");
                carpark.numOfSlotAvailable = carpark.numOfSlotAvailable + 1;
                await carpark.save();
              });
          }, 60000 / 2);
        })
        .catch(err => logger.error(err));
      // TODO: break out of the loop once reservation is made
    });
  }
};

module.exports = {
  makeReservation
};
