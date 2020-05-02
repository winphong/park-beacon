const express = require("express");
const router = express.Router();
const { Reservation } = require("../model/reservation");
const { Customer } = require("../model/customer");
const { ParkingLot } = require("../model/parkingLot");
const { Carpark } = require("../model/carpark");
const axios = require("axios");
const _ = require("lodash");
const pi1 = process.env.PI_IP_1;
const pi2 = process.env.PI_IP_2;

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
      res.send("Push notification test success");
    })
    .catch((err) => {
      if (err.response.data) res.status(400).send(err.response.data.errors);
    });
});

// Get all reservations of logged in customer
router.get("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  const reservations = await Reservation.find({ customerId }).sort({
    dateTime: -1,
  });

  res.send(reservations);
});

/* 
  Mark reservation status as complete
  @body : carplate from the pi camera scan result
  
  @client : camera 
*/
router.post("/attend", async (req, res) => {
  const { carplates } = req.body;
  let customer;
  let response;

  Promise.all(
    carplates.map(async (carplate) => {
      response = await Customer.findOne({ carPlateNumber: carplate });
      if (response) customer = response;
    })
  )
    .then(async () => {
      if (!customer)
        return res.status(404).send("Carplate not registered to any user!");

      const reservation = await Reservation.findOne({
        customerId: customer._id,
        status: "RESERVED",
      });
      if (!reservation) {
        return res.status(404).send("No reservation found!");
      }

      if (!(customer && reservation))
        return res
          .status(404)
          .send(
            `The customer with carplate ${carplate} does not have any upcoming reservation`
          );

      const parkingLot = await ParkingLot.findOne({
        parkingLotNumber: reservation.parkingLotNumber,
      });

      const carparkName = reservation.carpark.carparkName;
      console.log(carparkName);
      if (reservation)
        if (carparkName === "Car Park 11")
          await axios.get(
            `http://${pi2}:5001/api/reservation/${carparkName}/${parkingLot.pin}/True`
          );
        else if (carparkName === "Car Park 15")
          await axios.get(
            `http://${pi1}:5001/api/reservation/${carparkName}/${parkingLot.pin}/True`
          );

      parkingLot.status = "OCCUPIED";
      reservation.status = "COMPLETED";

      await parkingLot.save();
      await reservation.save();

      res.send(reservation);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("ERROR");
    });
});

/* 
  Mark reservation as cancelled and free up parking lot and increment num of available slot in carpark
  @param : reservationId
  
  @client : customer (mobile app) 
*/
router.post("/cancel/:reservationId", async (req, res) => {
  const reservationId = req.params.reservationId;

  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    return res.status(404).send("Reservation not found!");
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

  // lower the cone
  const carparkName = reservation.carpark.carparkName;
  if (carparkName === "Car Park 11")
    await axios.get(
      `http://${pi2}:5001/api/reservation/${carparkName}/${parkingLot.pin}/True`
    );
  else if (carparkName === "Car Park 15")
    await axios.get(
      `http://${pi1}:5001/api/reservation/${carparkName}/${parkingLot.pin}/True`
    );
  await carpark.save();
  await parkingLot.save();
  await reservation.save();

  const reservations = await Reservation.find({
    customerId: reservation.customerId,
  });

  res.send(reservations);
});

/* 
  Free up parking lot and increment num of available slot in carpark once the parked car leaves
  @body : 1) carparkName (written in GPIO programme)
          2) pin of the cone lowered after car leave (distance sensor on the floor of each parking lot?)

  @client : CPXX-GPIO.py 
*/
router.post("/vacate", async (req, res) => {
  const { carparkName, pin } = req.body;

  const parkingLot = await ParkingLot.findOne({ pin });

  if (!parkingLot) {
    return res.status(404).send("Parking lot not found!");
  } else if (parkingLot.status !== "OCCUPIED") {
    return res
      .status(400)
      .send("Parking lot is not occupied in the first place");
  }

  const carpark = await Carpark.findOne({
    carparkName,
    parkingLots: parkingLot._id,
  });

  carpark.numOfSlotAvailable = carpark.numOfSlotAvailable + 1;
  parkingLot.status = "VACANT";

  await carpark.save();
  await parkingLot.save();

  res.send("Parking lot is now vacated");
});

module.exports = router;
