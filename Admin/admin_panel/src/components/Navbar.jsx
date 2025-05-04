// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const handleToken = () => {
      const token = localStorage.getItem('token');
      setIsLogged(!!token);
    };

    // Call once on initial render
    handleToken();

    // Listen for login/logout events
    window.addEventListener('loginauth', handleToken);

    // Cleanup listener
    return () => {
      window.removeEventListener('loginauth', handleToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('loginauth'));
    console.log('Logged out');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-black">My App</h1>
    <h1 className='text-2xl font-bold'>  <Link to={'/createpost'} >CreateCourse</Link> </h1>
      {isLogged ? (
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
