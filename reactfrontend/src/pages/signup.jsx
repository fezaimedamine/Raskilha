import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import collectorImage from "../Images/eboueur (2).png";
import citizenImage from "../Images/citizen (2).png";

import wasteManagementImage2 from "../Images/Volunteering-bro.png";


const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    nomProfil: "",
    age: "",
    imageProfil:null,
    genre:"Male",
    email: "",
    tel:"",
    password: "",
    adresse: "",
  });
  const[error,setError]=useState(null)
  const[errors,setErrors]=useState([])
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  const validateForm = (formData) => {
    let newErrors = {};
  
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
  
    setErrors(newErrors);
  
    // Check if there are no errors
    return Object.values(newErrors).every((err) => err === "");
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file ) {
      if(file.type.startsWith("image/")){
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onloadend = () => {setFormData({ ...formData, imageProfil: reader.result.split(",")[1] })}; // Convert to Base64
        //setMediaPreview(URL.createObjectURL(file));
        
      }else{
        
        setError("File must be a file type")
      }
    }

};
  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "nom":
      case "prenom":
      case "nomProfil":
      case "adresse":
        if (!value.trim()) errorMessage = "This field is required";
        break;

      case "age":
        if (!value) errorMessage = "Age is required";
        else if (value <=0 ) errorMessage = "Wrong age";
        break;

      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) errorMessage = "Invalid Email ";
        break;

      case "tel":
        if (!/^[0-9]{8}$/.test(value)) errorMessage = "Phone number must be 8 numbers";
        break;

      case "password":
        if (value.length < 6) errorMessage = "Password must have at least 6 caracters";
        break;

      default:
        break;
    }

    return errorMessage;
  };
  const handleChange = (e) => {
    const{name,value}=e.target
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleNext = () => {
    if (validateForm(formData)){
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const response = await fetch("http://localhost:8081/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: selectedRole}),
      });
      const responseData = await response.text();
      if (responseData.includes("Email déjà utilisé !")) {
        throw new Error("Email déjà utilisé !");
      }
      console.log("success")
     toast.success("utilisateur enregistré avec succès",{
      closeOnClick: true,
      autoClose: 3000,
    })
     navigate("/Login")
    } catch (error) {
      console.error(error)
      toast.error("Error during signup: " + error.message,{
        closeOnClick: true,
        autoClose: 3000,
      });
      
    }
  };

  const showError = () => {
    toast.error(error, {
      position: "top-center",
      autoClose: 1000,
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-11/12  flex flex-row items-center">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 flex flex-col gap-7">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800">Get Started Now</h2>
            <h2 className="text-base font-thin text-center text-gray-800">
              Welcome to Raskilha - Let's create your account.
            </h2>
          </div>
          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                {/* First Name and Last Name */}
                <div className="flex gap-4">
  <div className="flex-1 relative">
    <input
      type="text"
      name="nom"
      id="nom"
      value={formData.nom}
      onChange={handleChange}
      className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.nom ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
      placeholder=" "
      required
    />
    <label
      htmlFor="nom"
      className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
        peer-focus:-top-3 peer-focus:text-sm  ${errors.nom ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
        ${formData.nom ? "-top-3 text-sm " : "top-2"}`}
    >
      FirstName
    </label>
    {errors.nom && <p className="text-red-500 text-xs fixed ml-2" >{errors.nom}</p>}
  </div>
  <div className="flex-1 relative">
    <input
      type="text"
      name="prenom"
      id="prenom"
      value={formData.prenom}
      onChange={handleChange}
      className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.prenom ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
      
      placeholder=" "
      required
    />
    <label
      htmlFor="prenom"
      className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
        peer-focus:-top-3 peer-focus:text-sm  ${errors.prenom ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
        ${formData.prenom ? "-top-3 text-sm " : "top-2"}`}
    >
      LastName
    </label>
    {errors.prenom && <p className="text-red-500 text-xs fixed ml-2" >{errors.prenom}</p>}
  </div>
</div>

{/* Username and Age */}
<div className="flex gap-4">
  <div className="flex-1 relative">
    <input
      type="text"
      name="nomProfil"
      id="nomProfil"
      value={formData.nomProfil}
      onChange={handleChange}
      className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.nomProfil ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
      placeholder=" "
      required
    />
    <label
      htmlFor="nomProfil"
      className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
        peer-focus:-top-3 peer-focus:text-sm  ${errors.nomProfil ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
        ${formData.nomProfil ? "-top-3 text-sm " : "top-2"}`}
    >
      UserName
    </label>
    {errors.nomProfil && <p className="text-red-500 text-xs fixed ml-2" >{errors.nomProfil}</p>}
  </div>
  <div className="w-24 relative">
    <input
      type="number"
      name="age"
      id="age"
      value={formData.age}
      onChange={handleChange}
      className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.age ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
      placeholder=" "
      required
    />
    <label
      htmlFor="age"
      className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
        peer-focus:-top-3 peer-focus:text-sm  ${errors.age ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
        ${formData.age ? "-top-3 text-sm " : "top-2"}`}
    >
      Age
    </label>
    {errors.age && <p className="text-red-500 text-xs fixed ml-2" >{errors.age}</p>}
  </div>
</div>
{/*Gender */}
<div className="relative">
<select className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer" id="genre" name="genre"  onChange={handleChange}>
        
        <option value="Male" selected>Homme</option>
        <option value="Female">Femme</option>
        <option value="Other">Autre</option>
      </select>
  <label
    htmlFor="genre"
    className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
      ${formData.genre ? "-top-3 text-sm " : "top-2"}`}
  >
    Gender
  </label>
</div>

{/* Email */}
<div className="relative">
  <input
    type="email"
    name="email"
    id="email"
    value={formData.email}
    onChange={handleChange}
    className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.email ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
    placeholder=" "
    required
  />
  <label
    htmlFor="email"
    className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
      peer-focus:-top-3 peer-focus:text-sm  ${errors.email ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
      ${formData.email ? "-top-3 text-sm " : "top-2"}`}
  >
    Email
  </label>
  {errors.email && <p className="text-red-500 text-xs fixed ml-2" >{errors.email}</p>}
</div>

{/* Password */}
<div className="relative">
  <input
    type={passwordVisible ? "text" : "password"}
    name="password"
    id="password"
    value={formData.password}
    onChange={handleChange}
    className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.password ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
    placeholder=" "
    required
  />
  <label
    htmlFor="password"
    className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
      peer-focus:-top-3 peer-focus:text-sm  ${errors.password ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
      ${formData.password ? "-top-3 text-sm " : "top-2"}`}
  >
    Password
  </label>
  {errors.password && <p className="text-red-500 text-xs fixed ml-2" >{errors.password}</p>}
  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
  >
    {passwordVisible ? <MdVisibility className="w-5 h-5" /> : <MdVisibilityOff className="w-5 h-5" />}
  </button>
</div>

{/* Tel */}
<div className="relative">
  <input
    type="tel"
    name="tel"
    id="tel"
    value={formData.tel}
    onChange={handleChange}
    className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.tel ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
    placeholder=" "
    required
  />
  <label
    htmlFor="tel"
    className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
      peer-focus:-top-3 peer-focus:text-sm  ${errors.tel ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
      ${formData.tel ? "-top-3 text-sm " : "top-2"}`}
  >
    Phone
  </label>
  {errors.tel && <p className="text-red-500 text-xs fixed ml-2" >{errors.tel}</p>}
</div>

{/* Region Search */}
<div className="relative">
  <input
    type="text"
    name="adresse"
    id="adresse"
    value={query}
    onChange={(e) => {setQuery(e.target.value);
                      setFormData( {...formData, adresse: "" });
                      
                      setErrors({ ...errors, adresse: " You must choose from the suggestions"})
                    }}
    className={`w-full p-2 border-2 rounded-lg text-gray-700   focus:outline-none focus:ring-2  transition duration-300 peer ${errors.adresse ? " focus:border-red-200 focus:ring-red-200 border-red-300 " : "focus:border-green-200 border-gray-300 focus:ring-green-200"}`}
    placeholder=" "
  />
  <label
    htmlFor="adresse"
    className={`absolute left-3   bg-white px-1 transition-all duration-300 pointer-events-none
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
      peer-focus:-top-3 peer-focus:text-sm  ${errors.adresse ? "peer-focus:text-red-500 text-red-500 peer-placeholder-shown:text-red-500" : "peer-focus:text-green-500 peer-placeholder-shown:text-gray-500 text-gray-500"}
      ${query ? "-top-3 text-sm " : "top-2"}`}
  >
    Region
  </label>
  {errors.adresse  && <p className="text-red-500 text-xs fixed ml-2" >{errors.adresse}</p>}


                  {suggestions.length > 0 && (
                    <ul className="border absolute z-10 bg-white mt-2 rounded-lg shadow-md max-h-40 overflow-y-auto w-full">
                      {suggestions.map((place, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setFormData({ ...formData, adresse: place.display_name });
                            setErrors({...errors,adresse:""})
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
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-green-300 text-white p-2 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300"
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>{/* Image Upload Section */}
              <div className="">
                <label htmlFor="image-upload" className="block text-gray-700 font-semibold">
                  Upload Your Profile Image:
                </label>
                <input
                  
                  type="file"
                  id="image-upload"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="   p-1  border border-gray-300 rounded"
                />
              </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-gray-700 text-center">Choose your role:</h1>
                  <div className="flex flex-col md:flex-row justify-around gap-6">
                    {/* Collector Role */}
                    <div
                      className={`cursor-pointer flex flex-col items-center p-4 rounded-xl border-2 ${
                        selectedRole === "collector"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-green-300 hover:bg-green-50"
                      } transition duration-300`}
                      onClick={() => handleRoleSelect("collector")}
                    >
                      <img src={collectorImage} width={250} height={300} alt="Collector" className="mb-4" />
                      <h1 className="text-gray-700 font-semibold">Collector</h1>
                    </div>

                    {/* Citizen Role */}
                    <div
                      className={`cursor-pointer flex flex-col items-center p-4 rounded-xl border-2 ${
                        selectedRole === "citizen"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-green-300 hover:bg-green-50"
                      } transition duration-300`}
                      onClick={() => handleRoleSelect("citizen")}
                    >
                      <img src={citizenImage} width={250} height={300} alt="Citizen" className="mb-4" />
                      <h1 className="text-gray-700 font-semibold">Citizen</h1>
                    </div>
                  </div>

                  {/* Back and Sign Up Buttons */}
                  <div className="flex justify-around">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-38 bg-gray-500 text-white p-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className={`w-38 bg-green-300 text-white p-2 px-4 rounded ${
                        selectedRole ? "hover:bg-green-400" : "bg-gray-400 cursor-not-allowed"
                      } focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300`}
                      disabled={!selectedRole}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 hover:text-green-700 hover:underline">
              Login here
            </Link>
          </p>
        </div>


        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
          <img src={wasteManagementImage2} width={600} height={600} alt="Signup Illustration" />

        </div>
      </div>
    </div>
  );
};

export default Signup;