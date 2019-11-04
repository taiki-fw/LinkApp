import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import noMatch from "./noMatch.js";

import Header from "./components/Header";
import PostCard from "./mainPage/PostCard";
import TopPage from "./mainPage/TopPage";
import CreateUser from "./mainPage/CreateUser";
import Login from "./mainPage/Login";
import Users from "./mainPage/Users";

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
