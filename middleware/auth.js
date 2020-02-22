const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    //if can verify the token, set req.payload and pass to next middleware
    const decoded = jwt.verify(token, jwtSecret);
    req.payload = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

module.exports = auth;
