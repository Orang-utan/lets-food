const router = require("express").Router();
const Meal = require("../models/meal.model");
const utils = require("../utils/utils");

// testing
router.route("/").get((request, response) => {
  response.send("Hello world from the meals route!");
});

// add meal
router.route("/add").post((request, response) => {
  const creator = request.body.creator;
  const creatorId = request.body.creatorId;
  const available = Boolean(request.body.available);
  const location = utils.getRandomDiningHall();
  const unconfirmed = request.body.unconfirmed;
  const attendees = [];

  unconfirmed.forEach(element => {
    element.url = utils.getUniqueID();
  });

  const newMeal = new Meal({
    creator,
    creatorId,
    available,
    location,
    unconfirmed,
    attendees
  });

  newMeal
    .save()
    .then(data => response.json(data))
    .catch(error => response.status(400).json("Error: " + error));
});

// get meal
router.route("/:id").get((request, response) => {
  Meal.findById(request.params.id)
    .then(meal => response.json(meal))
    .catch(error => response.status(400).json("Error: " + error));
});

// delete meal
router.route("/:id").delete((request, response) => {
  Meal.findByIdAndDelete(request.params.id)
    .then(() => response.json("meal deleted."))
    .catch(error => response.status(400).json("Error: " + error));
});

// close meal, prevent new people from joining
router.route("/close/:id").get((request, response) => {
  Meal.findById(request.params.id)
    .then(meal => {
      meal.available = !meal.available;

      meal
        .save()
        .then(() => response.json("meal closed!"))
        .catch(error => response.status(400).json("Error: " + error));
    })
    .catch(error => response.status(400).json("Error: " + error));
});

// friends to confirm meal
router.route("/confirm/:id").get((request, response) => {
  // find which meal based on the friend's unique url
  // verify if meal is closed or not
  // if not move the friend from unconfirmed to attendees
  // success
  response.send("confirm meal");
});

module.exports = router;
