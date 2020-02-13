const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// upon create meal, populate unconfirmed with all of user's contact
// each recipient who confirms, gets moved to attendees array
// note the id for the attendees is generated upon creation
// these ids are unique urls that will sent via text
const mealSchema = new Schema(
  {
    creator: { type: String, required: true },
    creatorId: { type: String, required: true },
    available: { type: Boolean, required: true },
    location: { type: String, required: false },
    unconfirmed: [{ name: String, phone: String, url: String }],
    attendees: [{ name: String, phone: String, url: String }]
  },
  {
    timestamps: true //when model is created
  }
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
