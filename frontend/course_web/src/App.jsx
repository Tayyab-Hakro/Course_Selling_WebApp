import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Course from "./Pages/Course";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/course" element={<Course/>} />

      </Routes> 
    </Router>
  );
}

export default App;
