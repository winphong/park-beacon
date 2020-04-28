const express = require("express");
const router = express.Router();
const { Reservation } = require("../model/reservation");
const { Customer } = require("../model/customer");
const { ParkingLot } = require("../model/parkingLot");
const { Carpark } = require("../model/carpark");
const _ = require("lodash");

// TODO: Add in customer middleware

// Get all reservations of logged in customer
router.get("/:id", async (req, res) => {
  const customerId = req.params.id;
  const reservations = await Reservation.find({ customerId }).sort({
    dateTime: -1,
  });
  res.send(reservations);
});

/* 
  Mark reservation status as complete
  @body : carplate from the pi camera scan result
*/
router.post("/attend", async (req, res) => {
  const { carplate } = req.body;
  const customer = await Customer.findOne({ carplate });
  if (!customer) res.status(404).send("Carplate not registered to any user!");

  const reservation = await Reservation.findOne({
    customerId: customer._id,
    status: "RESERVED",
  });
  if (!reservation) {
    res.status(404).send("No reservation found!");
  }

  const parkingLot = await ParkingLot.findOne({
    parkingLotNumber: reservation.parkingLotNumber,
  });

  parkingLot.status = "OCCUPIED";
  reservation.status = "COMPLETED";

  await parkingLot.save();
  await reservation.save();

  res.send(reservation);
});

/* 
  Mark reservation as cancelled and free up parking lot and increment num of available slot in carpark
  @param : reservationId
*/
router.post("/cancel/:id", async (req, res) => {
  const reservationId = req.params.id;

  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    res.status(404).send("Reservation not found!");
  }

  const parkingLot = await ParkingLot.findOne({
    parkingLotNumber: reservation.parkingLotNumber,
  });

  const carpark = await Carpark.findOne({
    carparkName: reservation.carpark.carparkName,
  });

  carpark.numOfSlotAvailable = carpark.numOfSlotAvailable + 1;
  parkingLot.status = "VACANT";
  reservation.status = "CANCELLED";

  await carpark.save();
  await parkingLot.save();
  await reservation.save();

  res.send(reservation);
});

/* 
  Mark reservation as cancelled and free up parking lot and increment num of available slot in carpark
  @param : reservationId
*/
router.post("/vacate/:pin", async (req, res) => {
  const { carparkName, pin } = req.body;

  const parkingLot = await ParkingLot.findOne({ pin });
  if (!parkingLot) {
    res.status(404).send("Parking lot not found!");
  }

  const carpark = await Carpark.findOne({
    carparkName,
    parkingLots: parkingLot._id,
  });

  carpark.numOfSlotAvailable = carpark.numOfSlotAvailable + 1;
  parkingLot.status = "VACANT";

  await carpark.save();
  await parkingLot.save();

  res.send(reservation);
});

module.exports = router;
