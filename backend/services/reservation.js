const { Reservation } = require("../model/reservation");
const { Carpark } = require("../model/carpark");
const { ParkingLot } = require("../model/parkingLot");
const _ = require("lodash");
const carparks = require("./../util/carpark.json");
const { getDistanceList } = require("../services/map");
const logger = require("../util/logger")(module);
const axios = require("axios");

// Get all reservations of logged in customer
makeReservation = async (customerId, events) => {
  /* 
    TODO:
    0. Ensure the reservation has been made for the event (check calendarEventId in all reservations)
    1. Extract location from event and call getDistanceList(origin, destinations) to calculate shortest distance
    2. Loop through the list of carpark and attempt to make reservation
    3. Break if reservation is successful
    4. Else move on to the next carpark (nearest carpark is full)
    5. NOTE: Send push notification when the nearest carpark is full
  */

  let event;

  return new Promise(async (resolve, reject) => {
    // NOTE: Commented out to test
    let reservation;
    try {
      for (let i = 0; i < events.length; i++) {
        reservation = await Reservation.findOne({
          calendarEventId: events[i].id,
        });
        if (!reservation) {
          // prevent duplicate reservation for the same event
          event = events[i];
          break;
        }
      }
    } catch (err) {
      return;
    }

    if (!event) return;

    const destinations = carparks.map((carpark) =>
      _.pick(carpark, ["lat", "lng"])
    );
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
          (parkingLot) => parkingLot.status === "VACANT"
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
        releaseCode: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
      };
      reservation = new Reservation(body);

      const pi = process.env.PI_PORT;

      await reservation.save().then((response) => {
        // console.log(response);
        // Send parkingLot.pin to Flask to lower the conse
        axios
          .get(
            // `http://172.31.134.73:5001/api/reservation/${carparkName}/${parkingLot.pin}`
            `http://${pi}:5001/api/reservation/${carparkName}/${parkingLot.pin}`
          )
          .then(async (resp) => {
            logger.info(resp.data);
            setTimeout(() => {
              console.log("timeouted");
              axios
                .get(
                  `http://${pi}:5001/api/reservation/${carparkName}/${parkingLot.pin}/True`
                )
                .then(async () => {
                  console.log("cone lowered after timeout");

                  const parkingLot = await ParkingLot.findOne({
                    parkingLotNumber: response.parkingLotNumber,
                  });

                  // if after timeout and the parking lot is still not occupied
                  if (parkingLot.status === "RESERVED") {
                    parkingLot.status = "VACANT";

                    const carpark = await Carpark.findOne({
                      carparkName: response.carpark.carparkName,
                    });
                    carpark.numOfSlotAvailable = carpark.numOfSlotAvailable + 1;

                    const reservation = await Reservation.findOne({
                      calendarEventId: event.id,
                    });
                    // if parking lot is not occupied after timeout, reservation should still be RESERVED as well
                    if (reservation.status === "RESERVED") {
                      reservation.status = "EXPIRED";
                      await reservation.save();
                    }

                    await carpark.save();
                    await parkingLot.save();
                  }
                });
            }, 30000);
            resolve("Done");
            // TODO: break out of the loop once reservation is made
          })
          .catch((err) => {
            console.log(err);
            logger.error(err);
          });
      });
      console.log("\nBreaking\n");
      break;
    }
  });
};

module.exports = {
  makeReservation,
};
