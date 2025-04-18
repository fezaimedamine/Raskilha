import { useState, useContext, useEffect } from "react";
import { Bell } from 'lucide-react';
import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { UserContext } from "./UserContext"; // Assuming UserContext is available
import ExpandedPub from "./ExpandedPub"
import axios from "axios";
import toast from "react-hot-toast";

function MenuBar({ setFilteredPosts ,onClearSearch }) {
  const { userDetails } = useContext(UserContext); // Access user details
  const [region, setRegion] = useState(""); // Store user_id
  const [user_id, setUser_id] = useState(""); // Store user_id
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

 

  const toggleNotif = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearch = () => {
    axios.get(`http://localhost:8081/api/pubs/search-by-title?titre=${search}`)
      .then(response => setFilteredPosts(response.data))
      .catch(error => setError("Erreur lors de la récupération des publications :"+ error));
  };
  

  const handleDeleteSearch = () => {
    setSearch("");
    onClearSearch();
  };

  useEffect(() => {
    if (userDetails) {
      setUser_id(userDetails.user.user_id)
      setRegion(userDetails.user.region); // Set user_id from context
    }
  }, [userDetails]);
  const[error,setError]=useState(null)
  const showError = () => {
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
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
    <>
      {isExpanded && <Notifications region={region} user_id={user_id} />}
      <div className="bg-gray-50 dark:bg-gray-800 fixed top-0 right-0 text-gray-800 dark:text-white flex justify-around items-center h-24 w-[calc(100vw-90px)] md:w-[calc(100vw-256px)]">
        <div className="flex w-1/3 items-center gap-2 p-1 rounded-2xl h-10 bg-gray-700 dark:bg-gray-600">
          <input
            type="text"
            className="p-2 w-full outline-none rounded-full h-10 bg-gray-700 dark:bg-gray-600 text-white"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <div className="cursor-pointer text-white font-thin w-8 text-center h-full" onClick={handleDeleteSearch}>
              ✖
            </div>
          )}
          <IoSearchOutline onClick={handleSearch} className="cursor-pointer text-white w-9 h-5" />
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md shadow-md bg-gray-700 dark:bg-gray-600 text-white">
          {darkMode ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
        </button>

        <Bell className="cursor-pointer" onClick={toggleNotif} />
      </div>
    </>
  );
}

const Notifications = ({ region , user_id }) => {
  const [newPosts, setNewPosts] = useState([]);

  const fetchNewPosts = async (region) => {
    try {
      const response = await fetch(`http://localhost:8081/api/pubs/region/${region}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get("Content-Type");
      let responseData;

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json(); // Parse JSON response
        setNewPosts(responseData);

      } else {
        responseData = await response.text(); // Read as text
        throw(responseData)

      }
    } catch (err) {
      setError("Error fetching new posts:"+ err);
    }
  };

  useEffect(() => {
    if ((region)) {
      fetchNewPosts(region); // Fetch posts when user_id changes
    }
  }, [region]);

  const[thatPost,setthatPost]=useState(null);
  const [show, setshow] = useState(false);
  const openPublication = (post) => {
    setshow(!show);
    setthatPost(post)
  };
  const[error,setError]=useState(null)
  const showError = () => {
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
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

  return (<>
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="fixed right-2 top-24 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50 max-h-96 overflow-auto"
    >
      <h2 className="text-lg text-gray-700 dark:text-white font-semibold mb-2">Notifications</h2>
     
        {newPosts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No posts in your Region yet.</p>
        ) : (<>
          <ul className="space-y-3">
          <h3 className=" text-gray-700 dark:text-white font-semibold mb-2">You have new posts in your Region</h3>
            {newPosts.map(post => (user_id!=post.user_id &&
              
              <li
              
              key={post.id}
              onClick={() => openPublication(post)}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all cursor-pointer"
            >     
                     
                     <div className="flex items-center gap-2 mb-2">
             <img
    src={`data:image/jpeg;base64,${post.imageProfil}`} alt="profil_image"               
    className="w-10 h-10 rounded-full object-cover"
  /> <p className="text-gray-800 dark:text-white font-normal mb-1  ">
             <b>{post.userNomProfil}</b> created a new post in your region
           </p>
           </div>
           {post.titre && (
  <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold mb-1">
     {post.titre}
  </p>
)}

         
         {post.dateHeure && (
  <p className="text-xs text-gray-400 dark:text-gray-300">
    {new Date(post.dateHeure).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })}
  </p>
)}
              </li>
            
          
          ))}
          </ul>
           </> 
       
        )}
      
    </motion.div>
    {show && <ExpandedPub post={thatPost} toggleExpand={openPublication}/>}
  </>);
};




export default MenuBar;
