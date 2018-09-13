import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import MapBoxGLMap from "./components/MapBoxGLMap/MapBoxGLMap";

const importMapStyle = () =>
  process.env.NODE_ENV === "production"
    ? require("./components/MapBoxGLMap/style_prod.json")
    : require("./components/MapBoxGLMap/style_dev.json");

@inject("store")
@observer
class App extends Component {
  componentDidMount() {
    this.props.store.markerStore.loadVehicleActivity();
    setInterval(() => {
      this.props.store.markerStore.loadVehicleActivity();
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
            style: importMapStyle(),
            zoom: 12
          }}
          markers={this.props.store.markers}
        />
      </div>
    );
  }
}

export default App;
