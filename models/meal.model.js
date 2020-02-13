const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    creator: { type: String, required: true },
    available: { type: Boolean, required: true },
    location: { type: String, required: false },
    attendees: [{ name: String, phone: String }]
  },
  {
    timestamps: true //when model is created
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
