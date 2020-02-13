require("dotenv").config({ path: "../.env" });
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWIOLIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// messege is a string "hello world"
// number is follow this format "+16262617200"
const sendSms = (messege, number) => {
  client.messages
    .create({
      body: messege,
      from: "+16262617200",
      to: number
    })
    .then(message => console.log(message.sid));
};

exports.sendSms = sendSms;
