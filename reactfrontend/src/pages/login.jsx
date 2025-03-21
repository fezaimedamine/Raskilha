<<<<<<< HEAD:frontend/app/login/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosLogIn } from 'react-icons/io';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

=======
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { IoIosLogIn } from "react-icons/io";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import wasteManagementImage from "../Images/Volunteering-bro.png";
>>>>>>> 0e0929522ec9d6619e86de0a98021d62cd733127:reactfrontend/src/pages/login.jsx
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
<<<<<<< HEAD:frontend/app/login/page.jsx
  const router = useRouter();
=======
  const navigate = useNavigate(); 
>>>>>>> 0e0929522ec9d6619e86de0a98021d62cd733127:reactfrontend/src/pages/login.jsx
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD:frontend/app/login/page.jsx
      // Send a POST request to the Spring Boot login endpoint
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
=======
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
>>>>>>> 0e0929522ec9d6619e86de0a98021d62cd733127:reactfrontend/src/pages/login.jsx
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
<<<<<<< HEAD:frontend/app/login/page.jsx

      if (response.ok) {
        // Save the token and user details in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userDetails', JSON.stringify(data.user));

        // Redirect to the menu page
        //router.push('/signup');
        console.log('Ceci est le token et le email : '+data.token + ' + '+ data.user);
=======
      if (data.success) {
        localStorage.setItem("userDetails", JSON.stringify(data.data)); // Save user details to localStorage
        navigate("/menu"); // Redirect to the menu page
>>>>>>> 0e0929522ec9d6619e86de0a98021d62cd733127:reactfrontend/src/pages/login.jsx
      } else {
        // Handle errors returned by the backend
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError("Error during login: " + error.message);
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-5/6 max-w-full space-y-6 h-5/6 flex items-center justify-around">
        <div className="flex flex-col justify-around h-5/6 w-96">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800">Log in to your account</h2>
            <h2 className="text-base font-thin text-center text-gray-800">Welcome back! Please enter your details</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <button
                  type="button"
                  onClick={changeVisible}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <MdVisibility className="w-5 h-5" /> : <MdVisibilityOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-zinc-800 text-white font-semibold flex items-center justify-center gap-2 rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <IoIosLogIn className="h-8 w-6" />
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
<<<<<<< HEAD:frontend/app/login/page.jsx
            Don't have an account?{' '}
            <Link href="/signup" className="text-gray-500 hover:underline hover:text-gray-700">
=======
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-500 hover:underline hover:text-gray-700">
>>>>>>> 0e0929522ec9d6619e86de0a98021d62cd733127:reactfrontend/src/pages/login.jsx
              Sign up
            </Link>
          </p>
        </div>

<<<<<<< HEAD:frontend/app/login/page.jsx
        <Image
          src="/Images/Waste management-amico (1).png"
          width={600}
          height={500}
          alt="Team Illustration"
          unoptimized
          priority
        />
=======
        {/* Use <img> instead of Next.js Image */}
        <img src={wasteManagementImage} width={600} height={500} alt="Team Illustration" />
>>>>>>> 0e0929522ec9d6619e86de0a98021d62cd733127:reactfrontend/src/pages/login.jsx
      </div>
    </div>
  );
};

export default Login;