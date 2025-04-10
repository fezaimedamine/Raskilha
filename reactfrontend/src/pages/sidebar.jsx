import React,{useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaRecycle, FaUserCircle, FaHome } from "react-icons/fa";
import logo from "../Images/logo.png";
import logodark from "../Images/logodark.png";
import { TbLogout2 } from "react-icons/tb";
import { UserContext } from "./UserContext";

import { ThemeContext } from "../context/ThemeContext";

const Sidebar = () => {
  const { setUserDetails } = useContext(UserContext);
  const { setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    
    setUserDetails(null);
    localStorage.removeItem('userDetails'); 
    setDarkMode(false); // Disable dark mode
    localStorage.setItem("darkMode", "false");
    navigate('/'); 
  };
  
  return (
    <div className="dark:bg-gray-800 dark:text-white h-screen fixed bottom-0 bg-gray-50 text-gray-800 flex flex-col items-center p-4 shadow-lg w-20 md:w-64 transition-all duration-300">
      {/* Logo (Masqué sur mobile) */}
      <div className="hidden md:flex items-center mb-10 mt-1">
        <img src={logo} width={160} alt="logo"  className="dark:hidden"/>
        <img src={logodark} width={160} alt="logo" className="dark:block hidden" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4  items-center dark:bg-gray-800 dark:text-white">
        <SidebarLink to="/publication" icon={<FaHome />} label="Accueil" />
        <SidebarLink to="/map" icon={<FaMapMarkedAlt />} label="Map" />
        <SidebarLink to="/profile" icon={<FaUserCircle />} label="Profil" />
      
      <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 w-18 md:w-36 absolute  bottom-8
       hover:bg-green-400 hover:scale-105  justify-center md:justify-start cursor-pointer" 
              onClick={handleLogout}>
                <span><TbLogout2 className=' text-2xl'/></span> 
                <span className="hidden md:inline text-lg">Logout</span>
        </div>
      </nav>
    </div>
  );
};

// Composant réutilisable pour chaque lien
const SidebarLink = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300
       hover:bg-green-400 hover:scale-105 w-full justify-center md:justify-start"
    >
      <span className="text-2xl">{icon}</span>
      <span className="hidden md:inline text-lg ">{label}</span>
    </Link>
  );
};

export default Sidebar;
