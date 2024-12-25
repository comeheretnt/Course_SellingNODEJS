import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Course from "./Course";
import { counter1, counter2, counter3 } from "../constant/images";

const SingleInstructor = () => {
  const { id } = useParams(); // Get the instructor ID from the URL params
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [totalEnrolled, setTotalEnrolled] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructorAndCourses = async () => {
      try {
        // Fetch instructor data
        const instructorResponse = await fetch(`http://localhost:3000/api/instructors/${id}`);
        if (!instructorResponse.ok) throw new Error("Failed to fetch instructor");
        const instructorData = await instructorResponse.json();
        console.log("Instructor Data:", instructorData); // Kiểm tra dữ liệu trả về
        setInstructor(instructorData.instructor);

        // Fetch courses data
        const coursesResponse = await fetch("http://localhost:3000/api/courses");
        if (!coursesResponse.ok) throw new Error("Failed to fetch courses");
        const coursesData = await coursesResponse.json();
        console.log("Courses Data:", coursesData); // Kiểm tra dữ liệu trả về
        setCourses(coursesData.courses);

        // Calculate total enrolled students for instructor's courses
        const instructorCourses = coursesData.courses.filter(course => course.instructor_id === parseInt(id));
        console.log("Instructor Courses:", instructorCourses); // Kiểm tra dữ liệu trả về
        const total = instructorCourses.reduce((sum, course) => sum + course.enrolled_count, 0);
        setTotalEnrolled(total);

        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInstructorAndCourses();
  }, [id]);

  if (loading) return <div>Loading instructor data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!instructor) return <div>No instructor data available.</div>;

  return (
    <div className="section-padding bg-[url('../images/all-img/insbg.png')] bg-contain bg-no-repeat">
      <div className="container">
        <div className="grid grid-cols-12 xl:gap-0 gap-[30px]">
          <div className="lg:col-span-4 col-span-12">
            <div className="bg-white shadow-box7 rounded-md max-w-[350px] lg:sticky lg:top-10">
              <div className="h-[400px] mb-8">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-full h-full block object-cover rounded-t-md"
                />
              </div>
              <div className="px-8 pb-8">
                <h5 className="text-2xl font-bold text-black mb-4">
                  {instructor.name}
                </h5>
                <div className="mb-8">
                  <span className="inline-block text-primary">{instructor.bio}</span>
                </div>
                <ul className="space-y-[19px]">
                  <li className="flex items-center space-x-3">
                    <div className="flex-none">
                      <span className="w-8 h-8 rounded bg-secondary text-white flex flex-col items-center justify-center text-lg">
                        <iconify-icon icon="heroicons:envelope"></iconify-icon>
                      </span>
                    </div>
                    <span className="flex-1">{instructor.email}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="flex-none">
                      <span className="w-8 h-8 rounded bg-secondary text-white flex flex-col items-center justify-center text-lg">
                        <iconify-icon icon="heroicons:phone"></iconify-icon>
                      </span>
                    </div>
                    <span className="flex-1">{instructor.phone}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <div className="mb-10">
              <h2>{instructor.name}</h2>
            </div>
            <div>
              {instructor.description}
            </div>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px] mt-24">
              <div className="bg-white shadow-box7 text-center pt-[64px] pb-8 px-[50px] rounded-[8px] relative my-4">
                <img
                  src={counter1}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 -top-10"
                />
                <h4 className="text-[44px] leading-[66px] text-black font-bold mb-1">
                  <span className="counter">{totalEnrolled}</span>+
                </h4>
                <p>Enrolled Students</p>
              </div>

              <div className="bg-white shadow-box7 text-center pt-[64px] pb-8 px-[50px] rounded-[8px] relative my-4">
                <img
                  src={counter3}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 -top-10"
                />
                <h4 className="text-[44px] leading-[66px] text-black font-bold mb-1">
                  <span className="counter">{instructor.certified_count}</span>+
                </h4>
                <p>Certified Students</p>
              </div>

              <div className="bg-white shadow-box7 text-center pt-[64px] pb-8 px-[50px] rounded-[8px] relative my-4">
                <img
                  src={counter2}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 -top-10"
                />
                <h4 className="text-[44px] leading-[66px] text-black font-bold mb-1">
                  <span className="counter">{instructor.rating}</span>
                </h4>
                <p>Rating</p>
              </div>
            </div>
            <div className="mt-20 mb-14">
              <div className="mini-title">Courses By {instructor.name}</div>
              <div className="column-title">
                Courses By <span className="shape-bg">{instructor.name}</span>
              </div>
            </div>
            <div className="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-[30px]">
              {courses
                .filter((course) => course.instructor_id === parseInt(id))
                .map((course, index) => (
                  <Course course={course} key={index} index={index} />
                ))}
            </div>
            <div className="text-center lg:pt-14 pt-8">
              <a href="#" className="btn btn-primary">
                View All Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInstructor;