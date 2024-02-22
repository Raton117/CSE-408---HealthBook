import React,{useState,useEffect} from 'react'

const CreatePost = () => {
    const [images, setImages] = useState([]);
    const [coverImage, setCoverImage] = useState();
    const handleImageChange = (event) => {
        const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(fileArray));
    
      };
      const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        setCoverImage(URL.createObjectURL(file));
    
        // Optionally, if you want to keep the File object for upload
        // setCoverImage(file);
      };
      
      const removeImage = (imageToRemove) => {
        setImages((prevImages) => prevImages.filter((image) => image !== imageToRemove));
        URL.revokeObjectURL(imageToRemove);
      };

   
  return (
    <>

<form className="container mx-auto p-4">
  <div className="mb-6">
    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
    <input
      type="text"
      id="title"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Title"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Text field</label>
    <textarea
      id="content"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt="Selected" className="rounded-md" />
            <button
              onClick={() => removeImage(image)}
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
        {coverImage && (
          <img src={coverImage} alt="Cover" className="rounded-md mt-4" />
        )}
      </div>

  <div className="mb-6">
    <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
    <input
      type="text"
      id="tags"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

  )
}

export default CreatePost