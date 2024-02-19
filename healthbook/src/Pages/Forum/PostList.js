// PostsList.jsx
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
const PostsList = () => {
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

  return (
    <div className="container mx-auto items-center">
      <div className="flex flex-col flex-wrap justify-center ml-300">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
