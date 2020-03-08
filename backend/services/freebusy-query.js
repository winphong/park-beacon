const { google } = require("googleapis");
const cal = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_CALENDAR_API_KEY
});

// Set the calendar to query
const calendar = "winphong1011@gmail.com";

// Set beginning of query to 3 pm tomorrow
const tomorrow3pm = new Date("3 March 2020");
tomorrow3pm.setDate(tomorrow3pm.getDate() + 1);
tomorrow3pm.setHours(15, 0, 0);

// Set end of query to 4 pm tomorrow
const tomorrow4pm = new Date("3 March 2020");
tomorrow4pm.setDate(tomorrow4pm.getDate() + 1);
tomorrow4pm.setHours(16, 0, 0);

// Make the query
cal.freebusy
  .query({
    resource: {
      // Set times to ISO strings as such
      timeMin: new Date(tomorrow3pm).toISOString(),
      timeMax: new Date(tomorrow4pm).toISOString(),
      timeZone: "SG",
      items: [{ id: calendar }]
    }
  })
  .then(result => {
    console.log(result);
    const busy = result.data.calendars[calendar].busy;
    const errors = result.data.calendars[calendar].errors;
    if (undefined !== errors) {
      console.error("Check this this calendar has public free busy visibility");
    } else if (busy.length !== 0) {
      console.log("Busy");
    } else {
      console.log("Free");
    }
  })
  .catch(e => {
    console.error(e);
  });
