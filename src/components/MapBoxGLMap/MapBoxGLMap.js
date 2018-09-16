import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { observer, inject } from "mobx-react";

import * as mapHelpers from "./helpers";
import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
import "./MapBoxGLMap.css";

@inject("store")
@observer
class MapBoxGLMap extends Component {
  static defaultProps = {
    addNavigationControl: false
  };

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      mapboxGLMarkers: []
    };
  }

  /**
   * Add a mapbox-gl map to the dom and initialize polling of vehicle data.
   */
  componentDidMount() {
    this.props.store.busLineStore.loadBusLines();
    this.addMap();
    this.pollVehicleActivity();
  }

  addMap() {
    const { addNavigationControl, mapOptions } = this.props;
    const map = new mapboxgl.Map(mapOptions);

    if (addNavigationControl === true) {
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    }

    this.setState({ map });
  }

  async pollVehicleActivity() {
    const { store } = this.props;

    const loadVehiclesAndAddToMap = async () => {
      this.removeInactiveMarkers();
      await store.markerStore.loadVehicleActivity();
      this.updateMarkers();
    };

    loadVehiclesAndAddToMap();

    setInterval(
      loadVehiclesAndAddToMap,
      process.env.REACT_APP_BACKEND_POLL_INTERVAL_MS || 5000
    );
  }

  /**
   * Updates the markers on the map. Removes markers that are not selected by the user any longer.
   * If bus line is new, add a new marker or if bus line already exists on the map, update the
   * existing marker position.
   */
  updateMarkers() {
    const { store } = this.props;
    const { mapboxGLMarkers } = this.state;

    const findMarkerByVehicleRef = ref =>
      mapboxGLMarkers.find(m => m.vehicleRef === ref);

    const markers = store.markers.map(m => {
      const found = findMarkerByVehicleRef(m.vehicleRef);

      if (found) {
        return found.setLngLat([m.lng, m.lat]);
      } else {
        const created = mapHelpers.createMarker(m);

        this.setState(prevState => ({
          mapboxGLMarkers: [...prevState.mapboxGLMarkers, created]
        }));
        return created;
      }
    });

    if (markers && markers.length > 0) {
      markers.forEach(m => {
        m.addTo(this.state.map);
      });
    }
  }

  removeInactiveMarkers() {
    const { store } = this.props;
    const { mapboxGLMarkers } = this.state;
    const selectedBusLines = store.selectedBusLines;

    // Remove marker from the map and state
    mapboxGLMarkers.forEach(m => {
      if (selectedBusLines.includes(m.lineRef) === false) {
        this.setState(
          prevState => ({
            mapboxGLMarkers: prevState.mapboxGLMarkers.filter(
              mm => mm.lineRef !== m.lineRef
            )
          }),
          () => {
            m.remove();
          }
        );
      }
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
