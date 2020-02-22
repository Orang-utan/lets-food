const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user.model");
const auth = require("../middleware/auth");

// testing
router.route("/").get((request, response) => {
  response.send("Hello world from the users route!");
});

// who am i
router.get("/me", auth, async (request, response) => {
  const user = await User.findById({ _id: request.payload._id }).select(
    "-password"
  );
  response.send(user);
});

// user signup
router.route("/signup").post(async (request, response) => {
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const password = request.body.password;
  const friends = [];
  const meals = [];

  // validate data
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  // check registered or not?
  let user = await User.findOne({ email: email });
  if (user) return response.status(400).send("User already registered");

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    friends,
    meals
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();

  // generate token here
  const token = newUser.generateAuthToken(newUser._id);
  response.header("x-auth-token", token).send({
    _id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email
  });
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
