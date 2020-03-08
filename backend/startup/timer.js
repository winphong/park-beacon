const { getAllCustomer } = require("../services/customer");
const { authorise } = require("../services/oauth");
const { listEvents } = require("../services/calendar");

module.exports = () => {
  setInterval(async () => {
    const customers = await retrieveAllCustomer();
    checkUpcomingEvents(customers);
  }, 2000);

  /*
  1. Retrieve token of all customers
  2. Use token to call API to check for upcoming events
  3. Make reservation based on the upcoming events-> Send push notification

  a. Check for expired reservation and free up the parking lot
  */
};

retrieveAllCustomer = async () => {
  const customers = await getAllCustomer();
  return customers;
};

checkUpcomingEvents = customers => {
  customers.map(async customer => {
    const oAuth2Client = authorise(customer.token);
    const events = await listEvents(oAuth2Client);
    console.log(events);
  });
  // return an object of {customerId, upcomingEvent}
};

makeReservation = (customerId, reservationDetails) => {
  // calculate shortest distance
};

checkExpiredReservation = () => {};
