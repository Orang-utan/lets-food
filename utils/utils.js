/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// random dining hall
const diningHalls = ["1920 Commons", "Hill House", "LCH", "KCEH", "Hillel"];

const getRandomDiningHall = () => {
  idx = getRandomInt(0, diningHalls.length - 1);
  return diningHalls[idx];
};

exports.getRandomDiningHall = getRandomDiningHall;

// generate short unique id
const shortid = require("shortid");

const getUniqueID = () => {
  return shortid.generate();
};

exports.getUniqueID = getUniqueID;
