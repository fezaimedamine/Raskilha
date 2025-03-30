import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import MenuBar from "./menubar";

import { motion } from "framer-motion";


import axios from "axios";
import PostCard from "./PostCard";



export default function Publication() {
  
  const [filteredPosts,setFilteredPosts] = useState("");
 
  const [mediaPreview, setMediaPreview] = useState(null);

  const [showLocation, setShowLocation] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
      title: "",
      description: "",
      image: null,
      location: "",
      region:""
    }); 
  const validateForm = () => {
    let newErrors = {};
    console.log(formData.title)
    // Title validation
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    else if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters.";
  
    // Image validation (must be a valid image type)
    
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.title)

};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file ) {
      if(file.type.startsWith("image/")){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onloadend = () => {setFormData({ ...formData, image: reader.result.split(",")[1] });console.log(reader.result)}; // Convert to Base64
        setMediaPreview(URL.createObjectURL(file));
      }else{
        setErrors({image:"File must be a file type"})
      }
    }else{
      setErrors({image:"Image is required"})
    }
/*if (!formData.image) {
  newErrors.image = "Image is required.";
} else if (!formData.image.type.startsWith("image/")) {
  newErrors.image = "File must be an image.";
}*/
};


const handleSubmit = async(e) => {
  e.preventDefault();
  if (!validateForm()) return; 
  try{
        const response = await fetch("http://localhost:8081/api/pubs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Make sure we send the content type as JSON
          },
          body: JSON.stringify({
            titre: formData.title,
            description: formData.description,
            localisation:{
              adresse: formData.location,
              ville: formData.region,
            },
            image: formData.image,  // Send image as Base64
            etat: "ACTIVE",
            type:"OFFRE",
            user:{
              id:1
            }
          }),
        });
  
        const data = await response.json();
        
      }catch (error) {
        console.log("Error during login: " + error);
      }
    closeForm()
    setMediaPreview(null);
    setQuery("")
    setFormData({
      title: "",
      description: "",
      image: null,
      location: "",
      region:""
    })
  
};

const closeForm = () =>{
  setIsOpen(!isOpen)


}
const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);

   useEffect(() => {
      if (query.length < 3) return;
  
      const fetchLocations = async () => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        const data = await response.json();
        setSuggestions(data);
      };
  
      fetchLocations();
    }, [query]);
   

    useEffect(() => {
      axios.get("http://localhost:8081/api/pubs")
        .then(response => {
          setFilteredPosts(response.data); // Axios automatically parses JSON
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    }, []);

  return (
    <>
    <Sidebar/>
    <MenuBar setFilteredPosts={setFilteredPosts}/>
    
    
    {isOpen && (
  <div
    className="fixed inset-0 bg-slate-700 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={closeForm} // Close form when clicking outside
  >
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 10 }}
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
      <div className="flex items-center gap-3 mb-4">
        {/* Placeholder for profile picture */}
        <img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="profile_image" />
        <h2 className="text-xl font-semibold">Create a Post</h2>
        </div>
        
            

      <form onSubmit={handleSubmit}>
        {/* Post content */}
        <div className="mt-4 pt-4 border-t">
                  <input type="text" placeholder="Set Post title " 
                  className="w-full mb-4 border-none outline-none focus:ring-0  text-2xl font-medium placeholder-gray-500"
                  required
                  name="title"
                  value={formData.title}
                  onChange={ handleChange}
                  />
                   
                  <textarea
                    className="w-full border-t p-4 focus:ring-0 outline-none resize-none text-lg placeholder-gray-500"
                    rows="2"
                    name="description"
                    placeholder="What's on your mind?"
                    value={formData.description}
                    onChange={handleChange}
                  />
<label for="city">Choose a city:</label>
<select   required
          onChange={(e)=>{setFormData({...formData,region:e.target.value})}}
          className="bg-gray-300 ml-2 text-black p-2 rounded-md"
          name="region"
          value={formData.region}
          
        >
          <option selected value="">Choose a region </option>
          <option value="Tunis">Tunis </option>
          <option value="Sfax">Sfax</option>
          <option value="Ville">Ville</option>
        </select>

 
 

                  {/* Media Preview */}
                  {mediaPreview && (
                    <div className="relative  my-2">
                      <img 
                        src={mediaPreview} 
                        alt="Preview" 
                        className="rounded-lg w-full max-h-60  object-contain"
                      />
                      <button 
                        className="absolute top-0 right-0 bg-gray-800 bg-opacity-75 text-white rounded-full p-1 hover:bg-opacity-100"
                        onClick={() => {
                          setMediaPreview(null);
                          setFormData({ ...formData, image: null });
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Location Input */}
                  {showLocation && (<>
                    <div className="flex items-center my-2 p-2 bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="text"
                        className="flex-1 bg-transparent border-none p-1 focus:ring-0"
                        placeholder="Where are you?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      {query && (
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => {setFormData({ ...formData, location: "" } ) ;setQuery("")}}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    
                      </div>
                      {suggestions.length > 0 && (
                    <ul className="border absolute z-10 bg-white mt-48 mr-2 rounded-lg shadow-md max-h-40 overflow-y-auto w-full">
                      {suggestions.map((place, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setFormData({ ...formData, location: place.display_name });
                            setQuery(place.display_name);
                            setSuggestions([]);
                          }}
                          className="p-3 cursor-pointer text-gray-700 hover:bg-green-100"
                        >
                          {place.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                      </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-4 cursor-pointer">
                    <div className="flex space-x-2">
                      <div 
                        className="p-2 rounded-full hover:bg-gray-100 "
                        onClick={() => document.getElementById('media-upload').click()}
                      >
                        <svg className="w-6 h-6 text-green-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <input
                          required
                          id="media-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>

                      <div 
                        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer" 
                        onClick={() => setShowLocation(!showLocation)}
                      >
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
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
        
        <div className="flex ml-24 items-center flex-col gap-9 mt-32 mb-5 w-[calc(100vw-94px)] md:w-[calc(100vw-272px)] md:ml-64">
          
          <div className="  w-80 md:w-1/2 mr-24 flex flex-col gap-4 items-center">
            {/* Create Post Component */}
            <div className="bg-white rounded-lg shadow p-4 mb-4 w-full">
              {/* Create Post Header */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/1.jpg" 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-4 text-gray-500 transition"
                  onClick={() => setIsOpen(true)}
                >
                  What's on your mind?
                </button>
              </div>

              {/* Divider */}
              <hr className="my-2" />

              {/* Post Options */}
              <div className="flex justify-between">
                <button 
                  className="flex items-center justify-center flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => {
                    setIsOpen(true);
                    
                  }}
                >
                  <div className="w-6 h-6 text-green-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Photo
                </button>

                

                <button 
                  className="flex items-center justify-center flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => {
                    setIsOpen(true);
                    
                  }}
                >
                  <div className="w-6 h-6 text-blue-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Location
                </button>
              </div>

              {/* Expanded Post Form */}
             
            </div>

            {/* Posts List */}
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}

          </div>
        </div>
  

  


   {/*<div className="flex">
     
     <Sidebar/>
     

   <div className="flex ml-24 items-center flex-col gap-9 mt-16  mb-5 w-[calc(100vw-94px)] md:w-[calc(100vw-272px)] md:ml-64">
   <MenuBar/>
   
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
   
   
      
      </div>
      </div>*/}
 
  </>
  );
}