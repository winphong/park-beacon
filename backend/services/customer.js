const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { Customer } = require("../model/customer");

// Getting customer [test purpose]
getAllCustomer = async () => {
  let customers = await Customer.find();
  customers = customers.map(customer => {
    customer._doc.token = JSON.parse(cryptr.decrypt(customer.token));
    return customer;
  });
  return customers;
};

module.exports = {
  getAllCustomer
};

// The word “async” before a function means one simple thing: a function always returns a promise
// The keyword await makes JavaScript wait until that promise settles and returns its result.
