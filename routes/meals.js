const router = require("express").Router();

// testing
router.route("/").get((request, response) => {
  response.send("Hello world from the meals route!");
});

// add meal
router.route("/add").post((request, response) => {
  response.send("add meal");
});

// get attendees from a meal
router.route("/attendees").get((request, response) => {
  response.send("get attendees from a meal");
});

// close meal, prevent new people from joining
router.route("/close").get((request, response) => {
  response.send("close meal");
});

// delete meal
router.route("/delete").get((request, response) => {
  response.send("delete meal");
});

// friends to confirm meal
router.route("/confirm").get((request, response) => {
  response.send("confirm meal");
});

module.exports = router;
