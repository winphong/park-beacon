const mongoose = require("mongoose");

const carparkSchema = new mongoose.Schema({
  carparkName: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  landmark: {
    type: mongoose.Schema.Types.String
  },
  numOfSlotAvailable: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: 0
  },
  latitude: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  longitude: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  parkingLots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingLot"
    }
  ]
  // neighbouringCarparks: [
  //   {
  //     carParkName: { type: mongoose.Schema.Types.String, required: true },
  //     latitude: { type: mongoose.Schema.Types.Number, required: true },
  //     longitude: { type: mongoose.Schema.Types.Number, required: true }
  //   }
  // ],
});

const Carpark = mongoose.model("Carpark", carparkSchema);

exports.Carpark = Carpark;

// Import
// mongoimport --db=parkbeacon --collection=carparks --jsonArray --file=carpark.json

// Drop
// mongo parkbeacon --eval 'db.carparks.drop()'
