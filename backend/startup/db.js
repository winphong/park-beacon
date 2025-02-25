const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.log(err.response));
};
