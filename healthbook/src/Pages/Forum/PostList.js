// PostsList.jsx
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import PostPageNew from "./PostPageNew";
import { useNavigate } from "react-router-dom";
const PostsList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const author = localStorage.getItem("username");
    axios
      .get(`http://localhost:8000/forum/list-of-posts?author=${author}`)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.post);
      })
      .catch((error) => console.error(error));
  }, []);
  
  const handleCreate = () => {
    navigate("/createpost");
  };

  return (
    <>
     <div className="flex flex-col items-center justify-center mt-10 ">
        <strong className="text-3xl" > Posts </strong>
      </div>

      <div className="flex justify-end space-x-2 p-4">
        <input className="border p-2 w-half" type="text" placeholder="Search by ID, disease, doctor, or date..." />

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
           Search
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreate}>
          Create Post
        </button>
      </div>
    
    <div className="flex flex-wrap m-4" >
        {posts.map((post) => (
          <PostPageNew key={post.id} post={post} />
        ))}
      
    </div>
    </>
  );
};

export default PostsList;
