import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [login , SetLogin] = useState(false)
    useEffect(()=>{
        const token = localStorage.getItem("token")
        console.log(token)
        SetLogin(token)
    },[])
    const HandleLogout = ()=>{
        localStorage.removeItem("token")
        SetLogin(false)
    }
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Pages */}
      <div className="flex-1">
        <ul className="flex gap-4">
          <li className="text-black font-semibold cursor-pointer hover:text-blue-600">Pages</li>
        </ul>
      </div>

      {/* Center: Home */}
      <div className="flex-1 text-center">
        <h1 className="text-xl font-bold text-black cursor-pointer">Home</h1>
      </div>

      {/* Right: Sign Up / Login */}
      <div className="flex-1 flex justify-end gap-4">
        {login ?(

  <button onClick={HandleLogout} className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600">Logout</button> 
) :(
    <Link to={'/register'}>   <button className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600">SignUp</button> </Link>

)

        }
      </div>
    </nav>
  );
};

export default Navbar;
