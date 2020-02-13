const router = require("express").Router();
let User = require("../models/user.model");

// testing
router.route("/").get((request, response) => {
  response.send("Hello world from the users route!");
});

// user signup
router.route("/signup").post((request, response) => {
  const username = request.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => response.json("User Sign Up!"))
    .catch(error => response.status(400).json("Error: " + error));
});

// user login
router.route("/login").get((request, response) => {
  response.send("Login success");
});

// add new friends phone number / contact
// make sure user only has 10 friends at once
router.route("/new/contact").post((request, response) => {
  response.send("create new contact");
});

// delete friends phone number / contact
router.route("/delete/contact").post((request, response) => {
  response.send("delete contact");
});

module.exports = router;
