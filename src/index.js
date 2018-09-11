import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import makeInspectable from "mobx-devtools-mst";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { MarkerStore } from "./store";

import "./index.css";

const store = MarkerStore.create({});

if (process.env.NODE_ENV !== "production") {
  makeInspectable(store);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "production") {
  registerServiceWorker();
}
