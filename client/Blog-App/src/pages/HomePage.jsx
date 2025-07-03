// client/src/pages/HomePage.jsx
import React from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../Components/PostCard';

function HomePage() {
  const { posts, loading, error } = usePosts();

  if (loading) return <div className="text-center text-lg mt-8">Loading posts...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-8">Error: {error.message}</div>;

  return (
    <div className="home-page py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 text-lg">No posts available. Be the first to create one!</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
export default HomePage;