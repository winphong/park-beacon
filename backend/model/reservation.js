const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  carParkName: {
    type: mongoose.Schema.Types.String,
    required: true
    // enum : ["list of carpark in NUS"]
  },
  parkingLotNumber: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ["RESERVED", "COMPLETED", "CANCELLED", "EXPIRED"]
  },
  calendarEventId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  dateTime: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  releaseCode: {
    type: mongoose.Schema.Types.Number,
    // required: true,
    minlength: 4,
    maxlength: 4
  }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

exports.Reservation = Reservation;
