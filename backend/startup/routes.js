const express = require("express");
const error = require("../middleware/error");
const reservation = require("../routes/reservations");
const auth = require("../routes/auth");

module.exports = app => {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/reservation", reservation);
  // app.use("/api/images", express.static("images"));
  // app.use("/api/admin", admin);

  app.use(error);
};
