const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user.model");
const auth = require("../middleware/auth");

// testing
router.get("/", (request, response) => {
  response.send("Hello world from the users route!");
});

// who am i
router.get("/me", auth, async (request, response) => {
  const user = await User.findById({ _id: request.userId }).select("-password");
  response.send(user);
});

// user signup
router.post("/signup", async (request, response) => {
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

  response.send("User created!");
});

// user login
router.get("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    response.status(400).send("Either email or password is incorrect");
  }

  const valid = bcrypt.compare(password, user.password);
  if (!valid) {
    response.status(400).send("Either email or password is incorrect");
  }

  // generate token here
  const accessToken = user.generateAccessToken(user._id);

  response.cookie("access-token", accessToken);

  response.send("Login success");
});

// invalidate token
router.get("/invalidateToken", auth, async (_, response) => {
  response.clearCookie("access-token");
  response.send("Token invalidated");
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
