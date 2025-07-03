// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-gray-300">MERN Blog</Link>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/create-post" className="hover:text-gray-300">Create Post</Link></li>
            <li>
              <button
                onClick={logout}
                className="hover:text-gray-300 bg-transparent border-none text-white cursor-pointer p-0 text-base"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
            <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;