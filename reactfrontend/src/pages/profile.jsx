import { useState, useEffect ,useContext } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useRef } from "react";
import Sidebar from "./sidebar"
import { motion } from "framer-motion";
import PostCard from "./PostCard";
import axios from "axios";
import userpng from "../Images/user.png";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";



const ProfilePage = () => {  
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [publications, setPublications] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8081/api/pubs/user/"+userDetails?.user.user_id)

      .then(response => {
        setPublications(response.data); // Axios automatically parses JSON
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, [userDetails]);
  
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

const [showForm,setShowForm]=useState(false)
const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    password: "",
    region: "",
    adresse:"",
    imageProfil:null
  })
  useEffect(() => {
  const fillForm = async () => {
    try {
      setFormData({
        firstName:userDetails?.user.nom,
        lastName: userDetails?.user.prenom,
        username: userDetails?.user.nomProfil,
        age: userDetails?.user.age,
        region: userDetails?.user.adresse,
        imageProfil: userDetails?.user.imageProfil,
      });
      setPreview('data:image/jpeg;base64,'+userDetails?.user.imageProfil);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {

    }
  };fillForm();
}, [userDetails]); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the file from the input
    
    if (file) {
      if (file.type.startsWith("image/")) { // Check if the file is an image
        const reader = new FileReader();
        
        // Read the file as a data URL (Base64)
        reader.readAsDataURL(file);
        
        reader.onloadend = () => {
          // Set the Base64 string of the image in the form data
          setFormData({ ...formData, imageProfil : reader.result.split(",")[1] }); 
        };
        
        setPreview(URL.createObjectURL(file));
      } else {
       // setErrors({ ...errors, imageProfil : "File must be an image type" });
      }
    } else {
    
      //setErrors({ ...errors, imageProfil : "Image is required" });
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const fetchData = async () => {
   
    // Fetch FRESH user data to ensure up-to-date points/info
    try {
      const response = await fetch(
       "http://localhost:8081/api/users/"+userDetails?.user.user_id
      );
      const updatedUser = await response.json();
      console.log(updatedUser);
      setUserDetails((prevDetails) => {
        const newDetails = { ...prevDetails, user: updatedUser };
        
        // Update localStorage with the updated user details
        localStorage.setItem('userDetails', JSON.stringify(newDetails));
  
        return newDetails;
      });

    } catch (err) {
      //setError("Failed to refresh user data:", err);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userData = {
        nom: formData.firstName,
        prenom: formData.lastName,
        age: formData.age,
        nomProfil: formData.username,
        adress: formData.region,
        password: formData.password,
        imageProfil: formData.imageProfil,
      };
  
      const response = await axios.put(
        `http://localhost:8081/api/users/update/${userDetails.user.user_id}`,
        userData, // Send the JavaScript object directly; Axios will serialize it to JSON
        {
          headers: {
            'Content-Type': 'application/json', // Correct Content-Type for JSON
          },
        }
      );

      fetchData();

      setShowForm(false);
      Swal.fire({
              icon: "success",
              title: "Profile updated!",
              text: "Your data updated with success!",
              timer: 2000,
              showConfirmButton: false
            });
    } catch (error) {
      console.error("Error during update:", error);
      alert("Failed to update profile. Please try again.");
      Swal.fire({
        icon: "success",
        title: "Failed to update profile",
        text: "Please try again.",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (<>
      <Sidebar/>

      <div className=" ml-24  w-[calc(100vw-94px)] md:w-[calc(100vw-272px)] md:ml-64">
<div className="max-w-xl mx-auto p-6 bg-white  rounded-lg dark:bg-gray-800 dark:text-white">
      {/* Profile Header */}
      <div className="border-b-4 pb-8">
      <div className="flex items-center justify-around mb-4">
      <div className="flex items-center">
      {userDetails && <img src={`data:image/jpeg;base64,${userDetails?.user?.imageProfil}`} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />}
        <div>
          <h2 className="text-xl font-bold">Profile</h2>
          {userDetails && <p className="text-gray-600  dark:text-white">{userDetails.user.nomProfil}</p>}
          </div>
        </div>
      
      
      <button
        onClick={()=>setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Update Profile
      </button>
      </div>
      </div>
      {/* Publications List */}
      <h3 className="mt-6 text-lg font-semibold">Your Posts</h3>
      
        
          {publications.length > 0 ? (
            publications.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-gray-500">You haven't posted yet.</p>
          )
        }

    </div>
    </div>


    {showForm && <div
    className="fixed inset-0 bg-slate-700 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={()=> setShowForm(false)} // Close form when clicking outside
  >   
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 10 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      onClick={(e) => e.stopPropagation()}
      className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg relative"
    >
      <div>
            <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">Update Your Profile </h2>
            
          </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" >
                 
                    
                      {/* First Name and Last Name */}
                      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            name="firstName"
            id="firstName"
            value= {formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="firstName"
            className={`absolute left-3 text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
              ${formData.firstName ? "-top-3 text-sm " : "top-2"}`}
          >
            First Name
          </label>
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="lastName"
            className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
              ${formData.lastName ? "-top-3 text-sm " : "top-2"}`}
          >
            Last Name
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center mb-7">
                        <div className="relative w-44 h-44 flex flex-col gap-3">
                         
                          <label htmlFor="imageProfil" className="cursor-pointer">
                            <img
                              src={
                                preview ||
                                userpng // Default avatar
                              }
                              alt="Profile"
                              className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            
                            <div className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border-2 border-white hover:bg-gray-700 transition-all">
                              <FaCamera className="text-white text-sm" />
                            </div>
                            
                          </label>
                          <h1 className="font-sans text-zinc-800 font-semibold text-center">Add a profile photo</h1>
                          
                          <input
                            type="file"
                            id="imageProfil"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </div>
                    </div>
      
      
      {/* Username and Age */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="username"
            className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
              ${formData.username ? "-top-3 text-sm " : "top-2"}`}
          >
            Username
          </label>
        </div>
        <div className="w-24 relative">
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="age"
            className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
              ${formData.age ? "-top-3 text-sm " : "top-2"}`}
          >
            Age
          </label>
        </div>
      </div>
      
      
      {/* Password */}
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer pr-10"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
            peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
            ${formData.password ? "-top-3 text-sm " : "top-2"}`}
        >
          Password
        </label>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          {passwordVisible ? <MdVisibility className="w-5 h-5" /> : <MdVisibilityOff className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Region Search */}
      <div className="relative">
        <input
          type="text"
          name="region"
          id="region"
          value={formData.region}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
          placeholder=" "
        />
        <label
          htmlFor="region"
          className={`absolute left-3 text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
            peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500 
            ${formData.region ? " -top-3 text-sm " : "top-2 "}`}
        >
          Region
        </label>
        <button
                  type="submit"
                  
                  className="w-full mt-4 bg-green-300 text-white p-2 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300"
                >
                  Update
                </button>
              
            
       </div>
       </form>
       
        </motion.div>
        </div>
}
       
          
        </>
  )
      };

export default ProfilePage;