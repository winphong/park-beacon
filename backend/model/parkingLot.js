const mongoose = require("mongoose");

const parkingLotSchema = new mongoose.Schema({
  parkingLotId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  parkingLotNumber: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ["RESERVED", "VACANT", "OCCUPIED"]
  }
});

const ParkingLot = mongoose.model("ParkingLot", parkingLotSchema);

exports.ParkingLot = ParkingLot;
