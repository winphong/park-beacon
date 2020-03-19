const { google } = require("googleapis");
const _ = require("lodash");
const fs = require("fs");

const listEvents = async oAuth2Client => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  // Create a new calender instance.
  const now = new Date();
  const tomorrow = new Date();
  // FIXME: Change to 15 minutes ahead
  tomorrow.setDate(tomorrow.getDate() + 1);
  // tomorrow.setMinutes(tomorrow.getMinutes() + 30);

  return new Promise((resolve, reject) => {
    calendar.events
      .list({
        calendarId: "primary",
        maxResults: 5,
        timeMin: now,
        timeMax: tomorrow,
        singleEvents: true,
        showDeleted: false,
        q: "nus", // filter only those event in NUS
        fields: "items(start/dateTime, summary, location, id)"
      })
      .then(response => {
        let events = response.data.items;
        events = events
          .filter(event => {
            return _.get(event, "start.dateTime") && event.location;
          })
          .reverse();

        resolve(events);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports = {
  listEvents
};
