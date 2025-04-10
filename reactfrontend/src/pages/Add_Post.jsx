import { useState, useEffect ,useContext } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";



export default function Add_Post({userDetails,fetchPosts,setUserDetails ,closeForm}){

  const fetchData = async () => { 
    if (userDetails){
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/${userDetails.user.user_id}`
      );
      const updatedUser = await response.json();

      setUserDetails((prevDetails) => {
        const newDetails = { ...prevDetails, user: updatedUser };
        
        // Update localStorage with the updated user details
        localStorage.setItem('userDetails', JSON.stringify(newDetails));
  
        return newDetails;
      });
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };
  }
  const [mediaPreview, setMediaPreview] = useState(null);

  const [showLocation, setShowLocation] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        location: "",
        region:""
      });

   
  const validateForm = () => { 
    // Title validation
    if (!formData.title.trim()) {
      throw ("Title is required.")  ;
     }
      if (formData.title.length < 3) {
        throw ("Title must be at least 3 characters.") 
      }
      if (!formData.image){
        throw ("An image is required.")
      }
    // Image validation (must be a valid image type)
    return true;
    
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
        
        reader.onloadend = () => {setFormData({ ...formData, image: reader.result.split(",")[1] })}; // Convert to Base64
        setMediaPreview(URL.createObjectURL(file));
      }else{
        setError("File must be an image type")
      }
    }
};
const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      if (!validateForm()) return
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
                id:userDetails.user.user_id
              }
            }),
          });
          const contentType = response.headers.get("Content-Type");
            let responseData;
          if (contentType && contentType.includes("application/json")) {
            responseData = await response.json(); // Parse JSON response
            fetchPosts()
            fetchData()
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
          toast.success("Your post is added successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          } else {
            responseData = await response.text(); // Read as text
            if (responseData.includes("Packet for query is too large")) {
                throw ("Image is too large to upload. Please choose a smaller file.");
              }
            throw(responseData)
          } 
          
        }catch (error) {
          setError("Error while adding a post: " + error);
        } 
  };

const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const fetchLocations = async () => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}`
    );
    
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw ('Network response was not ok');
    }
    const data = await response.json();
    setSuggestions(data);
  } catch (error) {
    // Handle any errors that occur during the fetch
    setError('Error while fetching locations:'+ error);
    // Optionally, you could show a message to the user or handle the error in a different way
  }
};

useEffect(() => {
    console.log(suggestions)
      if (query.length < 3) return;
      fetchLocations();
    }, [query]);

    const[user_image,setuser_image]=useState(null)
    useEffect(() => {
          
          if(userDetails){
            setuser_image(userDetails.user.imageProfil)
          }
      },[userDetails])  ; 
      const[error,setError]=useState(null)
    const showError = () => {
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      };
      useEffect(() => {
        if (error) {
          showError();
          setError(null);
        }
      }, [error]);
return (
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
          <img className="w-10 h-10 rounded-full" src={`data:image/jpeg;base64,${user_image}`} alt="profile_image" />
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
                            onClick={() => {
                              setFormData({ ...formData, location: "",region:"" } ) ;
                              setQuery("");
                            }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      
                        </div>
                        {suggestions.length > 0 && (
                            <ul className="border absolute z-10 bg-white mr-2 rounded-lg shadow-md max-h-40 overflow-y-auto">
                              {suggestions.map((place, index) => {
                                // Extract region data properly
                                const { city, town, village, municipality, county, state, state_district  } = place.address || {};
                                const cityName = city || town || village || municipality || county || state || state_district  || "Unknown City";
  return(
                                
                                  <li
                                    key={index}
                                    onClick={() => {
                                      setFormData({ ...formData, location: place.display_name ,region:cityName }); // Send only the region
                                     
                                      setQuery(place.display_name); 
                                      setSuggestions([]);
                                    }}
                                    className="p-3 cursor-pointer text-gray-700 hover:bg-green-100"
                                  >
                                    {place.display_name}
                                  </li>
                                
                              )})}
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
  )
}
