import { getEnv, types } from "mobx-state-tree";

import { BusLineStore } from "./BusLineStore";
import { MarkerStore } from "./MarkerStore";

const initialBusLines = ["2", "3", "8", "9", "17"];
const getInitialBusLines = () =>
  JSON.parse(localStorage.getItem("selectedBusLines")) || initialBusLines;

export const RootStore = types
  .model("RootStore", {
    busLineStore: types.optional(BusLineStore, {
      busLines: [],
      selectedBusLines: getInitialBusLines()
    }),
    markerStore: types.optional(MarkerStore, { markers: [] })
  })
  .views(self => ({
    // Shortcut to get the used api
    get api() {
      return getEnv(self).api;
    },
    // Shortcut to get bus lines
    get busLines() {
      return self.busLineStore.busLines;
    },
    // Shortcut to get selected bus lines
    get selectedBusLines() {
      return self.busLineStore.selectedBusLines;
    },
    // Shortcut to get markers
    get markers() {
      return self.markerStore.markers;
    }
  }));
