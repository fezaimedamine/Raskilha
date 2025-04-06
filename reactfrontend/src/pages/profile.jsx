import { useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";
import Sidebar from "./sidebar"
import { motion } from "framer-motion";
import PostCard from "./PostCard";
import axios from "axios";


const ProfilePage = () => {
  const [user, setUser] = useState([])
  
useEffect(() => {
  const fetchUser = async () => {
    try {
      setUser(JSON.parse(localStorage.getItem('userDetails')).user);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {

    }
  };

  fetchUser();
}, []);
  const [publications, setPublications] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8081/api/pubs")
      .then(response => {
        setPublications(response.data); // Axios automatically parses JSON
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  
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
    email: "",
    password: "",
    region: "",
    adresse:"",
    image:null
  })
  useEffect(() => {
  const fillForm = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userDetails')).user;
      setFormData({
        firstName: user.nom,
        lastName: user.prenom,
        username: user.nomProfil,
        age: user.age,
        email: user.email,
        region: user.region,
        adresse:user.adresse,
        image:null
      });
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {

    }
  };fillForm();
}, []); 
  const handleChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please select an image file (jpeg, png, etc.)');
        return;
      }
      
      if (file.size > 40 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      setFormData({
        ...formData,
        profileImage: file
      });


      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleUpdateProfile = () => {
    alert("Update Profile clicked!");
  };
  const handleSubmit = async() =>{
    try {
      const response = await fetch("http://localhost:8081/raskilha/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user:user }),
      });
    }catch (error) {
      console.error("Error during update:" + error.message);
    }
  };

  return (<>
      <Sidebar/>

      <div className=" ml-24  w-[calc(100vw-94px)] md:w-[calc(100vw-272px)] md:ml-64">
<div className="max-w-xl mx-auto p-6 bg-white  rounded-lg">
      {/* Profile Header */}
      <div className="border-b-4 pb-8">
      <div className="flex items-center mb-4">
        <img src={user.image} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-bold">profil</h2>
          <p className="text-gray-600">{user.nomProfil}</p>
        </div>
      </div>
      
      <button
        onClick={()=>setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Update Profile
      </button>
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
      <div className="flex-1 relative">
          
          <input
            type="file"
            name="profile image"
            id="profile image"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
            required
          />
          <label
          htmlFor="profile image"
          className={` left-3 text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
            peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
            `}
            >Profile Image</label>
          
          <div className="image-upload-area">
            {preview ? (
              <div className="image-preview-container">
                <img 
                  src={preview} 
                  alt="Profile preview" 
                  className="profile-preview"
                />
                <button 
                  type="button" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={triggerFileSelect}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={triggerFileSelect}
              >
                <span>+</span>
                Click to upload profile image
              </button>
            )}
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
      
      {/* Email */}
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
            peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
            ${formData.email ? "-top-3 text-sm " : "top-2"}`}
        >
          Email
        </label>
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
