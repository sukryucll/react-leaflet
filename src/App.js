import { useState } from "react";
import { Icon, divIcon } from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

function App() {
  const [currentLayer, setCurrentLayer] = useState("stamenWatercolor");

  const markers = [
    {
      geocode: [41.1037, 28.9910],
      popUp: "GALATASARAY !",
    },
    {
      geocode: [41.1037, 29.021],
      popUp: "Hello, I am pop up 2",
    },
    {
      geocode: [41.1152, 29.011],
      popUp: "Hello, I am pop up 3",
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("./img/pin.png"),
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    });
  };

  const toggleLayer = () => {
    setCurrentLayer((prevLayer) =>
      prevLayer === "stamenWatercolor" ? "openStreetMap" : "stamenWatercolor"
    );
  };

  return (
    <div>
      <button
        onClick={toggleLayer}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Change Skin
      </button>

      <MapContainer center={[41.0082, 28.9784]} zoom={13} style={{ height: "100vh" }}>
        {currentLayer === "stamenWatercolor" ? (
          <TileLayer
            attribution="Stamen Watercolor"
            url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default App;
