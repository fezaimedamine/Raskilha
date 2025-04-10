import { useState, useEffect, useContext  } from "react";
import dayjs from "dayjs";
import {UserContext} from "./UserContext";
import toast from "react-hot-toast";



function ExpandedPub ({post ,toggleExpand}){
    const [comments,setComments]= useState([]);
    const [newComment, setNewComment] = useState("");
    const { userDetails } = useContext(UserContext);
    
    
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
                          id:userDetails.user.user_id
                        }
                      
                    }),
                  });
                  const contentType = response.headers.get("Content-Type");
                  let responseData;
            
                  if (contentType && contentType.includes("application/json")) {
                    responseData = await response.json(); // Parse JSON response
                    fetchComments(post.id)
                    setNewComment("")
            
                  } else {
                    responseData = await response.text(); // Read as text
                    throw(responseData)
            
                  }
             
                }catch (error) {
                  setError("Error during login: " + error);
                }
          };
          useEffect(() => {
  
            fetchComments(post.id);
          }, []);

          const fetchComments = async (pubId) => {
            try {
              const response = await fetch(`http://localhost:8081/commentaires/pub/${pubId}`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
             setComments(data)
            } catch (error) {
              setError("Failed to fetch comments:"+ error);
              return [];
            }
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

          return(
          
            
                <div 
                  className="fixed inset-0 bg-slate-700 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
                  onClick={toggleExpand}
                >
                  <div 
                    className="bg-white p-5 w-7/12 relative rounded-lg shadow-lg transition-transform transform scale-100 dark:bg-gray-800 dark:text-white"
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
                      <img className="w-10 h-10 rounded-full"  src={`data:image/jpeg;base64,${post.imageProfil}`} alt="profil_image" />
                        <div>
                          <div className="text-md font-medium">{post.userNomProfil}</div>
                          <div className="text-xs text-gray-500 dark:bg-gray-800 dark:text-white">{getTimeAgo(post.dateHeure)}</div>
                        </div>
                      </div>
        
                      <p className="mt-1 text-xl font-semibold text-gray-800 dark:bg-gray-800 dark:text-white">{post.titre}</p>
                      <p className="text-gray-700">{post.description}</p>
                      <div className="flex justify-center bg-inherit">  
                        <img 
                          
                          src={`data:image/jpeg;base64,${post.image}`}
                          alt="Post content"
                          className="w-4/6 bg-inherit max-h-80 object-contain rounded-lg border-gray-300 "
                        />
                      </div>
                      
                      {/* Comments Section */}
                      <div className="mt-4 border-t h-40 p-2 mb-2">
                        <h3 className="text-sm font-semibold text-gray-800 dark:bg-gray-800 dark:text-white">Comments</h3>
                        <div className="mt-2 space-y-2">
                          {comments ? (
                            comments.map((comment) => (
                              <div key={comment.id} className="flex items-center gap-3">
                        <img className="w-8 h-8 object-contain rounded-full" src={`data:image/jpeg;base64,${comment.imageProfil}`} alt="image_profil" />
                        <div className="bg-gray-100 py-1 px-2 dark:bg-gray-800 dark:text-white rounded">
                          <div className="text-base font-medium">{comment.profilName}</div>
                          <div className="text-sm text-gray-700  dark:bg-gray-800 dark:text-white">{comment.texte}</div>
                        </div>
                      </div>
                              
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 dark:bg-gray-800 dark:text-white">No comments yet.</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Add New Comment */}
                    <div className="mt-3 w-full flex gap-2">
                      <input
                        type="text"
                        className="border p-2 flex-1 rounded-md text-sm dark:bg-gray-700 dark:text-white"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-400 "
                        onClick={handleAddComment}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
           
                        )
      
          
}
export default ExpandedPub