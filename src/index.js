import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import makeInspectable from "mobx-devtools-mst";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { RootStore } from "./stores/RootStore";

import "./index.css";

const rootStore = RootStore.create({});

if (process.env.NODE_ENV !== "production") {
  makeInspectable(rootStore);
}

ReactDOM.render(
  <Provider store={rootStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "production") {
  registerServiceWorker();
}
