import { types, getParent } from "mobx-state-tree";

const Marker = types.model("Marker", {
  lat: types.number,
  lng: types.number,
  lineRef: types.string,
  vehicleRef: types.string
});

export const MarkerStore = types
  .model("MarkerStore", {
    markers: types.array(Marker)
  })
  .views(self => ({
    get root() {
      return getParent(self);
    }
  }))
  .actions(self => ({
    setMarkers(markers) {
      self.markers = markers;
    },
    /**
     * Gets the selected bus lines from BusLineStore for the API call.
     */
    getSelectedBusLines() {
      const selectedBusLines = getParent(self).selectedBusLines;
      return selectedBusLines.join(",");
    },
    /**
     * API call to load vehicle activity from the backend. Maps the received data into a more suitable
     * format for markers.
     */
    async loadVehicleActivity() {
      const response = await self.root.api.get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/api/vehicle-activity?lineRef=${self.getSelectedBusLines()}`
      );
      const convertBusLinesToMarkers = responseData =>
        responseData.map(r => ({
          lat: parseFloat(r.vehicleLocation.latitude, 10),
          lng: parseFloat(r.vehicleLocation.longitude, 10),
          lineRef: r.lineRef,
          vehicleRef: r.vehicleRef
        }));
      self.setMarkers(convertBusLinesToMarkers(response.data));
    }
  }));
