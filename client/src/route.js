import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import noMatch from "./noMatch.js";

import Header from "./Container/Header";
import PostCard from "./Container/PostCard";
import TopPage from "./Container/TopPage";
import CreateUser from "./Container/CreateUser";
import Login from "./Container/Login";
import Users from "./Container/Users";

const Application = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={TopPage} />
      <Route path="/post" component={PostCard} />
      <Route path="/user/registrations" component={CreateUser} />
      <Route path="/user/login" component={Login} />
      <Route path="/user/index" component={Users} />
      <Route component={noMatch} />
    </Switch>
  </Router>
);

export default Application;
