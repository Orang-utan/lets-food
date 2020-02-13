import React from "react";

const Confirm = ({ match }) => {
  return (
    <div>
      <center style={{ marginTop: "20vh" }}>
        <img
          src="/confirm/verified.png"
          style={{ width: "10%", height: "10%" }}
        />
        <h1>Thanks! Your meal with John is confirmed</h1>
        <p>Here's your confirmation number: {match.params.id}.</p>
      </center>
    </div>
  );
};

export default Confirm;
