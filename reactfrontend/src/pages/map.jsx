import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap,useMapEvents  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Sidebar from "./sidebar";
import trash from "../Images/recycle-bin.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Loading from "./loading";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import DistanceSlider from "./DistanceSlider";
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
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
  const [selectedmarker, setSelectedMarker] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [distance, setDistance] = useState(10); 


  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      image: null,
      location: "",
    });
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
  const addMarker = async (position) => {
    const newMarker = {
      
      latitude: position[0], 
      longitude: position[1], 
      nom: "Nouvelle déchet ajoutée",
    };
    

    try {
      const response = await fetch("http://localhost:8081/api/localisations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMarker),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du marqueur");
      }
  
      const savedMarker = await response.json();
      setMarkers((prevMarkers) => [...prevMarkers, savedMarker]);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  
    try {
      const response = await axios.get(url);
      const address = response.data.display_name;
      console.log('Address:', address);
      return address;
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  const fetch_markers = async () => {
    if (!userLocation) {
      console.log("La localisation utilisateur est indisponible.");
      return;
    }
    try {
      console.log(distance)
      const response = await fetch(
        `http://localhost:8081/api/localisations/proches?latitude=${userLocation[0]}&longitude=${userLocation[1]}&distanceMax=${distance}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des marqueurs");
      }
  
      const markers = await response.json();
      setMarkers(markers);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  
  useEffect(
    ()=>{
      console.log(distance)
      if (userLocation) {
        fetch_markers();
      }
    },[userLocation,distance]
  );

    
    const validateForm = () => {
      let newErrors = {};
    
      // Title validation
      if (!formData.title.trim()) newErrors.title = "Title is required.";
      else if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters.";
    
      // Description validation
      if (!formData.description.trim()) newErrors.description = "Description is required.";
      else if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters.";
    
      // Image validation (must be a valid image type)
      if (!formData.image) {
        newErrors.image = "Image is required.";
      } else if (!formData.image.type.startsWith("image/")) {
        newErrors.image = "File must be an image.";
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      let newErrors = {image:errors.image};
    
      // Title validation
      if (!formData.title.trim()) newErrors.title = "Title is required.";
      else if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters.";
    
      // Description validation
      if (!formData.description.trim()) newErrors.description = "Description is required.";
      else if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters.";
      setErrors(newErrors);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setErrors({ ...errors, image: null });
      setMediaPreview(URL.createObjectURL(file));
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {    
      
      closeForm()
      setFormData({
        title: "",
        description: "",
        image: null,
        location: "",
      })
    }
  };
  
  const closeForm = () =>{
    setIsOpen(!isOpen)
  
    setErrors({})
  }
  useEffect(() => {
    const fetchLocation = async () => {
      if (selectedmarker) {
        const [lat, lon] = selectedmarker;
        const location = await reverseGeocode(lat, lon);
        setFormData((prevData) => ({ ...prevData, location }));
      }
    };

    if (selectedmarker) {
      fetchLocation();
    }
  }, [selectedmarker]);
  const handleDistanceChange = (newDistance) => {
    setDistance(newDistance);
    console.log(distance);
  };
  return (
    <div className="flex h-screen bg-gray-50">
    {!userLocation && <Loading />}
    {userLocation && (
      <>
        <Sidebar />
  
        <div className="flex flex-col items-center justify-around w-[calc(100vw-80px)] md:w-[calc(100vw-240px)] md:ml-64 ml-20 h-screen p-4">
              <MapContainer
                center={userLocation || [48.8566, 2.3522]}
                zoom={5}
                className="h-[550px] w-11/12 rounded-lg shadow-lg relative z-0"
              >
                {userLocation && <ZoomEffect userLocation={userLocation} />}
                <ClickHandler onMapClick={addMarker} />
                
                {/* Tile Layer */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* User Location Marker */}
                {userLocation && (
                  <Marker position={userLocation} icon={customIcon}>
                    <Popup>Vous êtes ici !</Popup>
                  </Marker>
                )}

                {/* Trash Markers */}
                {markers.map((marker) => (
                  <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={trashIcon}>
                    <Popup>
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedMarker([marker.latitude, marker.longitude]);
                        }}
                        className="flex items-center justify-center gap-2 bg-transparent border-none cursor-pointer hover:bg-green-50 px-4 py-2 rounded-lg"
                      >
                        <FaPlus size={24} color="green" />
                        <span className="text-sm text-gray-700">Add Post</span>
                      </button>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
                <DistanceSlider
                  value={distance}
                  onChange={handleDistanceChange}
                  valueLabelDisplay="on"
                  valueLabelFormat={(distance) => `${distance} km`}
                />

                {/* Form Popup */}
                {isOpen && (
                  <div
                    className="fixed inset-0 bg-slate-700 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={closeForm} // Close form when clicking outside
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 30 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4 }}
                      onClick={(e) => e.stopPropagation()}
                      className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg relative"
                    >
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
                        onClick={closeForm}
                      >
                        ✖
                      </button>

                      <div className="flex items-center mb-4">
                        {/* Placeholder for profile picture */}
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                        <h2 className="text-xl font-semibold">Create a Post</h2>
                      </div>

                      <form onSubmit={handleSubmit}>
                        {/* Post content */}
                        <div className="mt-4 pt-4 border-t">
                          <input
                            type="text"
                            placeholder="Set Post title "
                            className="w-full mb-4 border-none outline-none focus:ring-0 text-xl placeholder-gray-500"
                            value={formData.title}
                            onChange={handleChange}
                          />

                          <textarea
                            className="w-full border-t p-4 focus:ring-0 outline-none resize-none text-lg placeholder-gray-500"
                            rows="3"
                            placeholder="What's on your mind?"
                            value={formData.description}
                            onChange={handleChange}
                          />
                          {/*location */}
                          <div className="flex items-center my-2 p-2 bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <input
                              type="text"
                              className="flex-1 bg-transparent border-none focus:ring-0"
                              readOnly
                              value={formData.location}
                            />
                            
                            {formData.location && (
                              <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setFormData({ ...formData, location: "" })}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>

                          {/* Media Preview */}
                          {mediaPreview && (
                            <div className="relative my-2">
                              <img
                                src={mediaPreview}
                                alt="Preview"
                                className="rounded-lg w-full max-h-60 object-contain"
                              />
                              <button
                                className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-1 hover:bg-opacity-100"
                                onClick={() => {
                                  setMediaPreview(null);
                                  setMediaFile(null);
                                }}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex space-x-2">
                              <button
                                className="p-2 rounded-full hover:bg-gray-100"
                                onClick={() => document.getElementById('media-upload').click()}
                              >
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <input
                                  id="media-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFileChange}
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full mt-8 bg-green-400 text-white p-3 rounded-md hover:bg-green-500 transition"
                        >
                          Post
                        </button>
                      </form>
                    </motion.div>
                  </div>
                )}
              </div>

      </>
    )}
  </div>
  
            );
          };

export default Map;
