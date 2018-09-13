import { types } from "mobx-state-tree";
import axios from "axios";

const BusLine = types.model("BusLine", {
  name: types.string,
  description: types.string
});

export const BusLineStore = types
  .model("BusLineStore", {
    busLines: types.array(BusLine)
  })
  .actions(self => ({
    setBusLines(busLines) {
      self.busLines = busLines;
    },
    async loadBusLines() {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/lines`
      );
      self.setBusLines(response.data);
    }
  }));
