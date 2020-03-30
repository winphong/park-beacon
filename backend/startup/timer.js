const { getAllCustomer } = require("../services/customer");
const { authorise } = require("../services/oauth");
const { listEvents } = require("../services/calendar");
const { makeReservation } = require("../services/reservation");
const logger = require("../util/logger")(module);
const axios = require("axios");
const _ = require("lodash");

module.exports = async () => {
  setInterval(async () => {
    const customers = await retrieveAllCustomer();
    const customer_events = await checkUpcomingEvents(customers);
    console.log(customer_events);
    await makeReservationForAllUpcomingEvents(customer_events);
  }, 4000);

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

checkUpcomingEvents = async customers => {
  return await Promise.all(
    customers.map(async customer => {
      const oAuth2Client = authorise(customer.token);
      const events = await listEvents(oAuth2Client);
      // if (events.length > 0) {
      return { customer, events };
      // }
    })
  ).then(response => {
    // a list of {customer, events} object
    return response.filter(e => {
      return e.events.length > 0;
    });
  });
  // return an object of {customer, upcomingEvent}
};

makeReservationForAllUpcomingEvents = async customer_events => {
  customer_events.map(({ customer, events }) => {
    events.map(event => {
      makeReservation(customer._id, event);
    });
  });
};

checkExpiredReservation = () => {};
