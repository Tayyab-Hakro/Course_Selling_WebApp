import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Update() {
  const [videos, setVideos] = useState([{ title: '', url: '' }]);
  const [price, setPrice] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [token, setToken] = useState(false);
  const { id } = useParams();

  // Get token on first render
  const getToken = () => {
    const signtoken = localStorage.getItem('token');
    setToken(!!signtoken);
  };

  // Fetch course data
  useEffect(() => {
    getToken();
    const getdata = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/admin/single/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const course = response.data;

        setCourseTitle(course.title || '');
        setCourseDescription(course.description || '');
        setPrice(course.price?.toString() || '');
        setVideos(course.videos?.length > 0 ? course.videos : [{ title: '', url: '' }]);
      } catch (error) {
        console.error('Failed to fetch course:', error.response?.data || error.message);
        alert('Failed to fetch course data.');
      }
    };

    getdata();
  }, [id]);

  const handleVideoChange = (index, field, value) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  const addVideo = () => {
    setVideos([...videos, { title: '', url: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseTitle || !courseDescription || !price || videos.length === 0) {
      alert('Please fill all fields and add at least one video.');
      return;
    }

    if (videos.some((video) => !video.title || !video.url)) {
      alert('Please fill out both title and URL for each video.');
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/admin/updatecourse/${id}`,
        {
          title: courseTitle,
          description: courseDescription,
          price: Number(price),
          videos,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert(res.data.message || 'Course updated successfully!');
    } catch (err) {
      console.error('Error updating course:', err.response?.data || err.message);
      alert('Error updating course.');
    }
  };

  const HandleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/admin/deletecourse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Course Deleted Successfully');
      } else {
        alert('Cannot delete course');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while deleting the course.');
    }
  };

  if (!token) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        You are not authorized to access this page. Please log in as an admin.
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Update Course</h1>

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
            Update Course
          </button>
        </div>
      </form>

      {/* Delete Button */}
      <div className="max-w-3xl mx-auto mt-4">
        <button
          onClick={HandleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Delete Course
        </button>
      </div>
    </>
  );
}

export default Update;
