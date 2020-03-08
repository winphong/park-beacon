module.exports = (err, req, res, next) => {
  //   winston.error(err.message, err);
  console.log(err.message);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
};
