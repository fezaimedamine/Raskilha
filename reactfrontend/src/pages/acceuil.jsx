import React, { useState, useEffect, useRef } from "react";
import { FiHome, FiPlusCircle, FiHeart, FiMessageSquare, FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";

const SocialHomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [comments, setComments] = useState({});
  const [activeCommentInput, setActiveCommentInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const postsEndRef = useRef(null);

  useEffect(() => {
    loadInitialPosts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadMorePosts();
    }
  }, [page]);

  const loadInitialPosts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPosts(generateMockPosts(0, 10));
      setIsLoading(false);
    }, 1000);
  };

  const loadMorePosts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPosts((prev) => [...prev, ...generateMockPosts(prev.length, 5)]);
      setIsLoading(false);
    }, 800);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      !isLoading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const generateMockPosts = (start, count) => {
    return Array(count)
      .fill()
      .map((_, i) => ({
        id: start + i + 1,
        user: `User_${start + i + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${start + i + 10}`,
        content: `This is post content #${start + i + 1}. Lorem ipsum dolor sit amet.`,
        likes: Math.floor(Math.random() * 500),
        timestamp: `${Math.floor(Math.random() * 12) + 1}h ago`,
        liked: false,
      }));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-16 pt-8">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-blue-600">SocialFeed</h1>
        <div className="flex space-x-4">
          <RiSearchLine className="text-xl text-gray-600 cursor-pointer" />
          <IoMdNotificationsOutline className="text-xl text-gray-600 cursor-pointer" />
        </div>
      </header>

      {/* Post Creator */}
      <div className="bg-white p-4 shadow rounded-md my-4">
        <form className="flex items-center space-x-3">
          <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-10 h-10 rounded-full" />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 p-2 border rounded-full focus:outline-none"
          />
          <button type="submit" className="text-blue-500 text-2xl">
            <FiPlusCircle />
          </button>
        </form>
      </div>

      {/* Posts */}
      <div className="space-y-4 p-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex items-center space-x-3">
              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold">{post.user}</h3>
                <span className="text-gray-500 text-sm">{post.timestamp}</span>
              </div>
            </div>
            <p className="mt-3 text-gray-800">{post.content}</p>
            <div className="flex space-x-4 mt-3 text-gray-600">
              <button className="flex items-center space-x-1">
                <FiHeart className="text-red-500" /> <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1">
                <FiMessageSquare /> <span>Comment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white flex justify-around p-3 shadow-md">
        <button className="flex flex-col items-center text-blue-500">
          <FiHome className="text-xl" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <RiSearchLine className="text-xl" />
          <span className="text-xs">Explore</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <IoMdNotificationsOutline className="text-xl" />
          <span className="text-xs">Notifications</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FiUser className="text-xl" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default SocialHomePage;
