import { useState } from "react";
import { Bell } from 'lucide-react';
function MenuBar() {
  /*const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass search query to parent component
  };

  const handleFilterChange = (e) => {
    onFilter(e.target.value); // Pass selected filter to parent component
  };*/

  return (
    <div className="w-full bg-gray-50 text-gray-800 flex justify-around items-center h-12 ">
       <div className="flex items-center gap-2">
        <input
          type="text"
          className="p-2 rounded-md"
          placeholder="Search..."
          //value={searchQuery}
          //onChange={handleSearchChange}
        />
      </div>
        
        <select
          //onChange={handleFilterChange}
          className="bg-gray-700 text-white p-2 rounded-md"
        >
          <option value="">Filter by Date</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
    
        <Bell className=""></Bell>
     
    </div>
  );
}

export default MenuBar;
