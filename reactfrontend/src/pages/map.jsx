import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap,useMapEvents  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Sidebar from "./sidebar";
import trash from "../Images/recycle-bin.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const trashIcon = new L.Icon({
  iconUrl: trash,

  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick([lat, lng]);
    },
  });
  return null;
};

const ZoomEffect = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 13, {
        duration: 2, 
      });
    }
  }, [map, userLocation]);

  return null;
};

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          console.log(userLocation);
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    }
  }, []);
  const addMarker = (position) => {
    const newMarker = {
      id: markers.length + 1,
      position,
      description: `Nouvelle dechet ajoutée `,
    };
    setMarkers([...markers, newMarker]);
  };
  console.log(userLocation);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="w-full h-screen p-4">
        <MapContainer
          center={userLocation || [48.8566, 2.3522]}
          zoom={5} 
          className="h-full w-full rounded-lg shadow-lg"
        >
          {userLocation && <ZoomEffect userLocation={userLocation} />}
          <ClickHandler onMapClick={addMarker} />
          {/* Fond de carte */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Marqueur de l'utilisateur */}
          {userLocation && (
            <Marker position={userLocation} icon={customIcon}>
              <Popup>Vous êtes ici !</Popup>
            </Marker>
          )}

          {/* Marqueurs des déchets signalés */}
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position} icon={trashIcon}>
              <Popup>{marker.description}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
