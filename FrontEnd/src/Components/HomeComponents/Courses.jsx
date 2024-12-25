import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { file2, review, user2 } from "../../constant/images";

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourseData(data.courses); 
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Unable to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="section-padding bg-[url('../images/all-img/section-bg-7.png')] bg-cover bg-no-repeat bg-center">
      <div className="container">
        <div className="text-center">
          <div className="mini-title">Featured Courses</div>
          <div className="column-title">
            Choose Unlimited <span className="shape-bg">Courses</span>
          </div>
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-[30px] lg:pt-10 pt-5">
          {courseData.map((course, index) => (
            <Link
              to={`/single-course/${course.id}`} // Use Link for navigation
              className="bg-white rounded-[8px] transition duration-150 border-b-4 hover:border-primary border-transparent hover:shadow-box6 sm:flex p-8 sm:space-x-6 space-y-6 sm:space-y-0"
              key={index}
            >
              <div className="flex-none">
                <div className="sm:w-[200px] h-[159px] rounded relative">
                  <img
                    src={course.img?.startsWith("http") ? course.img : `http://localhost:3000/${course.img}`}
                    alt={course.title || "Course Image"}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
              <div className="course-content flex-1">
                <div className="text-primary font-bold lg:text-2xl text-1xl mb-2 flex justify-between">
                  <span className="inline-block">
                    {course.price ? `$${course.price}` : "Free"}
                  </span>
                  <span className="flex space-x-1">
                    {[...Array(course.ratings || 5)].map((_, i) => (
                      <span className="w-4 h-4 inline-block" key={i}>
                        <img src={review} alt="review" className="w-full h-full block object-cover" />
                      </span>
                    ))}
                  </span>
                </div>
                <h4 className="lg:text-2xl lg:leading-[36px] text-1xl mb-4 font-bold">
                  {course.title || "Untitled Course"}
                </h4>
                <div className="flex space-x-6">
                  <span className="flex items-center space-x-2">
                    <img src={file2} alt="file icon" />
                    <span>{course.lesson || "N/A"} Lessons</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <img src={user2} alt="user icon" />
                    <span>{course.time || "N/A"} Hours</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center lg:pt-16 pt-10">
          <Link to="/courses-sidebar" className="btn btn-primary">
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;
