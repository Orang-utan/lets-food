import React from "react";
import { PageHeader, Button, List, Avatar, Input } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    title: "John Smith",
    number: "4195804422"
  },
  {
    title: "Amy Gutmann",
    number: "4195804422"
  },
  {
    title: "Elon Musk",
    number: "4195804422"
  },
  {
    title: "Brad Pitt",
    number: "4195804422"
  }
];

const { Search } = Input;

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

        <div style={{ margin: "0 30vw" }}>
          <Search
            placeholder="i.e. John Smith, 5106041131"
            enterButton="Add"
            size="large"
            onSearch={value => console.log(value)}
          />
          <List
            style={{ marginTop: "20px" }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[<Button shape="circle" icon="delete" />]}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<h3>{item.title}</h3>}
                  description={item.number}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Friends;
