const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");

// testing
router.route("/").get((request, response) => {
  response.send("Hello world from the users route!");
});

// user signup
router.route("/signup").post(async (request, response) => {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const friends = [];
  const meals = [];

  const newUser = new User({
    username,
    email,
    password,
    friends,
    meals
  });

  const salt = await bcrypt.genSalt(10);

  newUser.password = await bcrypt.hash(password, salt);

  newUser
    .save()
    .then(data => response.json(data))
    .catch(error => response.status(400).json("Error: " + error));
});

// user login
router.route("/login").get((request, response) => {
  response.send("Login success");
});

// add new friends phone number / contact
// make sure user only has 10 friends at once
router.route("/friend").post((request, response) => {
  const uid = request.body.uid;
  const name = request.body.name;
  const number = request.body.number;

  const newFriend = { name, number };

  response.send("create new contact");
});

// delete friends phone number / contact
router.route("/friend/:id").delete((request, response) => {
  response.send("delete contact");
});

module.exports = router;
