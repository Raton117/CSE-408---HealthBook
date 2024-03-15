// PostsList.jsx
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import PostPageNew from "./PostPageNew";
import { useNavigate } from "react-router-dom";
const PostsList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/forum/list-of-posts")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.post);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCreate = () => {
    navigate("/createpost");
  };

 
  const handleSearch = async() => {
    console.log(author);
    console.log(topics);
    try {
      // Initialize the request payload with an empty object
      const payload = {};
      
      // Add the author to the payload if it's provided
      if (author) {
        payload.author = author;
      }
      
      // Add the topics to the payload if it's provided and not empty
      if (topics.length > 0) {
        payload.topics = topics;
      }
  
      // Perform the search request with the constructed payload
      const response = await axios.post('http://localhost:8000/forum/list-of-posts', payload);
  
      setPosts(response.data.post);
      console.log(response.data);
      // Process the response data as needed
    } catch (error) {
      console.error('Search failed:', error);
      // Handle errors, such as displaying a message to the user
    }
  }
  const handleTopicsChange = (e) => {
    // Split the input by commas, trim whitespace, and filter out any empty strings
    const topicsArray = e.target.value.split(',').map(topic => topic.trim()).filter(topic => topic !== "");
    setTopics(topicsArray);
  };
  const userType = localStorage.getItem("userRole")=== "doctor";

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 ">
        <strong className="text-3xl"> Posts </strong>
      </div>

      <div className="flex justify-end space-x-2 p-4">
        <input
          className="border p-2 w-half"
          type="text"
          placeholder="Enter doctor's name"
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="border p-2 w-half"
          type="text"
          placeholder="Enter topic name"
          onChange={handleTopicsChange}
        />


        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch} 
        >
          Search
        </button>
        {userType &&(
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreate}
        >
          Create Post
        </button>)}
      </div>

      <div className="flex flex-wrap m-4">
        {posts
          ? posts.map((post) => <PostPageNew key={post.id} post={post} />)
          : "No posts available"}
      </div>
    </>
  );
};

export default PostsList;
