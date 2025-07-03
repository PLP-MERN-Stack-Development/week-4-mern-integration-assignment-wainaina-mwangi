// client/src/pages/PostDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import postService from '../services/postService';
import commentService from '../services/commentService'; // If separate comments
import CommentList from '../components/CommentList'; // Assuming you'll style this later
import CommentForm from '../components/CommentForm'; // Assuming you'll style this later
import { useAuth } from '../context/AuthContext';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // Manage comments here

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const fetchedPost = await postService.getPostById(id);
        setPost(fetchedPost);

        // Fetch comments if they are separate
        const fetchedComments = await commentService.getCommentsByPost(id);
        // setComments(fetchedComments);
        // OR if comments are sub-documents: setComments(fetchedPost.comments);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await postService.deletePost(id);
        navigate('/'); // Redirect to home page after deletion
      } catch (err) {
        setError(err);
        alert('Failed to delete post. Please ensure you have permission.');
      }
    }
  };

  const handleAddComment = async (commentText) => {
    try {
        // Assuming comment service expects postId and text
        const newComment = await commentService.addComment(id, { text: commentText });
        setComments((prevComments) => [...prevComments, newComment]);
    } catch (err) {
        console.error("Failed to add comment:", err);
        alert("Failed to add comment.");
    }
  };

  if (loading) return <div className="text-center text-lg mt-8">Loading post...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-8">Error: {error.message}</div>;
  if (!post) return <div className="text-center text-lg mt-8">Post not found.</div>;

  // Assuming post.author is populated with at least an _id and username from the backend
  const isAuthor = isAuthenticated && user && post.author && user._id === post.author._id;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md my-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h2>
      <p className="text-gray-600 text-sm mb-6">By: <span className="font-semibold">{post.author?.username || 'Unknown Author'}</span></p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full max-h-96 object-cover rounded-lg mb-8 shadow-sm"
        />
      )}

      <div className="prose max-w-none text-gray-800 leading-relaxed mb-8">
        <p>{post.content}</p>
      </div>

      {isAuthor && (
        <div className="flex space-x-4 mb-8">
          <Link
            to={`/edit-post/${post._id}`}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
          >
            Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          >
            Delete Post
          </button>
        </div>
      )}

      <hr className="my-8 border-gray-300" />

      <h3 className="text-2xl font-bold text-gray-800 mb-6">Comments</h3>
      {/* Assuming CommentList and CommentForm are also styled with Tailwind */}
      {/* <CommentList comments={comments} /> */}
      {isAuthenticated ? (
        <CommentForm onAddComment={handleAddComment} />
      ) : (
        <p className="text-gray-600 text-center py-4">Please <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to leave a comment.</p>
      )}
    </div>
  );
}
export default PostDetailPage;