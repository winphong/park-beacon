require("express-async-errors");
require("dotenv").config();
const config = require("config");
const express = require("express");
const app = express();
const path = require("path");

require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/timer")();

// The root argument specifies the root directory from which to serve static assets
app.use(express.static(path.join(__dirname, "frontend", "build")));

const port = process.env.PORT || config.get("port");

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
module.exports = server;
