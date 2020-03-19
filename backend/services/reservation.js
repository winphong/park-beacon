const { Reservation } = require("../model/reservation");
const _ = require("lodash");
const destinations = require("./../util/carpark.json");

console.log(destinations);

// Get all reservations of logged in customer
makeReservation = async (customerId, event) => {
  /* 
    TODO:
    1. Extract location from event and call getDistanceList(origin, destinations) to calculate shortest distance
    2. Loop through the list and attempt to make reservation
    3. Break if reservation is successful
    4. Else move on to the next carpark (nearest carpark is full)
    5. NOTE: Send push notification when the nearest carpark is full
  */
  console.log(customerId);
  console.log(event);
};

module.exports = {
  makeReservation
};
