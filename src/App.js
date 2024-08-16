import { Icon } from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const markers = [
    {
      geocode: [41.034, 28.9684],
      popUp: "Hello, I am pop up 1",
    },
    {
      geocode: [41.0086, 28.96],
      popUp: "Hello, I am pop up 2",
    },
    {
      geocode: [41.025, 28.9788],
      popUp: "Hello, I am pop up 3",
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("./img/pin.png"),
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={[41.0082, 28.9784]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={customIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
