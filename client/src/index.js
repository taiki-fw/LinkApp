import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./reset.css";
import noMatch from "./noMatch.js";

import Header from "./components/Header";
import App from "./mainPage/PostCard";
import TopPage from "./mainPage/TopPage";
import CreateUser from "./mainPage/CreateUser";
import Login from "./mainPage/Login";
import Users from "./mainPage/Users";
import * as serviceWorker from "./serviceWorker";

const Application = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={TopPage} />
      <Route path="/post" component={App} />
      <Route path="/user/registrations" component={CreateUser} />
      <Route path="/user/login" component={Login} />
      <Route path="/user/index" component={Users} />
      <Route component={noMatch} />
    </Switch>
  </Router>
);

ReactDOM.render(<Application />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
