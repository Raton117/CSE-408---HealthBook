// PostCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div
      className="bg-blue-100 max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer"
      onClick={handleClick}
    >
      {/* <img className="w-full" src="/path-to-your-image.jpg" alt="Post image" /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">
          {post.content.substring(0, 100)}...
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          by {post.author}
        </span>
       
      </div>
      <button className="absolute bottom-0 right-0 mb-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button Text
  </button>
      
    </div>
  );
};

export default PostCard;
