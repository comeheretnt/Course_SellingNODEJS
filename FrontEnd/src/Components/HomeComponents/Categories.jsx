/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ct1 from "../../assets/images/icon/ct1.svg";
import ct2 from "../../assets/images/icon/ct2.svg";
import ct3 from "../../assets/images/icon/ct3.svg";
import ct4 from "../../assets/images/icon/ct4.svg";
import ct5 from "../../assets/images/icon/ct5.svg";
import ct6 from "../../assets/images/icon/ct6.svg";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="feature-area bg-[url('../images/all-img/section-bg-6.png')] bg-cover bg-no-repeat bg-center section-padding">
      <div className="container">
        <div className="text-center">
          <div className="mini-title">Course Categories</div>
          <div className="column-title ">
            Browse Top <span className="shape-bg">Categories</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] pt-10">
          {categories.map((category, index) => (
            <a
              className="rounded-[8px] transition-all duration-300 hover:shadow-box bg-white flex space-x-5 p-[30px] border-l-4 border-white hover:border-primary"
              href="#"
              key={index}
            >
              <div className="w-[72px] h-[72px] rounded bg-white relative group-hover:bg-[#FFE8E8]">
                <img
                  src={
                    index % 6 === 0
                      ? ct1
                      : index % 6 === 1
                      ? ct2
                      : index % 6 === 2
                      ? ct3
                      : index % 6 === 3
                      ? ct4
                      : index % 6 === 4
                      ? ct5
                      : ct6
                  }
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="course-content">
                <h4 className="lg:text-2xl text-1xl mb-2 font-bold">
                  {category.name}
                </h4>
                <p>{Math.floor(5 + Math.random() * 70)} Courses</p>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center pt-[70px]">
          <Link to="/courses-sidebar" className="btn btn-primary">
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;