import React,{useContext,useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";
import recycleIllustration from "../Images/upscalemedia-transformed.png";
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import Header from "./header";
const Home = () => {
  const navigate = useNavigate(); 
  const { userDetails } = useContext(UserContext);
  useEffect(() => {
      if (userDetails) {
        navigate("/publication");
      }
    }, [userDetails]);
  return (
    <div className="bg-white text-black h-screen px-4 flex flex-col justify-between">
      
      <Header></Header>

      
      <div className="flex flex-row justify-between items-center h-1/2 w-full px-6 md:px-20 py-16">
        <div className="w-1/3">
          <h1 className="text-6xl font-bold">
            Waste <span className="text-green-300">Less</span>,
            <br /> Recycle <span className="text-green-300">More</span>!
          </h1>
          <p className="mt-4 text-gray-600">
            Our planet faces growing waste and pollution. <br />
            Every small effort to <span className="text-green-300">recycle</span> leads to a{" "}
            <span className="text-green-300">cleaner, greener</span> future.
          </p>
          <div className="flex space-x-4 mt-14 ml-8">
            <Link to="/aboutus" className="bg-green-300 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-400">
              Learn More ↗
            </Link>
            <Link to="/signup" className="border border-green-300 text-green-300 px-6 py-2 rounded-full hover:bg-green-100">
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-2/3 flex justify-center mt-10 md:mt-0">
          <img
            src={recycleIllustration} 
            width={800}
            height={600}
            alt="Recycling Illustration"
          />
        </div>
      </div>

      
      <div className="flex justify-around items-center px-6 md:px-20 py-10">
        <div className="flex items-center space-x-2 text-green-300">
          <span>
            <MdLocationOn />
          </span>
          <span>Report a location</span>
        </div>
        <span className="flex items-center text-gray-700">
          <span>------------------------------------------------------------------------</span>
          <BiSolidRightArrow />
        </span>
        <div className="flex items-center space-x-2 text-green-300">
          <span>🚛</span>
          <span>Collection</span>
        </div>
        <span className="flex items-center text-gray-700">
          <span>------------------------------------------------------------------------</span>
          <BiSolidRightArrow />
        </span>
        <div className="flex items-center space-x-2 text-green-300">
          <span>♻️</span>
          <span>Recycling</span>
        </div>
      </div>
    </div>  
  );
}
export default Home;