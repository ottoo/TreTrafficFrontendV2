import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import makeInspectable from "mobx-devtools-mst";
import axios from "axios";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { RootStore } from "./stores/RootStore";

import "./index.css";

// Inject api to the store, so it can also be mocked for testing easily.
const rootStore = RootStore.create({}, { api: axios });

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
