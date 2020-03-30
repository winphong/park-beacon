const Client = require("@googlemaps/google-maps-services-js").Client;
const client = new Client({});
const logger = require("../util/logger")(module);

const getDistanceList = (origin, destinations) => {
  return new Promise((resolve, reject) =>
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
        // logger.info(JSON.stringify(resp.data));
        resolve(resp.data);
      })
      .catch(err => {
        logger.error(err);
        reject();
      })
  );
};

exports.getDistanceList = getDistanceList;
