import { useState, useContext } from "react";
import { Bell } from 'lucide-react';
import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";

function MenuBar({ setFilteredPosts ,onClearSearch }) {
  
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleNotif = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearch = () => {
    axios.get(`http://localhost:8081/api/pubs/search-by-title?titre=${search}`)
      .then(response => setFilteredPosts(response.data))
      .catch(error => console.error("Erreur lors de la récupération des publications :", error));
  };

  const handleDeleteSearch = () => {
    setSearch("");
    onClearSearch();
  };

  const handleFilterChange = (e) => {
    const region = e.target.value;
    axios.get(`http://localhost:8081/api/pubs${region}`)
      .then(response => setFilteredPosts(response.data))
      .catch(error => console.error("Erreur lors du filtrage :", error));
  };

  return (
    <> 
      {/* Notifications */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed right-2 top-24 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50"
        >
          <h3 className="text-gray-700 dark:text-white font-semibold mb-2">Notifications</h3>
          <ul>
            <li className="p-2 border-b last:border-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Nouveau commentaire sur votre publication
            </li>
            <li className="p-2 border-b last:border-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Vous avez un nouvel abonné
            </li>
          </ul>
        </motion.div>
      )}

      {/* Barre de Menu */}
      <div className="bg-gray-50  dark:bg-gray-800 fixed top-0 right-0 text-gray-800 dark:text-white flex justify-around items-center h-24 w-[calc(100vw-90px)] md:w-[calc(100vw-256px)]"
      >
        {/* Champ de recherche */}
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

        {/* Filtre par région 
        <select
          onChange={handleFilterChange}
          className="bg-gray-700 dark:bg-gray-600 text-white p-2 rounded-md shadow-md hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          <option value="">Choisir une région</option>
          <option value="/region/Tunis">Tunis</option>
          <option value="/region/Paris">Paris</option>
          <option value="/region/ville">Ville</option>
        </select>
            */}
        {/* Mode sombre */}
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md shadow-md bg-gray-700 dark:bg-gray-600 text-white">
          {darkMode ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
        </button>

        {/* Notifications */}
        <Bell className="cursor-pointer" onClick={toggleNotif} />
      </div>
    </>
  );
}

export default MenuBar;
