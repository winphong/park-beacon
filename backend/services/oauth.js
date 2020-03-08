const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URIS_0
);

/**
 * Generate authentication URL for customer and send to frontend
 */
const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  return authUrl;
};

/**
 * Generate an access token with the authorisation code provided by customer
 */
const getAccessToken = async code => {
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error("Error retrieving access token", err);
        reject(err);
      }
      console.log("Retrieving token");
      console.log(token);
      resolve(token);
    });
  });
};

/**
 * Authorise the client with the customer's token to retrieve info from customer's calendar
 * @param {Object} token customer's decrypted token from database
 */
const authorise = token => {
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
listEvents = auth => {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime"
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
};

module.exports = {
  getAuthUrl,
  getAccessToken,
  authorise
};
