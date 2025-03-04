'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Use next/image for optimized image loading
import Link from 'next/link';
import { IoIosLogIn } from 'react-icons/io';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Next.js router
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Redirect to Schedule if user is already logged in (optional)
  useEffect(() => {
    // You can check if the user is already logged in here using localStorage
    const user = localStorage.getItem('userDetails');
    if (user) {
      router.push('/Schedule');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {  // Using Next.js API route for login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('userDetails', JSON.stringify(data.data)); // Store user details in localStorage
        router.push('/menu');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error during login: ' + error.message);
    }
  };

  const showError = () => {
    toast.error(error, {
      position: 'top-center',
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 max-w-full space-y-6 h-5/6 flex items-center justify-around">
         <Image src="/Images/Waste management-pana (1).png" width={600} height={500} alt="Team Illustration" unoptimized priority  />
        <div className='flex flex-col justify-around h-full w-96'>
                <div >
                    <h2 className="text-3xl font-bold text-center  text-gray-800 ">Get Started Now </h2>
                    <h2 className="text-base font-thin text-center text-gray-800">Welcome to TaskFlow-Let's create your account.</h2>
                </div>
                <form  className="flex flex-col justify-around gap-4 ">
                <div className='flex flex-col gap-2'>
                    <label htmlFor="username" className="block text-gray-700">Username :</label>
                    <input 
                    type="text" 
                    placeholder='Enter your username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
                    required 
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="username" className="block text-gray-700">Email :</label>
                    <input 
                    type="email" 
                    placeholder="Enter your email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400" 
                    required 
                    />
                </div>
                
                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="password" className="block text-gray-700">Password :</label>
                                        
                                        <div className="relative w-full">
                                                <input 
                                                type={passwordVisible ? "text" : "password"}
                                                placeholder='Enter your password'
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
                                                      {passwordVisible ? (
                                                        <MdVisibility className='w-5 h-5'/>
                                                      ) : (
                                                        <MdVisibilityOff className='w-5 h-5'/>
                                                      )}
                                                    </button>
                                          </div>
                        
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 bg-zinc-800 text-white font-semibold flex items-center justify-center gap-2
                    rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <i><IoIosLogIn className='h-8 w-6'></IoIosLogIn></i>
                    Sign up
                </button>
                </form>

                <p className="text-center text-sm text-gray-600">Already have an account? <Link href={"/login"} className="text-gray-500 hover:underline hover:text-gray-700">Login</Link></p>
                </div>
      </div>
    </div>
  );
};

export default Login;
