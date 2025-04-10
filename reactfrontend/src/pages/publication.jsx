import { useState, useEffect ,useContext } from "react";
import Sidebar from "./sidebar";
import MenuBar from "./menubar";



import Rpoint from "../Images/P4.png"

import toast from "react-hot-toast";


import axios from "axios";
import PostCard from "./PostCard";
import { UserContext } from "./UserContext";

import Add_Post from "./Add_Post";

 
export default function Publication() {
  const { userDetails, setUserDetails } = useContext(UserContext);
 

  const [filteredPosts, setFilteredPosts] = useState([]);
 


  const [isOpen, setIsOpen] = useState(false);
  const closeForm = () =>{
    setIsOpen(!isOpen)
  }


 
    
    

    const [page, setPage] = useState(0); // Start at the first page
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const POSTS_PER_PAGE = 10;
    const fetchPosts = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      
      try {
        const response = await axios.get('http://localhost:8081/api/pubs', {
          params: {
            page: page,
            size: POSTS_PER_PAGE,
       
          },
        });
  
        const posts = response.data.content;
  
        if (posts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
        
        if (page === 0) {
          setFilteredPosts(posts); // Replace on first load
        } else {
          setFilteredPosts((prevPosts) => {
            const newPosts = posts.filter(
              post => !prevPosts.some(p => p.id === post.id)
            );
            console.log(newPosts)
            return [...prevPosts, ...newPosts];
          });
        }
  
      } catch (error) {
        setError('Error fetching posts:'+error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchPosts();
    }, [page]);
    
   
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
    
      const bottom = scrollTop + clientHeight >= scrollHeight - 50;
    
      if (bottom && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
        console.log(page)
      }
    };

    const handleClearSearch = async () => {
      setFilteredPosts([]); 
      setPage(0); // Reset pagination to first page
      setHasMore(true)
      fetchPosts()
    }
        
      
      
    
    useEffect(() => {
      // Listen for the scroll event
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup the event listener when the component is unmounted
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [loading, hasMore]);
    const[user_image,setuser_image]=useState(null)
    useEffect(() => {
          
          if(userDetails){
            setuser_image(userDetails.user.imageProfil)
          }
      },[userDetails])  ; 
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
    <Sidebar/>
    <MenuBar setFilteredPosts={setFilteredPosts} onClearSearch={handleClearSearch}/>
    
    
    {isOpen && <Add_Post closeForm={closeForm} userDetails={userDetails} setUserDetails={setUserDetails} fetchPosts={fetchPosts}/>}
        
        <div className="flex ml-30    mt-28 mb-5 w-[calc(100vw-94px)] md:w-[calc(100vw-272px)] md:ml-64">
          
          <div className="  w-96 md:w-1/2 ml-40 mt-4 flex flex-col  items-center">
            {/* Create Post Component */}
            <div className="bg-white rounded-lg shadow p-4 mb-4 w-full">
              {/* Create Post Header */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img 
                    src={`data:image/jpeg;base64,${user_image}`}
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-4 text-gray-500 transition"
                  onClick={() => setIsOpen(true)}
                >
                  What's on your mind?
                </button>
              </div>

              {/* Divider */}
              <hr className="my-2" />

              {/* Post Options */}
              <div className="flex justify-between">
                <button 
                  className="flex items-center justify-center flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => {
                    setIsOpen(true);
                    
                  }}
                >
                  <div className="w-6 h-6 text-green-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Photo
                </button>

                

                <button 
                  className="flex items-center justify-center flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => {
                    setIsOpen(true);
                    
                  }}
                >
                  <div className="w-6 h-6 text-blue-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Location
                </button>
              </div>

              {/* Expanded Post Form */}
             
            </div>

            {/* Posts List */}
            {loading && (
              <div className="text-center my-4 text-gray-500">
                Loading more posts...
              </div>
            )}
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}

          </div>
          {/*eco-score*/}
           <div className=" h-28 hidden fixed top-32 right-10 w-28 md:w-1/5 border-2 p-4
            border-gray-100 md:flex flex-col items-center justify-around  rounded-md shadow-sm bg-white">  
              <div className=" flex justify-around   items-center gap-2">
                <span className="text-lg font-semibold">Your eco-score :</span>
              <div className="flex items-center gap-3" >
                <img src={Rpoint} alt="pointlogo" className="h-12 w-12"/>
                <span className="text-lg text-green-400">{userDetails?.user?.points}</span>
                </div>
                
              </div>
              <span className="text-lg text-green-400">🍃You're making a difference🌍</span>
          </div> 
        </div>
  

  


  
 
  </>
  );
}