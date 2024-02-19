// PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    
    // axios
    //   .get(`http://localhost:8000/forum/load-post?id/${id}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setPost(response.data.post);
    //   })
    //   .catch((error) => console.error(error));
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:8000/forum/load-post?id=${id}`);
        console.log(response.data);
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
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mt-10">{post.title}</h1>
      <p className='mt-10'>{post.content}</p>
      {/* Render comments, upvote and downvote buttons here */}
    </div>
  );
};

export default PostDetail;
