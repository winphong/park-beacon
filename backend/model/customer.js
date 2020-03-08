const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const customerSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  carPlateNumber: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  token: {
    type: mongoose.Schema.Types.String
  },
  authorised: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false
  }
});

customerSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    {
      // _id: this.id,
      username: this.username,
      carPlateNumber: this.carPlateNumber
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Customer = mongoose.model("Customer", customerSchema);

// function validateAdmin(admin) {
//   const schema = {
//     username: Joi.string()
//       .required()
//       .error(errors => {
//         return {
//           message: "Username is required!"
//         };
//       }),
//     password: Joi.string()
//       .required()
//       .error(errors => {
//         return {
//           message: "Password is required!"
//         };
//       })
//   };
//   return Joi.validate(admin, schema);
// }

exports.Customer = Customer;
// exports.validate = validateAdmin;
