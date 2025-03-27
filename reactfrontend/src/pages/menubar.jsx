import { useState,useEffect } from "react";
import { Bell } from 'lucide-react';
import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

function MenuBar() {
  

  const handleFilterChange = (e) => {
     //must complete
  };

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
      console.log("Searching for:" + search);
      setSearch("")
      // Implement filtering logic if you have a list of posts
    };

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      image: null,
      location: "",
    }); 

    const validateForm = () => {
      let newErrors = {};
    
      // Title validation
      if (!formData.title.trim()) newErrors.title = "Title is required.";
      else if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters.";
    
      // Description validation
      if (!formData.description.trim()) newErrors.description = "Description is required.";
      else if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters.";
    
      // Image validation (must be a valid image type)
      if (!formData.image) {
        newErrors.image = "Image is required.";
      } else if (!formData.image.type.startsWith("image/")) {
        newErrors.image = "File must be an image.";
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      let newErrors = {image:errors.image};
    
      // Title validation
      if (!formData.title.trim()) newErrors.title = "Title is required.";
      else if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters.";
    
      // Description validation
      if (!formData.description.trim()) newErrors.description = "Description is required.";
      else if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters.";
      setErrors(newErrors);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setErrors({...errors,image:null})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {    
      /*console.log("Form Submitted:", formData);
      alert("Post added successfully!");*/
      closeForm()
      setFormData({
        title: "",
        description: "",
        image: null,
        location: "",
      })
    }
  };

  const closeForm = () =>{
    setIsOpen(!isOpen)
    setIsExpanded(false)
    setErrors({})
  }

useEffect(() => {
    if ( isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling on home page
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [isOpen]);

  return (
    <> 
      {/* Form (Hidden by Default, Slides in when Open) */}
        
{isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 top-24 w-80 bg-white shadow-lg rounded-lg p-3 z-50"
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
       <div className="flex w-1/3 justify-between items-center gap-2 p-1 rounded-lg bg-white" >
        <input
          type="text"
          className="p-2 w-full focus:ring-green-300 focus:ring-2 outline-none rounded-md"
          placeholder="Search... "
          value={search}
          //value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        /> <IoSearchOutline onClick={handleSearch} className="cursor-pointer w-9 h-5"/>
      </div>
      

        <select
          onChange={handleFilterChange}
          className="bg-gray-700 text-white p-2 rounded-md"
        >
          <option value="">choose a region </option>
          <option value="Tunis"> Tunis </option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
    
        <Bell className="cursor-pointer" onClick={toggleNotif}></Bell>
     
    </div>
    </>
  );
}

export default MenuBar;
