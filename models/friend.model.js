const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  }
});

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;
