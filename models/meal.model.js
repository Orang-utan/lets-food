const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// upon create meal, populate unconfirmed with all of user's contact
// each recipient who confirms, gets moved to attendees array
// note the id for the attendees is generated upon creation
// these ids are unique urls that will sent via text
const mealSchema = new Schema({
  creatorId: { type: String, required: true },
  available: { type: Boolean, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  friends: [
    {
      name: { type: String, required: true },
      number: { type: String, required: true },
      url: { type: String, required: true },
      _id: { type: String, required: true },
      attending: { type: Boolean, required: true }
    }
  ]
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
