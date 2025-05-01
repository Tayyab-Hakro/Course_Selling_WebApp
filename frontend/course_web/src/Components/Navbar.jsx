import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const handleAuth = () => {
      const token = localStorage.getItem("token");
      setLogin(!!token); // true if token exists
    };

    handleAuth();

    window.addEventListener("authchange", handleAuth);
    return () => {
      window.removeEventListener("authchange", handleAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authchange")); 
  }
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex-1">
        <ul className="flex gap-4">
          <li className="text-black font-semibold cursor-pointer hover:text-blue-600">Pages</li>
        </ul>
      </div>

      {/* Center: Home */}
      <div className="flex-1 text-center">
        <h1 className="text-xl font-bold text-black cursor-pointer">Home</h1>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex-1 flex justify-end gap-4">
        {login ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/register">
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
