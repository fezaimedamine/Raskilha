import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; 
import Signup from "./pages/signup"; 
import ProfileSettings from "./pages/profile";
import Home from "./pages/home";
import Map  from "./pages/map";
import Aboutus  from "./pages/aboutus";

import Publication from "./pages/publication";
import  { Toaster } from 'react-hot-toast';
import { UserProvider } from './pages/UserContext'; 

function App() {
  return (
    <UserProvider> 
    <Router>
     
      <Toaster />
      <Routes>
  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/map" element={<Map />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </UserProvider> 
  );
}

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
    </div>
  );
}

export default App;