import { RootStore } from "../RootStore";
import { mockGetRequest } from "./mockApi";

const lines = {
  data: [
    { name: "3", description: "Paikka A - Paikka B" },
    { name: "17", description: "Paikka C - Paikka D" }
  ]
};

const mockApi = {
  get: mockGetRequest(lines)
};

it("should load available bus lines", async () => {
  const store = RootStore.create({}, { api: mockApi });
  await store.busLineStore.loadBusLines();

  expect(mockApi.get.mock.calls.length).toBe(1);
  expect(mockApi.get.mock.calls[0][0]).toMatch(/\/api\/lines/);
  expect(store.busLineStore.busLines).toEqual(lines.data);
});
