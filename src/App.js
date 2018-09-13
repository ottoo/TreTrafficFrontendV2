import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import MapBoxGLMap from "./components/MapBoxGLMap/MapBoxGLMap";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";

const importMapStyle = () =>
  process.env.NODE_ENV === "production"
    ? require("./components/MapBoxGLMap/style_prod.json")
    : require("./components/MapBoxGLMap/style_dev.json");

@inject("store")
@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationMenu />

        <MapBoxGLMap
          containerStyle={{
            position: "absolute",
            top: 50,
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
        />
      </div>
    );
  }
}

export default App;
