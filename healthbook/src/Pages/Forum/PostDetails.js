// PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  
  const navigate = useNavigate();

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
  }, []);
 
  const fetchPostData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/forum/load-post?id=${id}`);
      setPost(response.data.post);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  

  if (!post) {
    return <div>Loading...</div>;
  }
  const isUserAuthor = localStorage.getItem('username') === post.author;
 

  
  const handleUpvote = async (commentId) => {
    // Find the index of the comment to be updated
    const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) return; // Comment not found
  
    // Check if the user has already upvoted this comment
    const alreadyVoted = post.comments[commentIndex].hasVoted;
    if (alreadyVoted) {
      console.log('User has already voted.');
      return; // Stop execution if already voted
    }
  
    // Proceed with upvote since the user hasn't voted yet
    const updatedComments = [...post.comments];
    const updatedComment = {
      ...updatedComments[commentIndex],
      upvotes: updatedComments[commentIndex].upvotes + 1, // Increment upvotes
      hasVoted: true, // Mark as voted
    };
    updatedComments[commentIndex] = updatedComment;
  
    setPost(prevPost => ({
      ...prevPost,
      comments: updatedComments,
    }));
  
    try {
      const response = await axios.post('http://localhost:8000/forum/upvote-downvote-comment', {
        user: localStorage.getItem('username'),
        comment: commentId,
        is_upvote: 1,
      });
      // If the API call fails, revert the optimistic UI update
    } catch (error) {
      console.error('Error upvoting comment:', error);
      // Revert the upvote count and hasVoted flag if necessary
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        upvotes: updatedComments[commentIndex].upvotes - 1,
        hasVoted: false, // Revert hasVoted flag
      };
      setPost(prevPost => ({
        ...prevPost,
        comments: updatedComments,
      }));
    }
  };
  
  

  const handleDownvote = async (id) => {
    try {
      const response = await axios.post('http://localhost:8000/forum/upvote-downvote-comment', {
        user: localStorage.getItem('username'),
        comment:id,
        is_upvote: 0
      });
      console.log(response.data);
    } 
    
    catch (error) {
      console.error('Error upvoting comment:', error);
    }
  };

  const handleComment = async () => {
        
    try {
      const response = await axios.post('http://localhost:8000/forum/add-comment', {
        author:localStorage.getItem('username'),
        post: id,
        content: comment
      });
       console.log(response.data);
       setComment('');
  
      //  setPost(prevPost => ({
      //    ...prevPost,
      //    comments: [...prevPost.comments, response.data.post.comments]
      //  }));
      fetchPostData();
       console.log(post.comments);
    }
      catch (error) {
        console.error('Error adding comment:', error);
      }

  }

  const handleEdit = ( currentContent,commentId) => {
    console.log(currentContent);
    console.log(commentId);
    
    if(localStorage.getItem('username') === post.comments[id].author)
    {
      setEditingCommentId(commentId);
      setEditingContent(currentContent);
    }
   
  };

 

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleSaveEdit = async () => {
    try {
      // Assuming the backend expects the comment ID and the new content
      const response = await axios.patch('http://localhost:8000/forum/edit-comment', {
        comment_id: editingCommentId,
        content: editingContent,
      });
      console.log(response.data);
      fetchPostData(); // Refresh the post data to show the updated comment
      handleCancelEdit(); // Reset the editing state
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleDeleteComment = async (comment, id) => {
    console.log(comment);
    if (localStorage.getItem('username') === comment.author) {
      try {
        const response = await axios.delete('http://localhost:8000/forum/delete-comment', {
          data: {
            author: comment.author,
            comment_id: id // Assuming 'id' is defined in the component's scope
          }
        });
        console.log(response.data);
        fetchPostData();
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };
  
  const handleDelete = async () => {
   
    try {
      const response = await axios.delete('http://localhost:8000/forum/delete-post', {
        data: {
          id: id, // Assuming 'id' is defined in the component's scope
          author: post.author // Assuming 'post' is defined and contains 'author'
        }
      });
      navigate('/posts')
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
  <div className="flex justify-between items-center mt-10 mb-2">
    <h1 className="text-4xl font-bold">{post.title}</h1>
   
    {isUserAuthor && (
            <button
              onClick={handleDelete}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Delete
            </button>
          )}
  </div>
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
    <input
     type="text" 
      className="w-full p-2 border border-gray-300 rounded shadow-sm mb-2"
      rows="3"
      placeholder="Add a comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></input>
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleComment}>Comment</button>
  </div>

  <div>
      {post.comments.map((comment) => (
        <div key={comment.id} className="border-t border-gray-200 mt-4 pt-4">

{editingCommentId === comment.id ? (
              // If this comment is being edited, show an input and Save/Cancel buttons
              <>
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2">Save</button>
                <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
              </>
            ) : (
              <>
              
          <p className="text-md mb-1">{comment.author} : {comment.content}</p>
          
          <div className="flex gap-4 items-center mb-4">
            {/* Like button */}
            <button
              onClick={() => handleUpvote(comment.id)}
              className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-blue-300"
            >
              <span className="icon thumbs-up">👍</span>
              <span className="ml-1">{comment.upvotes}</span>
            </button>
            {/* Dislike button */}
            <button
               onClick={() => handleDownvote(comment.id)}
              className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <span className="icon thumbs-down">👎</span>
              <span className="ml-1">{comment.downvotes}</span>
            </button>
            <button
               onClick={() => handleEdit(comment,comment.id)}
              className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <span>Edit</span>
              
            </button>

          <button
               onClick={() => handleDeleteComment (comment,comment.id)}
              className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <span>Delete</span>
              
            </button>
          </div>
          </>
            )}
        </div>
      ))}
    </div>

  {/* You would map through comments here */}
</div>



    </div>
  );
};

export default PostDetail;
