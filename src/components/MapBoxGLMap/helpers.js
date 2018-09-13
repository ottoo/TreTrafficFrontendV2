import mapboxgl from "mapbox-gl";

export const createCustomMarker = m => {
  const lineRef = document.createElement("div");
  lineRef.className = "lineref";
  lineRef.textContent = m.lineRef;

  const actual = document.createElement("div");
  actual.className = "marker";
  actual.appendChild(lineRef);

  const markerContainer = document.createElement("div");
  markerContainer.appendChild(actual);
  return markerContainer;
};

export const createMarker = m => {
  const created = new mapboxgl.Marker(createCustomMarker(m), {
    anchor: "bottom"
  }).setLngLat([m.lng, m.lat]);
  created.lineRef = m.lineRef;
  created.vehicleRef = m.vehicleRef;
  return created;
};
