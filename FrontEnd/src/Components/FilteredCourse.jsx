import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { c1, clock, file, review, star } from "../constant/images";

const FilteredCourse = ({ classNameForTabOne, classNameForTabTwo, searchKeyword, priceFilter, categoryFilter, skillLevelFilter, languageFilter }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const listIcon = [
    "clarity:grid-view-line",
    "ant-design:unordered-list-outlined",
  ];

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.courses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter courses based on search keyword, price, category, skill level, and language
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    course.price <= priceFilter &&
    (categoryFilter === "" || course.category?.name === categoryFilter) &&
    (skillLevelFilter === "" || course.course_level === skillLevelFilter) &&
    (languageFilter === "" || course.language === languageFilter)
  );

  return (
    <Tab.Group>
      <div className="flex flex-wrap gap-5 justify-center items-center mb-14">
        <div className="flex-1 flex flex-wrap gap-5 space-x-6 items-center">
          <Tab.List as="ul" id="tabs-nav" className="flex space-x-4 cata-Tbas">
            {listIcon.map((className, key) => (
              <Tab
                as="li"
                className={({ selected }) => (selected ? "active" : "")}
                key={key}
              >
                <a
                  href="#"
                  className="h-[60px] w-[60px] flex flex-col justify-center items-center"
                >
                  <iconify-icon icon={className}></iconify-icon>
                </a>
              </Tab>
            ))}
          </Tab.List>
          <span>Showing {filteredCourses.length} courses</span>
        </div>
      </div>
      <Tab.Panels as="div" id="tabs-content">
        {/* Tab 1: Grid View */}
        <Tab.Panel as="div" id="tab1" className="tab-content">
          <div className={classNameForTabOne}>
            {filteredCourses.map((course) => (
              <Link
                className="bg-white shadow-box2 rounded-[8px] transition duration-100 hover:shadow-sm"
                to={`/single-course/${course.id}`}
                key={course.id}
              >
                <div className="course-thumb h-[248px] rounded-t-[8px] relative">
                  <img
                    src={course.img || c1}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-t-[8px]"
                  />
                  <span className="bg-secondary py-1 px-3 text-lg font-semibold rounded text-white absolute left-6 top-6">
                    {course.category?.name || "General"}
                  </span>
                </div>
                <div className="course-content p-8">
                  <div className="text-secondary font-bold text-2xl mb-3">
                    ${course.price}
                  </div>
                  <h4 className="text-xl mb-3 font-bold">{course.title}</h4>
                  <div className="flex justify-between flex-wrap space-y-1 xl:space-y-0">
                    <span className="flex items-center space-x-2 mr-3">
                      <img src={file} alt="" />
                      <span>{course.lesson} Lessons</span>
                    </span>
                    <span className="flex items-center space-x-2 mr-3">
                      <img src={clock} alt="" />
                      <span>{course.time} Hours</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <img src={star} alt="" />
                      <span>{course.ratings || "N/A"}</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Tab.Panel>

        {/* Tab 2: List View */}
        <Tab.Panel id="tab2" className="tab-content">
          <div className={classNameForTabTwo}>
            {filteredCourses.map((course) => (
              <Link
                className="bg-white rounded-[8px] transition shadow-box7 duration-150 border-b-4 hover:border-primary border-transparent
                hover:shadow-box6 flex p-8 space-x-6"
                to={`/single-course/${course.id}`}
                key={course.id}
              >
                <div className="flex-none">
                  <div className="w-[159px] h-[159px] rounded relative">
                    <img
                      src={course.img || c1}
                      alt={course.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
                <div className="course-content flex-1">
                  <div className="text-primary font-bold text-2xl mb-2 flex justify-between">
                    <span className="inline-block">${course.price}</span>
                    <span className="flex space-x-1">
                      {[...Array(Math.round(course.ratings || 0))].map(
                        (_, i) => (
                          <span key={i} className="w-4 h-4 inline-block">
                            <img src={review} alt="" />
                          </span>
                        )
                      )}
                    </span>
                  </div>
                  <h4 className="text-2xl leading-[36px] mb-4 font-bold">
                    {course.title}
                  </h4>
                  <div className="flex space-x-6">
                    <span className="flex items-center space-x-2">
                      <img src={file} alt="" />
                      <span>{course.lesson} Lessons</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <img src={clock} alt="" />
                      <span>{course.time} Hours</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default FilteredCourse;