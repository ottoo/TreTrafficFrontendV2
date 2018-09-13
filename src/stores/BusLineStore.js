import { types } from "mobx-state-tree";
import axios from "axios";

const BusLine = types.model("BusLine", {
  name: types.string,
  description: types.string
});

export const BusLineStore = types
  .model("BusLineStore", {
    busLines: types.array(BusLine),
    selectedBusLines: types.array(types.string)
  })
  .actions(self => ({
    setBusLines(busLines) {
      self.busLines = busLines;
    },
    /**
     * Toggle selected bus line for the menu UI. Also marks the actual markers for deletion,
     * so that they are removed from the UI.
     */
    toggleSelectedBusLine(busLineName) {
      const found = self.selectedBusLines.find(s => s === busLineName);
      if (found) {
        self.selectedBusLines = self.selectedBusLines.filter(
          s => s !== busLineName
        );
      } else {
        self.selectedBusLines.push(busLineName);
      }
    },
    /**
     * Load available bus lines from the backend.
     */
    async loadBusLines() {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/lines`
      );
      self.setBusLines(response.data);
    },
    afterCreate() {
      self.loadBusLines();
    }
  }));
