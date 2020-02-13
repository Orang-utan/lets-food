import React from "react";

const Confirm = ({ match }) => {
  return (
    <div>
      <h1>This is confirm</h1>
      Rendering confirmation number {match.params.id}
    </div>
  );
};

export default Confirm;
