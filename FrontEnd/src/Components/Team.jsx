import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Team = () => {
  const [instructors, setInstructors] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        // Fetch all instructors from the API
        const response = await fetch(`http://localhost:3000/api/instructors`);
        if (!response.ok) {
          throw new Error("Failed to fetch instructors");
        }
        const data = await response.json();

        // Set the instructors data
        setInstructors(data.instructors || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) return <div>Loading instructors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="section-padding">
      <div className="container">
        <div className="text-center">
          <div className="mini-title">Our Instructor</div>
          <div className="column-title">
            Our Expert <span className="shape-bg">Instructors</span>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] pt-10">
          {instructors.map((instructor, index) => (
            <Link to={`/single-instructors/${instructor.id}`} key={index}>
              <div
                className="bg-white shadow-box3 rounded-[8px] transition-all duration-100 pt-10 pb-[28px] px-6 text-center hover:shadow-box4 border-t-4 border-transparent hover:border-secondary"
              >
                <div className="w-[170px] h-[170px] rounded-full relative mx-auto mb-8">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="course-content">
                  <h4 className="lg:text-2xl text-1xl mb-1 font-bold">
                    {instructor.name}
                  </h4>
                  <div>{instructor.bio}</div>
                  <ul className="space-x-4 flex justify-center pt-6">
                    <li>
                      <a
                        href="#"
                        className="h-10 w-10 rounded bg-red-paste text-primary flex flex-col justify-center items-center text-2xl transition hover:bg-primary hover:text-white"
                      >
                        <iconify-icon icon="bxl:facebook"></iconify-icon>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="h-10 w-10 rounded bg-green-paste text-secondary flex flex-col justify-center items-center text-2xl transition hover:bg-secondary hover:text-white"
                      >
                        <iconify-icon icon="bxl:twitter"></iconify-icon>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="h-10 w-10 rounded bg-[#EEE8FF] text-#8861DB flex flex-col justify-center items-center text-2xl transition hover:bg-[#8861DB] hover:text-white"
                      >
                        <iconify-icon icon="bxl:linkedin"></iconify-icon>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;