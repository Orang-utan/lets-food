import React from "react";
import { PageHeader, Button, Form, Icon, Input } from "antd";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";
import axios from "axios";

const Login = ({ history }) => {
  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(
        baseUrl + "/users/login",
        {
          email: "dian@gmail.com",
          password: "123456"
        },
        { withCredentials: true }
      )
      .then(data => {
        history.push("/");
      })
      .catch(error => {
        console.log("error");
      });
  };

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
      />
      <div>
        <center style={{ marginTop: "20px" }}>
          <h1>
            <b>Login</b> below
          </h1>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <Form style={{ margin: "0 40vw" }} onSubmit={handleSubmit}>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form>
        </center>
      </div>
    </div>
  );
};

export default Login;
