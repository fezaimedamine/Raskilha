import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; 
import Signup from "./pages/signup"; 
import ProfileSettings from "./pages/profile";
import Home from "./pages/home";
import Map  from "./pages/map";
import Aboutus  from "./pages/aboutus";
import Contactus  from "./pages/contactus";

import Publication from "./pages/publication";
import  { Toaster } from 'react-hot-toast';
import { UserProvider } from './pages/UserContext'; 
import ProtectedRoute from './pages/ProtectedRoute';
function App() {
  return (
    <UserProvider> 
    <Router>
     
      <Toaster />
      <Routes>
  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
          <Route path="/publication" element={<ProtectedRoute><Publication /></ProtectedRoute>} />

        
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
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