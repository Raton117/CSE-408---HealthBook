// PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

function formatDate(dateString) {
  const date = new Date(dateString);
  // Format the date as YYYY-MM-DD
  const formattedDate = date.toISOString().split("T")[0];
  // Get hours and minutes
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  // Return the formatted string
  return `${formattedDate} ${hours}:${minutes}`;
}

const PostDetail = () => {
  const location = useLocation();

  if (location.search) {
    // console.log(location.state.post)
    console.log(location.search);
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams.get("postreport_id"));
  }
  
  console.log(location)
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [activeOptionsId, setActiveOptionsId] = useState(null);
  const [activeReportFormId, setActiveReportFormId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/forum/load-post?id=${id}`);
        console.log(response.data);
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

  const handleToggleOptions = (comment) => {
    if(comment.author === localStorage.getItem('username')){
    }
    else {
      if (activeOptionsId === comment.id  ) {
        setActiveOptionsId(null); // Hide options if they're already showing for this comment
      } else {
        setActiveOptionsId(comment.id);
        setActiveReportFormId(null); // Ensure the report form is hidden when showing options
      }
      setShowOptions(!showOptions);
   }

    
  };

  const handleToggleOptionsPost = (post) => {
    if(post.author === localStorage.getItem('username')){
    }
    else {
      if (activeOptionsId === post.id  ) {
        setActiveOptionsId(null); // Hide options if they're already showing for this post
      } else {
        setActiveOptionsId(post.id);
        setActiveReportFormId(null); // Ensure the report form is hidden when showing options
      }
      setShowOptions(!showOptions);
   }

    
  };

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



  const handleDownvote = async (commentId) => {
    // Find the index of the comment to be downvoted
    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex === -1) return; // If the comment is not found, exit the function

    // Check if the user has already downvoted this comment
    const alreadyVoted = post.comments[commentIndex].hasVoted;
    if (alreadyVoted) {
      console.log("User has already voted.");
      return; // Stop execution if already voted
    }

    // Proceed with downvote since the user hasn't voted yet
    const updatedComments = [...post.comments];
    const updatedComment = {
      ...updatedComments[commentIndex],
      downvotes: updatedComments[commentIndex].downvotes + 1, // Increment downvotes
      hasVoted: true, // Mark as voted
    };
    updatedComments[commentIndex] = updatedComment;

    setPost((prevPost) => ({
      ...prevPost,
      comments: updatedComments,
    }));

    try {
      const response = await axios.post(
        "http://localhost:8000/forum/upvote-downvote-comment",
        {
          user: localStorage.getItem("username"),
          comment: commentId,
          is_upvote: 0, // Indicate a downvote
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error downvoting comment:", error);
      // Revert the downvote count and hasVoted flag if necessary
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        downvotes: updatedComments[commentIndex].downvotes - 1, // Decrement downvotes
        hasVoted: false, // Revert hasVoted flag
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: updatedComments,
      }));
    }
  };

  const handlePostUpvote = async (postId) => {
    if (post.hasVoted) {
      console.log("User has already voted on this post.");
      return; // Stop execution if already voted
    }

    // Proceed with upvote since the user hasn't voted yet
    const updatedPost = {
      ...post,
      upvotes: post.upvotes + 1, // Increment upvotes
      hasVoted: true, // Mark as voted
    };

    setPost(updatedPost); // Update the post state

    try {
      const response = await axios.post(
        "http://localhost:8000/forum/upvote-downvote",
        {
          user: localStorage.getItem("username"),
          post: postId,
          is_upvote: 1,
        }
      );
      // Handle response or update UI further based on success
    } catch (error) {
      console.error("Error upvoting post:", error);
      // Revert the optimistic UI update if necessary
      setPost({
        ...post,
        upvotes: post.upvotes - 1,
        hasVoted: false, // Revert hasVoted flag
      });
    }
  };

  const handlePostDownvote = async (postId) => {
    // Check if the user has already voted on the post
    if (post.hasVoted) {
      console.log("User has already voted on this post.");
      return; // Stop execution if already voted
    }

    // Proceed with downvote since the user hasn't voted yet
    const updatedPost = {
      ...post,
      downvotes: post.downvotes + 1, // Increment downvotes
      hasVoted: true, // Mark as voted
    };

    setPost(updatedPost); // Update the post state

    try {
      const response = await axios.post(
        "http://localhost:8000/forum/upvote-downvote",
        {
          user: localStorage.getItem("username"),
          post: postId,
          is_upvote: 0, // Indicate a downvote
        }
      );
      // Handle response or update UI further based on success
    } catch (error) {
      console.error("Error downvoting post:", error);
      // Revert the optimistic UI update if necessary
      setPost({
        ...post,
        downvotes: post.downvotes - 1,
        hasVoted: false, // Revert hasVoted flag
      });
    }
  };

  const handleComment = async () => {

    try {
      const response = await axios.post('http://localhost:8000/forum/add-comment', {
        author: localStorage.getItem('username'),
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

  const handleEdit = (currentContent, commentId) => {
    console.log(currentContent);
    console.log(commentId);

    if (localStorage.getItem("username") === currentContent.author) {
      setEditingCommentId(commentId);
      setEditingContent(currentContent.content);
    }
    console.log();
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleSaveEdit = async () => {
    try {
      console.log(editingContent);
      console.log(editingCommentId);
      console.log(id);

      // Assuming the backend expects the comment ID and the new content
      const response = await axios.patch(
        "http://localhost:8000/forum/update-comment",
        {
          id: editingCommentId,
          author: localStorage.getItem("username"),
          post: id,
          content: editingContent,
        }
      );
      console.log(response.data);
      fetchPostData(); // Refresh the post data to show the updated comment
      handleCancelEdit(); // Reset the editing state
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleDeleteComment = async (comment, id) => {
    console.log(comment);
    if (localStorage.getItem("username") === comment.author) {
      try {
        const response = await axios.delete(
          "http://localhost:8000/forum/delete-comment",
          {
            data: {
              author: comment.author,
              comment_id: id, // Assuming 'id' is defined in the component's scope
            },
          }
        );
        console.log(response.data);
        fetchPostData();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/forum/delete-post",
        {
          data: {
            id: id, // Assuming 'id' is defined in the component's scope
            author: post.author, // Assuming 'post' is defined and contains 'author'
          },
        }
      );
      if (location.search && new URLSearchParams(location.search).get("postreport_id") !== null) {
        navigate(-1)
      }
      else {
        navigate("/posts");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleIgnore = async () => {
    // console.log('Ignore Button Clicked')
    const response = await axios.delete(
      "http://localhost:8000/forum/delete-report-post",
      {
        data: {
          id: new URLSearchParams(location.search).get("postreport_id"), // Assuming 'id' is defined in the component's scope
        },
      }
    );
    navigate(-1)
  }

  const handleReportSubmit = async (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(
      "Report submitted for comment ID:",
      id,
      "Reason:",
      reportReason
    );
    const response = await axios.post(
      "http://localhost:8000/forum/report-comment",
      {
        comment: id,
        reason: reportReason,
        user: localStorage.getItem("username"),
      }
    );
    console.log(response.data);
    setActiveReportFormId(null); // Hide the report form
    setReportReason("");
    setShowReportForm(false);
  };

  const handleCancelReport = () => {
    setActiveReportFormId(null); // Hide the report form
    setReportReason("");
    setShowReportForm(false);
  };

  const handlePostReportSubmit = async (e, id) => {
    e.preventDefault();
   
    const response = await axios.post(
      "http://localhost:8000/forum/report-post",
      {
        post: id,
        reason: reportReason,
        user: localStorage.getItem("username"),
      }
    );
    console.log(response.data);
    setActiveReportFormId(null); // Hide the report form
    setReportReason("");
    setShowReportForm(false);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mt-10 mb-2">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div>
            {(isUserAuthor || (localStorage.getItem('userRole') === 'admin' && location.search && new URLSearchParams(location.search).get("postreport_id") !== null)) && (
              <button
                onClick={handleDelete}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Delete
              </button>
            )}

            {localStorage.getItem('userRole') === 'admin' && location.search && new URLSearchParams(location.search).get("postreport_id") !== null && (
              <button
                onClick={handleIgnore}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Ignore
              </button>
            )}
          </div>
        </div>
        <p className="text-md text-gray-600">
  by <Link to={`/doctor/${post.author}`}><u> {post.author}</u></Link> on {new Date(post.date).toLocaleDateString()}
</p>

      </div>

      <div className="post-content mb-10">
        <p className="text-lg mt-4 mb-6">{post.content}</p>
        <div className="images-container">
          {post.images && post.images.map((image, index) => (
            <div key={index}> {/* Wrap elements inside a parent div */}
              <img
                src={`http://localhost:8000/${image.image_path}`}
                alt={`Post content ${index}`}
                className="my-4 w-full object-contain"
              />
              {image.caption && <p className="text-sm text-gray-500">{image.caption}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 items-center mb-4">
        {/* Like button */}
        <button
          onClick={() => handlePostUpvote(post.id)}
          className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-blue-300"
        >
          <span className="icon thumbs-up">👍</span>
          <span className="ml-1">{post.upvotes}</span>
        </button>
        {/* Dislike button */}
        <button
          onClick={() => handlePostDownvote(post.id)}
          className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <span className="icon thumbs-down">👎</span>
          <span className="ml-1">{post.downvotes}</span>
        </button>

        <button
          onClick={() => handleToggleOptionsPost(post)}
          className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <span className="text-xl">⋮</span>
        </button>

        {/* Report form */}
        {activeOptionsId === post.id && (
          <form
            onSubmit={(e) => handlePostReportSubmit(e, post.id)}
            className="w-80 bg-white shadow-lg rounded p-4 mt-2 ml-90"
          >
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Reason for reporting"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={handleCancelReport}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}
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

                  <p className="text-md mb-1">
                    {comment.author} @ {formatDate(comment.update_date)}
                    {/* {comment.author} @ {comment.update_date} */}
                    <br />
                    {comment.content}
                  </p>

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
                      onClick={() => handleEdit(comment, comment.id)}
                      className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <span>Edit</span>

                    </button>

                    <button
                      onClick={() => handleDeleteComment(comment, comment.id)}
                      className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <span>Delete</span>

                    </button>

                    {/* Three dots button */}
                    <button
                      onClick={() => handleToggleOptions(comment)}
                      className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <span className="text-xl">⋮</span>
                    </button>

                    {/* Report form */}
                    {activeOptionsId === comment.id && (
                      <form
                        onSubmit={(e) => handleReportSubmit(e, comment.id)}
                        className="w-80 bg-white shadow-lg rounded p-4 mt-2 ml-90"
                      >
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Reason for reporting"
                          value={reportReason}
                          onChange={(e) => setReportReason(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            type="button"
                            onClick={handleCancelReport}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  
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
