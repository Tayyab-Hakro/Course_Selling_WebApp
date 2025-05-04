import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Course() {
  const [courses, setCourses] = useState([]);

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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      <div className="grid gap-6">
        {courses.map((course, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-700">{course.description}</p>
            <p className="text-sm">💰 Price: ${course.price}</p>
            <div className="mt-4 space-y-4">
              <h3 className="font-semibold">Videos:</h3>
              {course.videos?.map((video, vidIndex) => (
                <div key={vidIndex}>
                  {video.url.includes('youtube') || video.url.includes('embed') ? (
                    <iframe
                      width="100%"
                      height="300"
                      src={video.url}
                      title={`Video ${vidIndex}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded"
                    />
                  ) : (
                    <video
                      width="100%"
                      height="300"
                      controls
                      className="rounded"
                      src={video.url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
