import React from "react";
import { PageHeader, Button, Form, Icon, Input } from "antd";

const Login = ({ history }) => {
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
          <h1>Login</h1>
          <Form style={{ margin: "0 40vw" }}>
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
