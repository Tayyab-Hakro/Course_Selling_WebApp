import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Update from "./pages/Update";
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/createpost" element={<Create/>} />
        <Route path="/update/:id" element={<Update/>} />



      </Routes> 
    </Router>
  );
}

export default App;
