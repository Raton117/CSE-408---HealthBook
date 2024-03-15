import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [coverImageURL, setCoverImageURL] = useState('');
  const [coverImageCaption, setCoverImageCaption] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [captions, setCaptions] = useState([]);
  const [postid, setPostid] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (event) => {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImagesURL((prevImages) => prevImages.concat(fileArray));
      const selectedImages = Array.from(event.target.files);
      setImages((prevImages) => prevImages.concat(selectedImages));
      setCaptions((prevCaptions) => prevCaptions.concat(Array.from(event.target.files).map(() => '')));
  };

  const handleCoverImageChange = (event) => {
      const file = event.target.files[0];
      setCoverImageURL(URL.createObjectURL(file));
      setCoverImage(file);
  };

  const handleCoverImageCaptionChange = (event) => {
    setCoverImageCaption(event.target.value);
  };

  const handleCaptionChange = (index, caption) => {
      const newCaptions = [...captions];
      newCaptions[index] = caption;
      setCaptions(newCaptions);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newCaptions = [...captions];
    newImages.splice(index, 1);
    newCaptions.splice(index, 1);
    setImages(newImages);
    setCaptions(newCaptions);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      const author = localStorage.getItem('username');
      const tags ="topic1,topic2,topic3"
      const topics = topic.split(',').map(tag => ({ topic_name: tag.trim() }));
      const cover = {
        'image': coverImage,
        'caption': coverImageCaption
      };
      const postData = {
          author,
          title,
          content,
          topics,
      };

      try {
          const response = await axios.post('http://localhost:8000/forum/create-post', postData);
          console.log(response.data);
          setPostid(response.data.post_id);

          console.log(postid);

          for (let index = 0; index < images.length; index++) {
            const formData = new FormData();
            formData.append('post', response.data.post_id);
            formData.append('image_path', images[index]);
            formData.append('caption', captions[index]);
            const response2 = await axios.post('http://localhost:8000/forum/add-image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log(response2.data);
          }

          const formData = new FormData();
          formData.append('post', response.data.post_id);
          formData.append('image_path', coverImage);
          formData.append('caption', coverImageCaption);

          const response3 = await axios.post('http://localhost:8000/forum/add-cover-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response3.data);

          navigate(`/posts`)
      } catch (error) {
          console.error(error.response ? error.response.data : error.message);
      }      
  };

  return (
    <>
      <form className="container mx-auto p-4" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Text field</label>
          <textarea
            id="content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            placeholder="Write your post content here..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="imageUpload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            + Add image
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              onChange={handleImageChange}
              multiple
            />
          </label>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-4">
          {imagesURL.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt="Selected" className="rounded-md" />
              <input
                type="text"
                placeholder="Enter caption"
                value={captions[index] || ''}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                // onChange={(e) => handleCaptionChange(e, index)}
                style={{ width: '100%', padding: '8px', marginTop: '8px' }} // Apply styles here
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label htmlFor="coverImage" className="block text-gray-700 text-sm font-bold mb-2">Choose image: Cover image</label>
          <input
            type="file"
            id="coverImage"
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleCoverImageChange}
          />
          {coverImageURL && (
            <div className="mt-4">
              <img src={coverImageURL} alt="Cover" className="rounded-md" />
              <input
                type="text"
                placeholder="Enter caption for cover image"
                value={coverImageCaption}
                onChange={handleCoverImageCaptionChange}
                style={{ width: '100%', padding: '8px', marginTop: '8px' }}
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="topics" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
          <input
            type="text"
            id="topics"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Submit Post
          </button>
        </div>
      </form>
    </>
  );
}

export default CreatePost;

