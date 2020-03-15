const router = require("express").Router();
const Meal = require("../models/meal.model");
const { User } = require("../models/user.model");
const utils = require("../utils/utils");
const auth = require("../middleware/auth");
const sms_client = require("../utils/sms_client");

// testing
router.route("/").get((request, response) => {
  response.send("Hello world from the meals route!");
});

// add meal
// expect an array of friends in the request
router.post("/add", auth, async (request, response) => {
  const creatorId = request.userId;
  const creator = await User.findOne({ _id: creatorId });
  const creatorName = creator.firstName + " " + creator.lastName;
  const creatorFriends = creator.friends;
  const available = true;
  const location = utils.getRandomDiningHall();
  var friends = [];

  creatorFriends.forEach((value, index) => {
    const url = utils.getUniqueID();
    const friend = {
      name: value.name,
      number: value.number,
      url: url,
      _id: value._id,
      attending: false
    };

    friends.push(friend);

    // sms_client.sendSms(
    //   `Your friend ${creatorName} wants to grab lunch at ${location} in 15 minutes. Click this ${item.url} if you want to join him. - Sent by Let's Food`,
    //   item.number
    // );
  });

  const newMeal = new Meal({
    creatorId,
    available,
    location,
    friends
  });

  await newMeal.save();

  response.json(newMeal);
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

router.get("/confirm/:id", async (request, response) => {
  const confirmId = request.params.id;

  const meals = await Meal.find();

  let targetMealId;
  let targetFriendIndex;

  meals.forEach(meal => {
    const friends = meal.friends;
    friends.forEach((friend, index) => {
      if (friend.url === confirmId) {
        targetMealId = meal._id;
        targetFriendIndex = index;
      }
    });
  });

  if (!targetMealId) {
    return response.status(400).send({ error: "Confirmation code is invalid" });
  }

  Meal.findById({ _id: targetMealId }).then(meal => {
    meal.friends[targetFriendIndex].attending = true;

    meal
      .save()
      .then(() => response.json("Friend confirmed!"))
      .catch(error => response.status(400).json("Error: " + error));
  });
});

module.exports = router;
