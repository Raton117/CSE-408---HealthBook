// PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/forum/load-post?id=${id}`);
        setPost(response.data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mt-10 mb-2">{post.title}</h1>
        <p className="text-md text-gray-600">
          by {post.author} on {new Date(post.date).toLocaleDateString()}
        </p>
      </div>

      <div className="post-content mb-10">
        <p className="text-lg mt-4 mb-6">{post.content}</p>
        {post.images && post.images.map((image, index) => (
          <img key={index} src={image} alt={`Post content ${index}`} className="my-4 w-full object-contain" />
        ))}
      </div>

      

<div className="comments-section mt-10">
  <h2 className="text-2xl font-semibold mb-4">Comments</h2>

  {/* New comment input field */}
  <div className="mb-6">
    <textarea
      className="w-full p-2 border border-gray-300 rounded shadow-sm mb-2"
      rows="3"
      placeholder="Add a comment..."
    ></textarea>
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Comment</button>
  </div>

  {/* Example of a single comment */}
  <div className="border-t border-gray-200 mt-4 pt-4">
    <p className="text-md mb-1">Username commented:</p>
    <p className="text-gray-700 mb-4">This is a great post! I've learned a lot.</p>
    <div className="flex gap-4 items-center mb-4">
      {/* Like and dislike buttons with icons */}
      <button className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        <span className="icon thumbs-up">👍</span>
        <span className="ml-1">Like</span>
      </button>
      <button className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        <span className="icon thumbs-down">👎</span>
        <span className="ml-1">Dislike</span>
      </button>
      <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Reply</button>
    </div>

    {/* Replies */}
    <div className="ml-8">
      <div className="border-t border-gray-200 mt-4 pt-4">
        
        {/* Nested reply input field */}
        <div className="mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded shadow-sm mb-2"
            rows="2"
            placeholder="Add a reply..."
          ></textarea>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Reply</button>
        </div>
      </div>
    </div>
  </div>

  {/* You would map through comments here */}
</div>



    </div>
  );
};

export default PostDetail;
