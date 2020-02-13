import React from "react";
import { PageHeader, Button } from "antd";
import { Link } from "react-router-dom";

const Friends = ({ history }) => {
  return (
    <div>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        onBack={() => {
          history.push("/");
        }}
        title="Let's Eat"
        extra={[
          <Link to="/login">
            <Button key="2">Login</Button>
          </Link>,
          <Link to="/signup">
            <Button key="1" type="primary">
              Sign Up
            </Button>
          </Link>
        ]}
      />
      <div>
        <center style={{ marginTop: "20px" }}>
          <h1>Friends</h1>
        </center>
      </div>
    </div>
  );
};

export default Friends;
