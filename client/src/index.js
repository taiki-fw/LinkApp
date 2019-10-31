import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import Application from "./Apps";
import store from "./store/store";
import "./reset.css";

const App = () => (
  <Provider store={store}>
    <Application />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
