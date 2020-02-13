const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, //trim white space
      minlength: 3 //3 characters
    }
  },
  {
    timestamps: true //when model is created
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
