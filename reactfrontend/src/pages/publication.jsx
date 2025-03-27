import { useState,useEffect } from "react";
import Sidebar from "./sidebar";
import MenuBar from "./menubar";
import logo from "../Images/logo.png"
import img from "../Images/icons8-waste-sorting-96.png"
const postsData = [
  {
    id: 1,
    title: "Plastic Waste in Park",
    description: "Several plastic bottles and bags scattered around the park.",
    location: "Downtown Park",
    date: "2025-03-23",
    image:  img,
    profile_name: "MOEDEM123",
    profile_image:img
  },
  {
    profile_name: "MOEDEM123",
    profile_image: logo,
    id: 2,
    description: "Trash bin at Main Street is full and spilling onto the road. hqsjksqhdskqjdsq qslsqdk qdsldsqkdq sqdkmqsdqsdkqsk q mqskdskqd qlskd qksldq",
 
    date: "2025-03-22",
    image: logo,
    
  },
];

function PostCard({ post }) {
  console.log(post.location)
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"; // Disable scrolling on home page
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [isExpanded]);
  
  const [comments, setComments] = useState([]); // Store comments for the post
  const [newComment, setNewComment] = useState(""); // Input value for a new comment

  const handleAddComment = () => {
    if (newComment.trim() === "") return; // Prevent empty comments

    setComments([...comments, newComment]); // Add new comment to the list
    setNewComment(""); // Clear input field after adding
  };
    return (
      <>
      <div className="flex flex-col  w-80 lg:w-1/2 border-2 border-gray-300 rounded-lg   cursor-pointer" >
      <div className=" p-4 flex flex-col gap-2 w-full hover:bg-gray-200" onClick={toggleExpand} >
        <div className="flex items-center  gap-3" >
          <img className="w-10 h-10 rounded-full" src={post.profile_image} alt="" />
          <div>
          <div className="text-base font-medium">{post.profile_name}</div>
          <div className="text-xs text-gray-500">{post.date}</div>
          </div>
        </div>

        <p className="text-md font-semibold text-gray-800">{post.title}</p>
        <img 
          src={post.image}
          //alt="message"
          className="w-full max-h-80 object-contain rounded-lg border-gray-300"
        />
         </div>
         
         <div className="flex h-auto justify-around bg-gray-300 ">
        <button onClick={toggleExpand} className=" w-1/3  py-2 rounded-md  text-sm hover:bg-gray-400">
          Comment
        </button>
        {post.location && (<button className=" w-1/3  rounded-md    text-sm hover:bg-gray-400">
          See Location
        </button>)}
        <button className=" w-1/3  rounded-md   text-sm hover:bg-gray-400">
          Share
        </button>
      </div>
      </div>
      
      {isExpanded && (
        <div className="fixed inset-0  bg-gray-400 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
        onClick={toggleExpand}>
         
          <div className="bg-white p-5  w-7/12  relative rounded-lg shadow-lg transition-transform transform scale-100 "
          onClick={(e) => e.stopPropagation()}>
          <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
              onClick={toggleExpand}
            >
              ✖
            </button>

            {/* Post Content */}
            
         <div className="flex flex-col gap-2 justify-center overflow-y-auto max-h-[100vh]">  
        <div className="flex items-center gap-3   " >
          <img className="w-10 h-10 rounded-full" src={post.profile_image} alt="" />
          <div>
          <div className="text-md font-medium">{post.profile_name}</div>
          <div className="text-xs text-gray-500">{post.date}</div>
          </div>
        </div>

        <p className=" mt-1 text-xl font-semibold text-gray-800">{post.title}</p>
        <p>{post.description}</p>
        <div className="flex justify-center bg-inherit">  
        <img 
          src={post.image}
          //alt="message"
          className="w-4/6  bg-inherit  max-h-80 object-contain rounded-lg   border-gray-300"
        
        />
        </div>
        
            {/* Scrollable Comment Section */}
           {/* <div className="flex items-center  gap-3" >
          <img className="w-7 h-7 rounded-full" src={post.profile_image} alt="" />
          <div>
          <div className="text-base font-medium">{post.profile_name}</div>
          <div className="text-xs text-gray-500">{post.date}</div>
          </div>
        </div>*/}

            <div className="mt-4 border-t h-40 p-2 mb-2">
              <h3 className="text-sm font-semibold text-gray-800">Comments</h3>
              <div className="mt-2 space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
                      {comment}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                )}
              </div>
            </div>
            </div>
            
            {/* Add New Comment */}
            <div className="mt-3 w-full flex gap-2">
              <input
                type="text"
                className="border p-2 flex-1 rounded-md text-sm"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-400"
                onClick={handleAddComment}
              >
                Post
              </button>
            </div>
          </div>
        
        </div>
      )}

     
     </>
    );
  
}

export default function Publication() {
  const [filteredPosts, setFilteredPosts] = useState(postsData);

  return (<>
    
   <div className="flex">
     
     <Sidebar/>
     

   <div className="flex w-screen items-center flex-col gap-9  mb-5">
   <MenuBar/>
   
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
   
   
      
      </div>
      </div>
      </>
  );
}