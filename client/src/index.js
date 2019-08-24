import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./reset.css";

import Header from "./components/Header";
import App from "./components/App";
import TopPage from "./components/TopPage";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Users from "./components/Users";
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
    </Switch>
  </Router>
);

ReactDOM.render(<Application />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
