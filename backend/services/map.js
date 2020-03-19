const Client = require("@googlemaps/google-maps-services-js").Client;
const client = new Client({});

const getDistanceList = (origin, destinations) => {
  client
    .distancematrix({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        origins: [origin],
        destinations,
        mode: "driving",
        language: "en",
        units: "metric"
      }
    })
    .then(resp => {
      // TODO: Sort the array with shortest distance
      console.log(JSON.stringify(resp.data));
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getDistanceList = getDistanceList;
