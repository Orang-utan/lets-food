const router = require("express").Router();
const Meal = require("../models/meal.model");
const { User } = require("../models/user.model");
const utils = require("../utils/utils");
const auth = require("../middleware/auth");
const sms_client = require("../utils/sms_client");

// add meal
// expect an array of friends in the request
router.post("/add", auth, async (request, response) => {
  const creatorId = request.userId;
  const creator = await User.findOne({ _id: creatorId });
  const creatorName = creator.firstName + " " + creator.lastName;
  const creatorFriends = creator.friends;

  if (creatorFriends.length === 0) {
    return response
      .status(400)
      .json("Error: You must add at least one friend to create meal.");
  }

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

    // // UNCOMMENT THIS LINE TO SEND TEXT
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

  User.findById({ _id: creatorId }).then(user => {
    let meals = user.meals;
    meals.unshift(newMeal._id);

    user
      .save()
      .then(() => response.json("New meal created"))
      .catch(error => response.status(400).json("Error:" + error));
  });
});

// get meal
router.get("/:id", auth, (request, response) => {
  const uid = request.userId;
  Meal.findById(request.params.id)
    .then(meal => {
      if (meal.creatorId !== uid) {
        return response
          .status(401)
          .json("Error: You do not have permission to modify this meal.");
      }
      response.json(meal);
    })
    .catch(error => response.status(400).json("Error: " + error));
});

// delete meal
router.delete("/:id", auth, (request, response) => {
  const uid = request.userId;
  Meal.findById(request.params.id)
    .then(meal => {
      if (meal.creatorId !== uid) {
        return response
          .status(401)
          .json("Error: You do not have permission to modify this meal.");
      }
      Meal.findByIdAndDelete(request.params.id)
        .then(() => response.json("meal deleted."))
        .catch(error => response.status(400).json("Error: " + error));
    })
    .catch(error => response.status(400).json("Error: " + error));
});

// close the meal (prevent people from joining)
router.get("/close/:id", auth, (request, response) => {
  const uid = request.userId;
  Meal.findById(request.params.id)
    .then(meal => {
      if (meal.creatorId !== uid) {
        return response
          .status(401)
          .json("Error: You do not have permission to modify this meal.");
      }

      meal.available = false;

      meal
        .save()
        .then(() => response.json("meal closed"))
        .catch(error => response.status(400).json("Error: " + error));
    })
    .catch(error => response.status(400).json("Error: " + error));
});

// confirm the meal
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
