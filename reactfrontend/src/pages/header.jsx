import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../Images/logo.png"; 
import { IoIosLogIn } from "react-icons/io";

const Header = () => {
  return (
    <header className="  top-0 z-50">
      <div className="flex justify-around items-center p-6 gap-14">
              <div className="text-2xl font-bold flex items-center ml-4">
                <img src={logo} width={200} height={200} alt="logo" /> 
              </div>
              <ul className="flex items-center gap-10">
                <li className="font-semibold text-gray-700 hover:text-green-300"><Link to="/">Home</Link></li>
                <li className="font-semibold text-gray-700 hover:text-green-300"><Link to="/aboutus">About Us</Link></li>
                <li className="font-semibold text-gray-700 hover:text-green-300"><Link to="/contactus">Contact</Link></li>
                
              </ul>
              <Link to="/login" className="bg-green-300 px-5 flex items-center gap-2 font-semibold text-white py-2 rounded-2xl shadow-md hover:bg-green-400">
              <IoIosLogIn className='text-xl'/> 
              Login
              </Link>
            </div>
    </header>
  );
};

export default Header;