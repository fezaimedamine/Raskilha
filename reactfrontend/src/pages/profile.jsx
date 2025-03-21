import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Profile updated successfully!");
        navigate("/dashboard"); // Redirect to the dashboard or profile page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-11/12 max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-green-100 flex items-center justify-center">
              {formData.profilePicture ? (
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-green-600">🌿</span> // Recycling-themed placeholder
              )}
            </div>
            <label className="mt-4 cursor-pointer">
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <span className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                Upload Photo
              </span>
            </label>
          </div>

          {/* First Name */}
          <div className="relative">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="firstName"
              className="absolute left-3 top-3 text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500"
            >
              First Name
            </label>
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="lastName"
              className="absolute left-3 top-3 text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500"
            >
              Last Name
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
              className="w-full p-3 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-3 text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500"
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
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded-lg text-gray-700 border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300 peer pr-10"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-gray-500 bg-white px-1 transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500"
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

          {/* Save Changes Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;