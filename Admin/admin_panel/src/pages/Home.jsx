import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function Home() {
  const [courses, setCourses] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/admin/getcourse");
        setCourses(res.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    getData();
  }, []);

  const getEmbed = (url) => {
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  const handleToggleVideos = (index) => {
    setVisibleVideos(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div key={course._id ||course.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
         
            <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-sm text-gray-500 mt-1">💰 <span className="font-medium">${course.price}</span></p>

            <div className="mt-4">
              <button
                onClick={() => handleToggleVideos(index)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                {visibleVideos[index] ? 'Hide Videos' : 'Watch Course'}
              </button>
              <button
                 onClick={() => navigate(`/update/${course._id}`)}
                className="bg-blue-600 ml-1 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Update Course
              </button>

              {visibleVideos[index] && (
                <div className="mt-4 space-y-4">
                  {course.videos && course.videos.length > 0 ? (
                    course.videos.map((video, vidIndex) => (
                      <div key={vidIndex} className="border rounded p-2 bg-gray-50">
                        <p className="font-medium mb-2 text-sm text-gray-700">{video.title}</p>
                        {video.url.includes('youtube') || video.url.includes('embed') ? (
                          <iframe
                            width="100%"
                            height="200"
                            src={getEmbed(video.url)}
                            title={`Video ${vidIndex}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                          />
                        ) : (
                          <video
                            width="100%"
                            height="200"
                            controls
                            className="rounded"
                            src={video.url}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No videos available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
