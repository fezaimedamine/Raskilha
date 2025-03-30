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
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    email: "",
    password: "",
    location: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
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
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: selectedRole }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error during signup: " + error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-11/12  flex flex-row items-center">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800">Get Started Now</h2>
            <h2 className="text-base font-thin text-center text-gray-800">
              Welcome to Raskilha - Let's create your account.
            </h2>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                {/* First Name and Last Name */}
                <div className="flex gap-4">
  <div className="flex-1 relative">
    <input
      type="text"
      name="firstName"
      id="firstName"
      value={formData.firstName}
      onChange={handleChange}
      className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="firstName"
      className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
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
    name="location"
    id="location"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full p-2 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
    placeholder=" "
  />
  <label
    htmlFor="location"
    className={`absolute left-3  text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500
      ${query ? "-top-3 text-sm " : "top-2"}`}
  >
    Region
  </label>


                  {suggestions.length > 0 && (
                    <ul className="border absolute z-10 bg-white mt-2 rounded-lg shadow-md max-h-40 overflow-y-auto w-full">
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
              <>
                <div className="flex flex-col gap-6">
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