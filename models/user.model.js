const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
require("dotenv").config({ path: "../.env" });

const jwtSecret = process.env.JWT_SECRET;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    friends: [{ name: String, number: String }],
    meals: [String]
  },
  {
    timestamps: true //when model is created
  }
);

UserSchema.methods.generateAuthToken = id => {
  const payload = { _id: id };
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

const User = mongoose.model("User", UserSchema);

const validateUser = user => {
  const schema = {
    firstName: joi
      .string()
      .min(1)
      .max(50)
      .required(),
    lastName: joi
      .string()
      .min(1)
      .max(50)
      .required(),
    email: joi
      .string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: joi
      .string()
      .min(6)
      .max(255)
      .required()
  };

  return joi.validate(user, schema);
};

module.exports = {
  User: User,
  validate: validateUser
};
