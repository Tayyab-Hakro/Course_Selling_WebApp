import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Create() {
  const [videos, setVideos] = useState([{ title: '', url: '' }]);
  const [price, setPrice] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [token, setToken] = useState(false);

  // Get token on first render
  const getToken = () => {
    const signtoken = localStorage.getItem("token");
    setToken(!!signtoken); // Convert to boolean
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleVideoChange = (index, field, value) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  const addVideo = () => {
    setVideos([...videos, { title: '', url: '' }]);
  };


// Example function to handle course submission
const handleSubmit = async (e) => {
 e.preventDefault()
    try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/admin/create",
      {
        title: courseTitle,             // ✅ changed from courseTitle
        description: courseDescription, // ✅ changed from courseDescription
        price: Number(price),           // ✅ ensure it's a number
        videos,                         // assume videos is already an array of objects { title, url }
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Course created:", res.data.message);
    // Optional: reset form or notify user
  } catch (err) {
    console.error("Error creating course:", err.response?.data || err.message);
    // Optional: display error to user
  }
};


  // Block access if not logged in as admin
  if (!token) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        You are not authorized to access this page. Please log in as an admin.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Create Course</h1>

      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Title</label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Enter course title"
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          placeholder="Enter course description"
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter course price"
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Video Sections */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Videos</h2>
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Video Title"
              value={video.title}
              onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="url"
              placeholder="Video URL"
              value={video.url}
              onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addVideo}
          className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Video
        </button>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Create Course
        </button>
      </div>
    </form>
  );
}

export default Create;
