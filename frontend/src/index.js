import React from "react";
// import "primereact/resources/themes/md-dark-deeppurple/theme.css";

import "./index.css";
import "./themes/material/material-dark/compact/deeppurple/theme.scss";
import "primeicons/primeicons.css";
import ReactDOM from "react-dom/client";
import App from "./App";

import "../node_modules/primeflex/primeflex.css";
import store from "./app/store";
import { Provider } from "react-redux";
//theme

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
