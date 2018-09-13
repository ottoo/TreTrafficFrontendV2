import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
import "./MapBoxGLMap.css";

const createCustomMarker = m => {
  const lineRef = document.createElement("div");
  lineRef.className = "lineref";
  lineRef.textContent = m.lineRef;

  const actual = document.createElement("div");
  actual.className = "marker";
  actual.appendChild(lineRef);

  const markerContainer = document.createElement("div");
  markerContainer.appendChild(actual);
  return markerContainer;
};

class MapBoxGLMap extends Component {
  static defaultProps = {
    addNavigationControl: false
  };

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      mapboxglMarkers: []
    };
  }

  componentDidMount() {
    const { addNavigationControl, mapOptions } = this.props;

    const map = new mapboxgl.Map(mapOptions);

    if (addNavigationControl === true) {
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    }

    this.setState({ map });
  }

  addMarker(marker) {
    const findMarkerByVehicleRef = ref =>
      this.state.mapboxglMarkers.find(m => m.vehicleRef === ref);

    const found = findMarkerByVehicleRef(marker.vehicleRef);

    if (found) {
      found.setLngLat([marker.lng, marker.lat]);
    } else {
      const created = new mapboxgl.Marker(createCustomMarker(marker), {
        anchor: "center"
      })
        .setLngLat([marker.lng, marker.lat])
        .addTo(this.state.map);
      created.vehicleRef = marker.vehicleRef;
      this.state.mapboxglMarkers.push(created);
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.markers.forEach(m => {
      this.addMarker(m);
    });
  }

  render() {
    const {
      containerStyle,
      mapOptions: { container }
    } = this.props;
    return <div id={container} style={containerStyle} />;
  }
}

export default MapBoxGLMap;
