import { useState,useEffect } from "react";
import { Bell } from 'lucide-react';
import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

import axios from "axios";

function MenuBar({setFilteredPosts}) {
  
  const handledeleteSearch = () => {
    console.log("delete")
   setSearch("")
    axios.get("http://localhost:8081/api/pubs")
      .then(response => {
        setFilteredPosts(response.data);
        console.log(response.data) // Axios automatically parses JSON
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  
  
}
  const handleFilterChange = (e) => {
      const Ville=e.target.value
     
      axios.get(`http://localhost:8081/api/pubs${Ville}`)
        .then(response => {
          setFilteredPosts(response.data);
          console.log(response.data) // Axios automatically parses JSON
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    
    
  }
  const notifications = [
    { id: 1, text: "New comment on your post" },
    { id: 2, text: "You have a new follower" },
    { id: 3, text: "Reminder: Your event starts soon" },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleNotif = () => {
    setIsExpanded(!isExpanded);
  };
  
    
    const[search,setSearch]=useState("")

    const handleSearch = () => {
      axios.get(`http://localhost:8081/api/pubs/search-by-title?titre=${search}`)
      .then(response => {
        setFilteredPosts(response.data);
        console.log(response.data) // Axios automatically parses JSON
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }
    
  return (
    <> 
      {/* Form (Hidden by Default, Slides in when Open) */}
        
{isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed right-2 top-24 w-80 bg-white shadow-lg rounded-lg p-3 z-50"
        >
          <h3 className="text-gray-700 font-semibold mb-2">Notifications</h3>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="p-2 text-gray-600 border-b last:border-0 hover:bg-gray-100 cursor-pointer"
                >
                  {notif.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No new notifications</p>
          )}
        </motion.div>
      )}


    {/*MenuBar*/}
    <div className=" bg-gray-50 fixed top-0 right-0  text-gray-800 flex justify-around items-center h-24 w-[calc(100vw-90px)] md:w-[calc(100vw-268px)]"
    >
       <div className="flex w-1/3 justify-between items-center gap-2 p-1 rounded-lg  bg-white  " >
        <input
          type="text"
          className="p-2 w-full  outline-none rounded-md"
          placeholder="Search... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          //focus:ring-green-300 focus:ring-2
        /> <div className={`${search? "cursor-pointer font-thin w-8 text-center h-full" : "hidden"}` }onClick={handledeleteSearch}>✖</div>  <IoSearchOutline onClick={handleSearch} className="cursor-pointer w-9 h-5"/>
      </div>
    
        <select
          onChange={handleFilterChange}
          className="bg-gray-700 text-white p-2 rounded-md"
        >
          <option value="">Choose a region </option>
          <option value="/region/Tunis">Tunis </option>
          <option value="/region/Paris">Paris</option>
          <option value="/region/ville">Ville</option>
        </select>
    
        <Bell className="cursor-pointer" onClick={toggleNotif}></Bell>
     
    </div>
    </>
  );
}

export default MenuBar;
