import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [tags, setTags] = useState([]);

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleTagsChange = (event) => {
    // Split the input value by commas and trim whitespace from each tag
    const tagsArray = event.target.value.split(',').map(tag => tag.trim());
    setTags(tagsArray);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/posts', { content: postContent, tags: tags.split(',') });
      console.log(response.data);
      // Clear form fields after submission
      setPostContent('');
      setTags('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('There was an error creating the post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <div className="mb-5">
        <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">Post Content</label>
        <textarea
          id="postContent"
          rows="4"
          className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={handlePostContentChange}
        ></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          id="tags"
          className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter tags separated by commas"
          value={tags}
          onChange={handleTagsChange}
        />
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
