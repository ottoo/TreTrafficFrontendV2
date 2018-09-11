import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import * as R from "ramda";

import MapBoxGLMap from "./components/MapBoxGLMap/MapBoxGLMap";
import style from "./components/MapBoxGLMap/style.json";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.store.loadBusLines();
    setInterval(() => {
      this.props.store.loadBusLines();
    }, process.env.REACT_APP_BACKEND_POLL_INTERVAL_MS || 5000);
  }

  render() {
    return (
      <div className="App">
        <MapBoxGLMap
          containerStyle={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%"
          }}
          addNavigationControl={true}
          mapOptions={{
            container: "map",
            center: [23.7610254, 61.4981509],
            style,
            zoom: 12
          }}
          markers={this.props.store.markers.toJS()}
        />
      </div>
    );
  }
}

const enhance = R.compose(
  inject("store"),
  observer
);

export default enhance(App);
