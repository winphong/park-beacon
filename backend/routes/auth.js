const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { Customer } = require("../model/customer");
const { getAuthUrl, getAccessToken } = require("../services/oauth");
const { init, reset } = require("../services/setup");

// Logging in as customer
router.post("/login", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const { password, username } = req.body;
  const customer = await Customer.findOne({ username });
  if (!customer) return res.status(400).send("Invalid username or password");

  const validPassword = await bcrypt.compare(password, customer.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  if (customer.authorised) {
    const jwt = customer.generateAuthToken();
    res.send({ jwt });
  } else {
    const authUrl = getAuthUrl();
    res.send({ username, authUrl });
  }
});

// Registering customer
router.post("/register", async (req, res) => {
  const customer = new Customer(req.body);
  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);

  await customer.save();
  res.send(customer);
});

// Receive authorise code to Google Calendar
router.post("/authorise", async (req, res) => {
  const { username, code } = req.body;
  console.log(username, code);
  // convert code to token
  const token = await getAccessToken(code);
  const customer = await Customer.findOneAndUpdate(
    { username },
    {
      token: cryptr.encrypt(JSON.stringify(token)),
      authorised: true,
    },
    { new: true, useFindAndModify: false }
  );
  const jwt = customer.generateAuthToken();
  res.send(jwt);
});

router.get("/reset", async (req, res) => {
  await reset();
  res.send("Reset complete");
});

router.get("/init", async (req, res) => {
  await init();
  res.send("Init complete");
});

// Getting customer [test purpose]
router.get("/", async (req, res) => {
  const { username } = req.body;
  const customer = await Customer.findOne({ username });
  const token = JSON.parse(cryptr.decrypt(customer.token));
  customer._doc.token = token;
  res.send(customer);
});

module.exports = router;

// The word “async” before a function means one simple thing: a function always returns a promise
// The keyword await makes JavaScript wait until that promise settles and returns its result.
