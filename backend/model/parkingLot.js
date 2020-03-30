const mongoose = require("mongoose");

const parkingLotSchema = new mongoose.Schema({
  parkingLotNumber: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ["RESERVED", "VACANT", "OCCUPIED"]
  },
  pin: {
    type: mongoose.Schema.Types.Number,
    required: true
  }
});

const ParkingLot = mongoose.model("ParkingLot", parkingLotSchema);

exports.ParkingLot = ParkingLot;
