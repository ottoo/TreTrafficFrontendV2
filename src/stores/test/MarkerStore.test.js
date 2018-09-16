import { RootStore } from "../RootStore";
import { mockGetRequest } from "./mockApi";

const apiResponse = {
  data: [
    {
      lineRef: "8",
      vehicleLocation: {
        longitude: "23.6341880",
        latitude: "61.5723425"
      },
      vehicleRef: "LL_43"
    }
  ]
};
const expected = [
  {
    lng: 23.634188,
    lat: 61.5723425,
    lineRef: "8",
    vehicleRef: "LL_43"
  }
];

const mockApi = {
  get: mockGetRequest(apiResponse)
};

it("should load vehicle activity", async () => {
  const store = RootStore.create({}, { api: mockApi });

  await store.markerStore.loadVehicleActivity();
  expect(mockApi.get.mock.calls.length).toBe(1);
  expect(mockApi.get.mock.calls[0][0]).toMatch(
    /\/api\/vehicle-activity\?lineRef=2,3,8,9,17/
  );
  expect(store.markerStore.markers).toEqual(expected);
});
