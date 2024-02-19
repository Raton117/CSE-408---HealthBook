import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  // const handleTagsChange = (event) => {
  //   // Split the input value by commas and trim whitespace from each tag
  //   const tagsArray = event.target.value.split(',').map(tag => tag.trim());
  //   setTags(tagsArray);
  // };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const author = localStorage.getItem("username")
      const response = await axios.post("http://localhost:8000/forum/create-post", {
        author: author,
        title: title,
        content: postContent,
        
      });
      console.log(response.data);
      // Clear form fields after submission
      setPostContent("");
      setTags("");
      alert("Post created successfully!");
    } catch (error) {
      console.error("There was an error creating the post:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter title here..."
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="postContent"
          className="block text-sm font-medium text-gray-700"
        >
          Post Content
        </label>
        <textarea
          id="postContent"
          rows="4"
          className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={handlePostContentChange}
        ></textarea>
      </div>

      <button
        type="button"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
