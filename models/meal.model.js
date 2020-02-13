const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// upon create meal, populate unconfirmed with all of user's contact
// each recipient who confirms, gets moved to attendees array
const modelSchema = new Schema(
  {
    creator: { type: String, required: true },
    available: { type: Boolean, required: true },
    location: { type: String, required: false },
    unconfirmed: [{ name: String, phone: String, id: String }],
    attendees: [{ name: String, phone: String, id: String }]
  },
  {
    timestamps: true //when model is created
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
