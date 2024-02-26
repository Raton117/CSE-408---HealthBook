import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function truncateByWord(str, numWords) {
  return str.split(" ").splice(0, numWords).join(" ");
}


const PostPageNew = ({ post }) => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const handleClick = () => {
    console.log("Post clicked");
    navigate(`/posts/${post.id}`);
  };

  


  // useEffect(() => {
  //   const author = localStorage.getItem("username");
  //   axios
  //     .get(`http://localhost:8000/forum/list-of-posts?author=${author}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setPosts(response.data.post);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
  
 
  return (
    <>
    
    <div className="p-4 w-full md:w-1/2 lg:w-1/3">
  <article className="border rounded-lg overflow-hidden h-full flex flex-col" onClick={handleClick}>
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-4 flex-grow">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-600">{post.content.substring(0, 100)}</p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        by {post.author}
      </span>
    </div>
  </article>
</div>

 
 
    </>
  );
};

export default PostPageNew;
