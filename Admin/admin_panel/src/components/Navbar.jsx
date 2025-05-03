// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-black">My App</h1>
   <Link to={'/login'}>   <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Login
      </button> </Link>
    </nav>
  );
};

export default Navbar;
