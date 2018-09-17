import { getParent, types, getSnapshot, onSnapshot } from "mobx-state-tree";
import * as R from "ramda";

const BusLine = types.model("BusLine", {
  name: types.string,
  description: types.string
});

export const BusLineStore = types
  .model("BusLineStore", {
    busLines: types.array(BusLine),
    selectedBusLines: types.array(types.string)
  })
  .views(self => ({
    get root() {
      return getParent(self);
    }
  }))
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
      const response = await self.root.api.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/lines`
      );

      if (response && response.data) {
        self.setBusLines(response.data);
      }
    },
    /**
     * Save changed selected bus lines to
     * localStorage on every snapshot.
     */
    afterCreate() {
      onSnapshot(self, store => {
        const selectedBusLines = store.selectedBusLines;
        const currentLocalStorageBusLines = localStorage.getItem(
          "selectedBusLines"
        );

        if (!R.equals(currentLocalStorageBusLines, selectedBusLines)) {
          localStorage.setItem(
            "selectedBusLines",
            JSON.stringify(selectedBusLines)
          );
        }
      });
    }
  }));
