const { Reservation } = require("../model/reservation");
const { Carpark } = require("../model/carpark");
const { ParkingLot } = require("../model/parkingLot");
const _ = require("lodash");

init = () => {};

reset = async () => {
  const carparks = await Carpark.find();
  carparks.map(async carpark => {
    carpark.numOfSlotAvailable = _.get(carpark, "parkingLots.length", 0);
    await carpark.save();
  });

  const parkingLots = await ParkingLot.find();
  parkingLots.map(async parkingLot => {
    parkingLot.status = "VACANT";
    await parkingLot.save();
  });
};

module.exports = {
  init,
  reset
};
