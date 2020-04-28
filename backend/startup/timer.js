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
    console.log("timer");
    const customers = await retrieveAllCustomer();
    const customer_events = await checkUpcomingEvents(customers);
    await makeReservationForAllUpcomingEvents(customer_events);
  }, 10000);

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
      // console.log(events);
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
  let index = 0;

  async.map(customer_events, ({ customer, events }) => {
    setTimeout(() => {
      // async.waterfall(
      //   [
      //     function doOne(callback) {
      //       // Try getting the data from the first website
      //       makeReservation(customer._id, events[0])
      //         .then(async (response) => {
      //           await sleep(5000).then(() => {
      //             console.log(events.length);

      //             if (events.length === 1) {
      //               console.log("if");
      //               callback(err, null);
      //             } else callback(null);
      //           });
      //         })
      //         .catch((err) => callback(err, null));
      //     },
      //     function doTwo(callback) {
      //       makeReservation(customer._id, events[1])
      //         .then(async (response) => {
      //           await sleep(5000).then(() => {
      //             console.log(events.length);
      //             if (events.length === 2) {
      //               console.log("if");
      //               callback(err, null);
      //             } else callback(null);
      //           });
      //         })
      //         .catch((err) => callback(err, null));
      //     },
      //     function doThree(callback) {
      //       makeReservation(customer._id, events[2])
      //         .then(async (response) => {
      //           await sleep(5000);
      //           if (events.length === 3) callback(err, null);
      //           else callback(null);
      //         })
      //         .catch((err) => callback(err, null));
      //     },
      //     function doFour(callback) {
      //       makeReservation(customer._id, events[3])
      //         .then(async (response) => {
      //           await sleep(5000);
      //           console.log(events.length);

      //           if (events.length === 4) callback(err, null);
      //           else callback(null);
      //         })
      //         .catch((err) => callback(err, null));
      //     },
      //   ],
      //   // optional callback
      //   async function (err, results) {}
      // );
      makeReservation(customer._id, events);
    }, index * 3000);
    index += 1;
  });
};
