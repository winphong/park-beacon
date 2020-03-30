const winston = require("winston");
const { createLogger, format, transports } = winston;
const { label, combine, timestamp, simple, colorize } = format;

const getLabel = function(callingModule) {
  const parts = callingModule.filename.split("\\");
  return parts[parts.length - 2] + "/" + parts.pop();
};

module.exports = callingModule =>
  createLogger({
    format: combine(
      // timestamp(),
      simple(),
      label({ label: getLabel(callingModule) })
    ),
    transports: [
      new transports.Console({
        format: combine(colorize(), simple())
      })
    ]
  });
