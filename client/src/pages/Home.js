import React, { useState } from "react";
import { PageHeader, Button, Spin, Icon, Popconfirm } from "antd";
import { Link } from "react-router-dom";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Home = () => {
  const [mealCreated, setMealCreated] = useState(false);

  const createMeal = () => {
    setMealCreated(true);
  };

  const cancelMeal = () => {
    setMealCreated(false);
  };

  return (
    <div>
      {mealCreated ? (
        <div>
          <center style={{ marginTop: "20vh" }}>
            <h1>Meal Created!</h1>
            <div style={{ marginTop: "15vh" }}>
              <Spin indicator={antIcon} />
              <br />
              <br />
              Waiting for your friends to join...
            </div>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                cancelMeal();
              }}
            >
              <Button
                style={{
                  position: "absolute",
                  width: "100px",
                  marginLeft: "-50px",
                  bottom: "50px",
                  left: "50%"
                }}
              >
                Cancel
              </Button>
            </Popconfirm>
          </center>
        </div>
      ) : (
        <div>
          <PageHeader
            style={{
              border: "1px solid rgb(235, 237, 240)"
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
              <h1>Start Dinner Plan</h1>
              <p>
                Tap the button below to let see which of your friends are down
                for dinner in the next 15 minutes. Dining hall will be randomly
                chosen.
              </p>

              <Button
                style={{ margin: "0px 20px" }}
                type="primary"
                shape="round"
                icon="fire"
                size="large"
                onClick={() => {
                  createMeal();
                }}
              >
                Create
              </Button>
              <Link to="/friends">
                <Button shape="round" icon="user-add" size="large">
                  Friends
                </Button>
              </Link>
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
