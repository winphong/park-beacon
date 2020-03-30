const express = require("express");
const router = express.Router();
const { Reservation } = require("../model/reservation");
const _ = require("lodash");

// TODO: Add in customer middleware
router.get("/test", async (req, res) => {
  console.log("Called");
  res.send("testing!");
});

// Get all reservations of logged in customer
router.get("/", async (req, res) => {
  const reservations = await Reservation.find({ customerId }).sort({
    dateTime: -1
  });
  res.send(reservations);
});

// Update status of reservation
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { status: status.toUpperCase() },
    { new: true, useFindAndModify: false }
  );
  if (!reservation) {
    res.status(404).send("Reservation not found!");
  }
  res.send(reservation);
});

module.exports = router;
