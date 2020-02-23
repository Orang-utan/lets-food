const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User, validateSignup, validateLogin } = require("../models/user.model");
const auth = require("../middleware/auth");

// user signup
router.post("/signup", async (request, response) => {
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const password = request.body.password;
  const friends = [];
  const meals = [];

  // validate data
  const { error } = validateSignup(request.body);
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
router.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  // validate data
  const { error } = validateLogin(request.body);
  if (error) return response.status(400).send(error.details[0].message);

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

// logout (invalidate token)
router.get("/invalidateToken", auth, async (_, response) => {
  response.clearCookie("access-token");
  response.send("Token invalidated");
});

// who am i
router.get("/me", auth, async (request, response) => {
  const user = await User.findById({ _id: request.userId }).select("-password");
  response.send(user);
});

// add new friends phone number / contact
// make sure there's no duplicates
router.post("/friend", auth, async (request, response) => {
  const name = request.body.name;
  const number = request.body.number;

  const newFriend = { name, number };

  User.findById({ _id: request.userId })
    .then(user => {
      let friends = user.friends;
      friends.forEach(friend => {
        if (friend.number == newFriend.number) {
          response.status(400).json("Error: friend already exists");
          next();
        }
      });

      friends.unshift(newFriend);
      user.friends = friends;

      user
        .save()
        .then(() => response.json("New friend created!"))
        .catch(error => response.status(400).json("Error: " + error));
    })
    .catch(error => response.status(400).json("Error: " + error));
});

// delete friend contact from user friends
router.delete("/friend/:id", auth, async (request, response) => {
  const friendId = request.params.id;

  User.findOneAndUpdate(
    { _id: request.userId },
    { $pull: { friends: { _id: friendId } } },
    (error, data) => {
      if (error) {
        return response.status(500).json({ Error: "Error in deleting" });
      }
      response.json("Deletion Suceed");
    }
  );
});

// get all friends
router.get("/friends", auth, async (request, response) => {
  User.findById({ _id: request.userId })
    .then(user => {
      response.send(user.friends);
    })
    .catch(error => {
      response.json({ Error: error });
    });
});

module.exports = router;
