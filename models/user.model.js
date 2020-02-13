const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
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

const User = mongoose.model("User", userSchema);

module.exports = User;
