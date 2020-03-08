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
        fields: "items(start/dateTime, summary, location)"
      })
      .then(response => {
        let events = response.data.items;
        events = events
          // .filter(e => {
          //   TODO: Filter out those with no startDate and location;
          // })
          .reverse();

        resolve(events);
      })
      .catch(err => {
        console.error(err.response.data.error);
        reject(err.response.data.error);
      });
  });
};

module.exports = {
  listEvents
};
