import { types } from "mobx-state-tree";

import { BusLineStore } from "./BusLineStore";
import { MarkerStore } from "./MarkerStore";

export const RootStore = types
  .model("RootStore", {
    busLineStore: types.optional(BusLineStore, {
      busLines: [],
      selectedBusLines: ["2", "3", "8", "9", "17"]
    }),
    markerStore: types.optional(MarkerStore, { markers: [] })
  })
  .views(self => ({
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
