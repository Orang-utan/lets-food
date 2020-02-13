require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWIOLIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = () => {
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+16262617200",
      to: "+15106041131"
    })
    .then(message => console.log(message.sid));
};

sendSms();
