import { types } from "mobx-state-tree";

import { MarkerStore } from "./MarkerStore";

export const RootStore = types
  .model("RootStore", {
    markerStore: types.optional(MarkerStore, { markers: [] })
  })
  .views(self => ({
    // Shortcut to get markers
    get markers() {
      return self.markerStore.markers;
    }
  }));
