const _ = require("lodash");
const { Reservation } = require("../model/reservation");
const { Carpark } = require("../model/carpark");
const { ParkingLot } = require("../model/parkingLot");
const carparks = require("./../util/carpark.json");
const parkingLots = require("./../util/parkingLots.json");

init = async () => {
  let lotsA = [];
  let lotsB = [];
  return await carparks.map(async (c, index) => {
    return await Promise.all(
      parkingLots.map(async (p) => {
        const parkingLot = new ParkingLot(p);
        if (parkingLot.parkingLotNumber.includes("A") && index === 0) {
          lotsA.push(parkingLot);
          await parkingLot.save();
        } else if (parkingLot.parkingLotNumber.includes("B") && index === 1) {
          lotsB.push(parkingLot);
          await parkingLot.save();
        }
      })
    )
      .then(async () => {
        const carpark = new Carpark(c);
        if (index === 0) carpark.parkingLots = lotsA;
        else carpark.parkingLots = lotsB;
        await carpark.save();
        lots = [];
        reset();
      })
      .catch((err) => console.log(err));
  });
};

reset = async () => {
  const carparks = await Carpark.find();
  carparks.map(async (carpark) => {
    carpark.numOfSlotAvailable = _.get(carpark, "parkingLots.length", 0);
    await carpark.save();
  });

  const parkingLots = await ParkingLot.find();
  parkingLots.map(async (parkingLot) => {
    parkingLot.status = "VACANT";
    await parkingLot.save();
  });

  const reservations = await Reservation.find();
  reservations.map(async (reservation) => {
    await reservation.remove();
  });
};

module.exports = {
  init,
  reset,
};
