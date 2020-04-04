const { getAllCustomer } = require("../services/customer");
const { authorise } = require("../services/oauth");
const { listEvents } = require("../services/calendar");
const { makeReservation } = require("../services/reservation");
const logger = require("../util/logger")(module);
const axios = require("axios");
const _ = require("lodash");
const async = require("async");

module.exports = async () => {
  setInterval(async () => {
    const customers = await retrieveAllCustomer();
    const customer_events = await checkUpcomingEvents(customers);
    console.log("timerr");
    await makeReservationForAllUpcomingEvents(customer_events);
  }, 60000);

  /*
  1. Retrieve token of all customers
  2. Use token to call API to check for upcoming events
  TODO: 3. Make reservation based on the upcoming events-> Send push notification

  TODO: a. Check for expired reservation and free up the parking lot
  */
};

retrieveAllCustomer = async () => {
  const customers = await getAllCustomer();
  return customers;
};

checkUpcomingEvents = async (customers) => {
  return await Promise.all(
    customers.map(async (customer) => {
      const oAuth2Client = authorise(customer.token);
      const events = await listEvents(oAuth2Client);
      // if (events.length > 0) {
      return { customer, events };
      // }
    })
  ).then((response) => {
    // a list of {customer, events} object
    return response.filter((e) => {
      return e.events.length > 0;
    });
  });
  // return an object of {customer, upcomingEvent}
};

makeReservationForAllUpcomingEvents = async (customer_events) => {
  customer_events.map(({ customer, events }) => {
    async.waterfall(
      [
        function doOne(callback) {
          // Try getting the data from the first website
          makeReservation(customer._id, events[0])
            .then((response) => {
              console.log("response");
              console.log(response);
              callback(null);
            })
            .catch((err) => callback(err, null));
        },
        function doTwo(callback) {
          makeReservation(customer._id, events[1])
            .then((response) => {
              console.log("response");
              console.log(response);
              callback(null);
            })
            .catch((err) => callback(err, null));
        },
        function doThree(callback) {
          // Try getting the data from the first website
          makeReservation(customer._id, events[2])
            .then((response) => {
              console.log("response");
              console.log(response);
              callback(null);
            })
            .catch((err) => callback(err, null));
        },
        function doFour(callback) {
          makeReservation(customer._id, events[3])
            .then((response) => {
              console.log("response");
              console.log(response);
              callback(null);
            })
            .catch((err) => callback(err, null));
        },
      ],
      // optional callback
      function (err, results) {
        console.log(results);
        console.log(err);

        // Now do something with the data.
      }
    );
  });
};

checkExpiredReservation = () => {};
