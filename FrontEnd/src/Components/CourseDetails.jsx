import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Disclosure, Tab } from "@headlessui/react";
import {
  user,
  file2,
  clockIcon,
  starIcon,
  target,
  web,
  rc1,
  user2,
  likeIcon,
} from "../constant/images";

const CourseDetails = () => {
  const { id } = useParams(); // Extract ID from URL
  const [course, setCourse] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course details
        const response = await fetch(`http://localhost:3000/api/courses/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();
        setCourse(data.course);

        // Fetch related courses
        const relatedResponse = await fetch(
          `http://localhost:3000/api/courses`
        );
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related courses");
        }
        const relatedData = await relatedResponse.json();
        const filteredCourses = relatedData.courses
          .filter((item) => item.id !== id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setRelatedCourses(filteredCourses);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <div>Loading course details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="nav-tab-wrapper tabs  section-padding">
      <div className="container">
        <div className="grid grid-cols-12 gap-[30px]">
          <div className="lg:col-span-8 col-span-12">
            <div className="single-course-details">
              <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                <img
                  src={course.img}
                  alt=""
                  className=" rounded-md object-fut w-full h-full block"
                />
              </div>
              <div className=" mb-6">
                <span className="bg-secondary py-1 px-3 text-lg font-semibold rounded text-white ">
                  {course.category?.name}
                </span>
              </div>
              <h2> {course.title || "Untitled Course"}</h2>
              <div
                className="author-meta mt-6 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 
             sm:space-y-0 items-center"
              >
                <div>
                  <span className=" text-secondary  ">
                    Last Update:
                    <a href="#" className=" text-black">
                      {course.updatedAt
                        ? dayjs(course.updatedAt).format("MMMM DD, YYYY")
                        : "N/A"}
                    </a>
                  </span>
                </div>
              </div>
              <Tab.Group>
                <div className="nav-tab-wrapper mt-12">
                  <Tab.List as="ul" id="tabs-nav" className="course-tab mb-8">
                    {["OverView", "Instructor"].map((item, index) => (
                      <Tab
                        as="li"
                        key={index}
                        className={({ selected }) =>
                          selected ? "active" : null
                        }
                      >
                        <a href={`#tab`}>{item}</a>
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels id="tabs-content">
                    <Tab.Panel id="tab1" className="tab-content">
                      <div>
                        <h3 className=" text-2xl">Course Description</h3>
                        <p className="mt-4">{course.description}</p>
                      </div>
                    </Tab.Panel>

                    <Tab.Panel id="tab3" className="tab-content">
                      <div className=" bg-[#F8F8F8] rounded-md p-8">
                        <div className="md:flex space-x-5 mb-8">
                          <div className="h-[310px] w-[270px] flex-none rounded mb-5 md:mb-0">
                            <img
                              src={course.instructor?.avatar}
                              alt={course.instructor?.name || "Instructor"}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="max-w-[300px]">
                              <h4 className=" text-[34px] font-bold leading-[51px]">
                                {course.instructor?.name}
                              </h4>
                              <div className=" text-primary mb-6">
                                {course.instructor?.bio}
                              </div>
                              <ul className="list space-y-4">
                                <li className="flex space-x-3">
                                  <img src={file2} alt="" />
                                  <div>
                                    {course.instructor?.certified_count || 0}{" "}
                                    Certified Student
                                  </div>
                                </li>

                                <li className="flex space-x-3">
                                  <img src={user2} alt="" />
                                  <div>
                                    {course.instructor?.enrolled_count || 0}{" "}
                                    Students Learned
                                  </div>
                                </li>

                                <li className="flex space-x-3">
                                  <img src={likeIcon} alt="" />
                                  <div>
                                    {course.instructor?.rating || 0} Average
                                    Rating
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <p>
                          {course.instructor?.description ||
                            "No description available."}
                        </p>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="sidebarWrapper space-y-[30px]">
              <div className="wdiget custom-text space-y-5">
                <h3>{course.price ? `$${course.price}` : null}</h3>
                <ul className="list">
                  <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                    <div className="flex-1 space-x-3 flex">
                      <img src={user} alt="" />
                      <div className="text-black font-semibold">Instructor</div>
                    </div>
                    <div className="flex-none">{course.instructor?.name}</div>
                  </li>

                  <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                    <div className="flex-1 space-x-3 flex">
                      <img src={file2} alt="" />
                      <div className="text-black font-semibold">Lectures</div>
                    </div>
                    <div className="flex-none">{course.lesson}</div>
                  </li>

                  <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                    <div className="flex-1 space-x-3 flex">
                      <img src={clockIcon} alt="" />
                      <div className="text-black font-semibold">Duration</div>
                    </div>
                    <div className="flex-none">{course.time} hours</div>
                  </li>

                  <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                    <div className="flex-1 space-x-3 flex">
                      <img src={starIcon} alt="" />
                      <div className="text-black font-semibold">Enrolled</div>
                    </div>
                    <div className="flex-none">
                      {course.enrolled_count} students
                    </div>
                  </li>

                  <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                    <div className="flex-1 space-x-3 flex">
                      <img src={target} alt="" />
                      <div className="text-black font-semibold">
                        Course level
                      </div>
                    </div>
                    <div className="flex-none">{course.course_level}</div>
                  </li>

                  <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                    <div className="flex-1 space-x-3 flex">
                      <img src={web} alt="" />
                      <div className="text-black font-semibold">Language</div>
                    </div>
                    <div className="flex-none">{course.language}</div>
                  </li>
                  <button className="btn btn-primary w-full text-center">
                    Enroll Now
                  </button>
                </ul>
              </div>

              {/* Related Courses */}
              <div className="widget">
                <h4 className="widget-title">Related Courses</h4>
                <ul className="list">
                  {relatedCourses.map((related, idx) => (
                    <li
                      key={idx}
                      className="flex space-x-4 border-[#ECECEC] pb-6 mb-6 border-b"
                    >
                      <div className="flex-none h-20 w-20 rounded">
                        <Link to={`/single-course/${related.id}`}>
                          <img
                            src={related.img || rc1}
                            alt={related.title || "Related Course"}
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <h5 className="mb-1 font-semibold text-black">
                          <Link to={`/single-course/${related.id}`}>
                            {related.title}
                          </Link>
                        </h5>
                        <span className="text-secondary font-semibold">
                          ${related.price || "N/A"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
