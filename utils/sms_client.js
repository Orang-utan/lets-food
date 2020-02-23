require("dotenv").config({ path: "../.env" });
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require("twilio")(accountSid, authToken);

// messege is a string "hello world"
// number is follow this format "+16262617200"
const sendSms = (messege, number) => {
  client.messages
    .create({
      body: messege,
      from: twilioNumber,
      to: number
    })
    .then(message => console.log(message.sid));
};

exports.sendSms = sendSms;
