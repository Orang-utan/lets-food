import React from "react";
import { PageHeader, Button } from "antd";

const Home = () => {
  return (
    <div>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Let's Eat"
        extra={[
          <Button key="2">Login</Button>,
          <Button key="1" type="primary">
            Sign Up
          </Button>
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

export default Home;
