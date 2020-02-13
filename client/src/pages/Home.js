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
          <h1>Start Dinner Plan</h1>
          <p>
            Tap the button below to let see which of your friends are down for
            dinner in the next 15 minutes. Dining hall will be randomly chosen.
          </p>
          <Button
            style={{ margin: "0px 20px" }}
            type="primary"
            shape="round"
            icon="fire"
            size="large"
          >
            Create
          </Button>
          <Button shape="round" icon="user-add" size="large">
            Friends
          </Button>
        </center>
      </div>
    </div>
  );
};

export default Home;
