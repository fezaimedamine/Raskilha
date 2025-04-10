import { useState, useEffect  } from "react";
import dayjs from "dayjs";
import ExpandedPub from "./ExpandedPub"
 


function PostCard({ post }) {
  
    const [isExpanded, setIsExpanded] = useState(false);

  
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
    
    

    return (
      <>
        <div className="flex flex-col w-80 md:w-full mt-5 mb-5 bg-white border-2 border-gray-300 dark:border-gray-800 dark:rounded-lg rounded-lg cursor-pointer">
          <div className="p-4 flex flex-col gap-2 w-full dark:bg-gray-800 dark:text-white hover:bg-gray-100" onClick={toggleExpand}>
            <div className="flex items-center gap-3">
            <img className="w-10 h-10 rounded-full object-contain"  src={`data:image/jpeg;base64,${post.imageProfil}`}
 alt="profile image" />
              <div>
               <div className="text-base font-medium">{post.userNomProfil}</div>
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
        
        {isExpanded && <ExpandedPub post={post}  toggleExpand={toggleExpand}/>}
  </>
)
}
  export default PostCard