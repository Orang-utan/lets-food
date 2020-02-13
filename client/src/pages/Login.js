import React from "react";
import { PageHeader, Button, Form, Icon, Input, Checkbox } from "antd";

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
        </center>
      </div>
    </div>
  );
};

export default Login;
