const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  carpark: {
    carparkName: {
      type: mongoose.Schema.Types.String,
      required: true
      // enum : ["list of carpark in NUS"]
    },
    lat: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    lng: {
      type: mongoose.Schema.Types.Number,
      required: true
    }
  },
  parkingLotNumber: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ["RESERVED", "COMPLETED", "CANCELLED", "EXPIRED"],
    default: "RESERVED"
  },
  calendarEventId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  dateTime: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: new Date()
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
