import React, { useState, useEffect, useRef } from 'react';
import { FiHome, FiPlusCircle, FiHeart, FiMessageSquare, FiUser } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiSearchLine } from 'react-icons/ri';

const SocialHomePage = () => {
  // États
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [comments, setComments] = useState({});
  const [activeCommentInput, setActiveCommentInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const postsEndRef = useRef(null);

  // Effets
  useEffect(() => {
    loadInitialPosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadMorePosts();
    }
  }, [page]);

  // Fonctions
  const loadInitialPosts = () => {
    setIsLoading(true);
    // Simulation d'API
    setTimeout(() => {
      setPosts(generateMockPosts(0, 10));
      setIsLoading(false);
    }, 1000);
  };

  const loadMorePosts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPosts(prev => [...prev, ...generateMockPosts(prev.length, 5)]);
      setIsLoading(false);
    }, 800);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 500 &&
      !isLoading
    ) {
      setPage(prev => prev + 1);
    }
  };

  const generateMockPosts = (start, count) => {
    return Array(count).fill().map((_, i) => ({
      id: start + i + 1,
      user: `User_${start + i + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${start + i + 10}`,
      content: `This is post content #${start + i + 1}. ${'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(Math.floor(Math.random() * 3) + 1)}`,
      likes: Math.floor(Math.random() * 500),
      timestamp: `${Math.floor(Math.random() * 12) + 1}h ago`,
      liked: false
    }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      user: "Current_User",
      avatar: "https://i.pravatar.cc/150?img=5",
      content: newPostContent,
      likes: 0,
      timestamp: "Just now",
      liked: false
    };
    
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          } 
        : post
    ));
  };

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    if (!comments[postId]?.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      user: "Current_User",
      avatar: "https://i.pravatar.cc/150?img=5",
      text: comments[postId],
      timestamp: "Just now"
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: ''
    }));
    
    // En réalité, vous enverriez ceci à votre backend
    console.log(`Comment submitted for post ${postId}:`, newCommentObj);
  };

  return (
    <div className="social-app">
      {/* Header */}
      <header className="app-header">
        <h1>SocialFeed</h1>
        <div className="header-icons">
          <RiSearchLine className="icon" />
          <IoMdNotificationsOutline className="icon" />
        </div>
      </header>
      
      {/* Post Creation */}
      <div className="post-creator">
        <form onSubmit={handlePostSubmit}>
          <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="creator-avatar" />
          <input
            type="text"
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button type="submit" disabled={!newPostContent.trim()}>
            <FiPlusCircle />
          </button>
        </form>
      </div>
      
      {/* Posts Feed */}
      <div className="posts-feed">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img src={post.avatar} alt={post.user} className="post-avatar" />
              <div className="post-user-info">
                <h3>{post.user}</h3>
                <span className="post-time">{post.timestamp}</span>
              </div>
            </div>
            
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            
            <div className="post-actions">
              <button 
                className={`like-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <FiHeart /> {post.likes}
              </button>
              <button 
                className="comment-btn"
                onClick={() => setActiveCommentInput(activeCommentInput === post.id ? null : post.id)}
              >
                <FiMessageSquare /> Comment
              </button>
            </div>
            
            {activeCommentInput === post.id && (
              <form 
                className="comment-form"
                onSubmit={(e) => handleCommentSubmit(post.id, e)}
              >
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={comments[post.id] || ''}
                  onChange={(e) => setComments(prev => ({
                    ...prev,
                    [post.id]: e.target.value
                  }))}
                />
                <button type="submit" disabled={!comments[post.id]?.trim()}>
                  Post
                </button>
              </form>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading more posts...</p>
          </div>
        )}
        
        <div ref={postsEndRef} />
      </div>
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-btn active">
          <FiHome />
          <span>Home</span>
        </button>
        <button className="nav-btn">
          <RiSearchLine />
          <span>Explore</span>
        </button>
        <button className="nav-btn">
          <IoMdNotificationsOutline />
          <span>Notifications</span>
        </button>
        <button className="nav-btn">
          <FiUser />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};

// Styles (à placer dans un fichier CSS séparé ou avec styled-components)
const styles = `
.social-app {
  max-width: 600px;
  margin: 0 auto;
  background: #f8f9fa;
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #1877f2;
}

.header-icons {
  display: flex;
  gap: 20px;
}

.icon {
  font-size: 1.3rem;
  color: #65676b;
  cursor: pointer;
}

.post-creator {
  background: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.post-creator form {
  display: flex;
  align-items: center;
  gap: 10px;
}

.creator-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.post-creator input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.post-creator button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #1877f2;
  cursor: pointer;
}

.posts-feed {
  padding: 10px;
}

.post-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.post-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.post-user-info h3 {
  margin: 0;
  font-size: 1rem;
}

.post-time {
  font-size: 0.8rem;
  color: #65676b;
}

.post-content {
  margin-bottom: 15px;
}

.post-actions {
  display: flex;
  gap: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.like-btn, .comment-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #65676b;
  font-size: 0.9rem;
  cursor: pointer;
}

.like-btn.liked {
  color: #f91880;
}

.comment-form {
  display: flex;
  margin-top: 10px;
  gap: 10px;
}

.comment-form input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.comment-form button {
  background: #1877f2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 15px;
  cursor: pointer;
}

.comment-form button:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #65676b;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1877f2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
  z-index: 10;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  color: #65676b;
  font-size: 0.8rem;
  cursor: pointer;
}

.nav-btn.active {
  color: #1877f2;
}

.nav-btn svg {
  font-size: 1.5rem;
  margin-bottom: 3px;
}
`;

// Ajouter les styles au document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default SocialHomePage;