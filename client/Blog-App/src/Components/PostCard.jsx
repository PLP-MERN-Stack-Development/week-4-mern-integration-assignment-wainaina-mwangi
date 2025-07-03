// client/src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3">By: {post.author?.username || 'Unknown Author'}</p> {/* Safe navigation */}
        <p className="text-gray-700 mb-4">{post.content.substring(0, 150)}...</p>
        <Link
          to={`/posts/${post._id}`}
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
export default PostCard;