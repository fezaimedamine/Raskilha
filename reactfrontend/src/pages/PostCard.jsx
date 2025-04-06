import { useState, useEffect, useContext  } from "react";
import dayjs from "dayjs";
import {UserContext} from "./UserContext";
 


function PostCard({ post }) {
  const { userDetails } = useContext(UserContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [comments,setComments]= useState([]);
    const [newComment, setNewComment] = useState("");
  
    const getTimeAgo = (date) => {
      const now = dayjs();
      const givenDate = dayjs(date);
      const diffMinutes = now.diff(givenDate, "minute");
      const diffHours = now.diff(givenDate, "hour");
      const diffDays = now.diff(givenDate, "day");
   
    
      if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hours ago`;
      } else if (diffDays < 30) {
        return `${diffDays} days ago`;
      } else {
        return givenDate.format("YYYY-MM-DD"); // Return full date if more than a month
      }
    };
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    useEffect(() => {
      if (isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isExpanded]);
    
    const handleAddComment = async(e) => {
      e.preventDefault();
      if (!newComment.trim()) return;
      try{
            const response = await fetch("http://localhost:8081/commentaires/ajouter", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Make sure we send the content type as JSON
              },
              body: JSON.stringify({
                
                  texte: newComment,
                  pub: {
                     id: post.id 
                    },
                  user:{
                    id: 13 //userDetails.id
                  }
                
              }),
            }); const data = await response.json();
       if(data){
        console.log(data)
        fetchComments(post.id)
          setNewComment("")
        }
          }catch (error) {
            console.log("Error during login: " + error);
          }
    };
    useEffect(() => {

  

      fetchComments(post.id);
    }, []);
    const fetchComments = async (pubId) => {
      try {
        const response = await fetch(`http://localhost:8081/commentaires/pub/${pubId}`); // replace with your real API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
       setComments(data)
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        return [];
      }
    };

    return (
      <>
        <div className="flex flex-col w-80 md:w-full mt-5 mb-5 bg-white border-2 border-gray-300 dark:border-gray-800 dark:rounded-lg rounded-lg cursor-pointer">
          <div className="p-4 flex flex-col gap-2 w-full dark:bg-gray-800 dark:text-white hover:bg-gray-100" onClick={toggleExpand}>
            <div className="flex items-center gap-3">
            {post.user?.image && <img className="w-10 h-10 rounded-full object-contain"  src={`data:${post.user.imageType};base64,${post.user.image}`}
 alt="profile image" />}
              <div>
              {post.user?.nom_profil && <div className="text-base font-medium">{post.user.nom_profil}</div>}
                <div className="text-xs text-gray-500">{getTimeAgo(post.dateHeure)}</div>
              </div>
            </div>
  
            <p className="text-md font-semibold text-gray-800 dark:text-white">{post.titre}</p>
           
            <img 
              src={`data:image/jpeg;base64,${post.image}`}
           
              alt="Post content"
              className="w-full max-h-80 object-contain rounded-lg border-gray-300"
            />
          </div>
           
          <div className="flex h-auto justify-around border-t-2 dark:bg-gray-800 border-t-gray-300">
            <button onClick={toggleExpand} className="w-1/2 py-2 rounded-md text-sm dark:text-white dark:hover:bg-gray-900 hover:bg-gray-200">
              Comment
            </button>
         
            <button className="w-1/2 rounded-md text-sm dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900">
              Share
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div 
            className="fixed inset-0 bg-slate-700 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
            onClick={toggleExpand}
          >
            <div 
              className="bg-white p-5 w-7/12 relative rounded-lg shadow-lg transition-transform transform scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
                onClick={toggleExpand}
              >
                ✖
              </button>
  
              {/* Post Content */}
              <div className="flex flex-col gap-2 justify-center overflow-y-auto max-h-[100vh]">  
                <div className="flex items-center gap-3">
                {post.user?.image &&<img className="w-10 h-10 rounded-full"  src={`data:image/jpeg;base64,${post.user.image}`} alt="" />}
                  <div>
                   {post.user?.nom_profil && <div className="text-md font-medium">{post.user.nom_profil}</div>}
                    <div className="text-xs text-gray-500">{getTimeAgo(post.dateHeure)}</div>
                  </div>
                </div>
  
                <p className="mt-1 text-xl font-semibold text-gray-800">{post.titre}</p>
                <p className="text-gray-700">{post.description}</p>
                <div className="flex justify-center bg-inherit">  
                  <img 
                    
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="Post content"
                    className="w-4/6 bg-inherit max-h-80 object-contain rounded-lg border-gray-300"
                  />
                </div>
                
                {/* Comments Section */}
                <div className="mt-4 border-t h-40 p-2 mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">Comments</h3>
                  <div className="mt-2 space-y-2">
                    {comments ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="flex items-center gap-3">
                  <img className="w-8 h-8 object-contain rounded-full" src={`data:image/jpeg;base64,${comment.imageProfil}`} alt="image" />
                  <div className="bg-gray-100 py-1 px-2 rounded">
                    <div className="text-base font-medium">{comment.profilName}</div>
                    <div className="text-sm text-gray-700  ">{comment.texte}</div>
                  </div>
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
  export default PostCard