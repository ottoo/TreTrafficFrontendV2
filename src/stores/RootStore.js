import { types } from "mobx-state-tree";

import { BusLineStore } from "./BusLineStore";
import { MarkerStore } from "./MarkerStore";

export const RootStore = types
  .model("RootStore", {
    busLineStore: types.optional(BusLineStore, { busLines: [] }),
    markerStore: types.optional(MarkerStore, { markers: [] })
  })
  .views(self => ({
    // Shortcut to get bus lines
    get busLines() {
      return self.busLineStore.busLines;
    },
    // Shortcut to get markers
    get markers() {
      return self.markerStore.markers;
    }
  }));
