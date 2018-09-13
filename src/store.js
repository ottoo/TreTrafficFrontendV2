import { types } from "mobx-state-tree";
import axios from "axios";

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
  .actions(self => ({
    setMarkers(markers) {
      self.markers = markers;
    },
    async loadBusLines() {
      const response = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/api/vehicle-activity?lineRef=1,2,8,3`
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
