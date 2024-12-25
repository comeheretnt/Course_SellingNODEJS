import React, { useEffect } from "react";
import Categories from "../HomeComponents/Categories";
import Courses from "../HomeComponents/Courses";
import Footer from "../HomeComponents/Footer";
import HomeTwoHeader from "../HomeComponents/HomeTwoHeader";

const HomeTwo = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <section className="font-gilroy font-medium text-gray text-lg leading-[27px]">
      <HomeTwoHeader />
      <Categories />
      <Courses />
      <Footer />
    </section>
  );
};

export default HomeTwo;
