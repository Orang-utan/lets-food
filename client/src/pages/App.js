import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Friends from "./Friends";
import Confirm from "./Confirm";
import BrokenLink from "./BrokenLink";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/confirm/:id" exact component={Confirm} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" component={BrokenLink} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
