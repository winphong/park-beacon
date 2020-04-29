const express = require("express");
const router = express.Router();
const { Reservation } = require("../model/reservation");
const { Customer } = require("../model/customer");
const { ParkingLot } = require("../model/parkingLot");
const { Carpark } = require("../model/carpark");
const axios = require("axios");
const _ = require("lodash");

// TODO: Add in customer middleware

/*
  Test push notification
*/
router.get("/pushNotification", async (req, res) => {
  const customers = await Customer.find();

  const message = {
    to: customers[0].pushNotificationToken,
    sound: "default",
    title: "Upcoming reservation",
    body: "You reservation at XX is coming up in 15 minutes!",
    // data: { data: "goes here" },
    _displayInForeground: true,
  };

  await axios
    .post("https://exp.host/--/api/v2/push/send", message, {
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      res.send("GOOD");
    })
    .catch((err) => {
      console.log(err.response.data.errors);
      res.status(400).send(err.response.data.errors);
    });
});

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
  Free up parking lot and increment num of available slot in carpark once the parked car leaves
  @body : 1) carparkName (written in GPIO programme)
          2) pin of the cone lowered after car leave (distance sensor on the floor of each parking lot?)
*/
router.post("/vacate", async (req, res) => {
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
