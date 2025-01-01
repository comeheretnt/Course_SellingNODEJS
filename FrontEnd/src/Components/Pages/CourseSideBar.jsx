import React, { useState, useEffect } from "react";
import { search, whiteCheck } from "../../constant/images";
import FilteredCourse from "../FilteredCourse";
import Footer from "../HomeComponents/Footer";
import Header from "../HomeComponents/Header";

const CourseSideBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [priceFilter, setPriceFilter] = useState(200); // Default max price
  const [categoryFilter, setCategoryFilter] = useState(""); // Default category filter
  const [skillLevelFilter, setSkillLevelFilter] = useState(""); // Default skill level filter
  const [languageFilter, setLanguageFilter] = useState(""); // Default language filter
  const [categories, setCategories] = useState([]);
  const [skillLevels, setSkillLevels] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        const uniqueCategories = [...new Set(data.courses.map(course => course.category?.name))];
        const uniqueSkillLevels = [...new Set(data.courses.map(course => course.course_level))];
        const uniqueLanguages = [...new Set(data.courses.map(course => course.language))];
        setCategories(uniqueCategories.filter(Boolean));
        setSkillLevels(uniqueSkillLevels.filter(Boolean));
        setLanguages(uniqueLanguages.filter(Boolean));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Header />
      <div className="nav-tab-wrapper tabs pt-10 section-padding-bottom">
        <div className="container">
          <div className="grid grid-cols-12 gap-[30px]">
            <div className="lg:col-span-8 col-span-12">
              <FilteredCourse
                classNameForTabOne={"grid md:grid-cols-2 grid-cols-1 gap-[30px]"}
                classNameForTabTwo={"grid  grid-cols-1 gap-[30px]"}
                searchKeyword={searchKeyword} // Truyền từ khóa tìm kiếm
                priceFilter={priceFilter} // Truyền giá trị lọc giá
                categoryFilter={categoryFilter} // Truyền giá trị lọc danh mục
                skillLevelFilter={skillLevelFilter} // Truyền giá trị lọc trình độ kỹ năng
                languageFilter={languageFilter} // Truyền giá trị lọc ngôn ngữ
              />
            </div>
            <div className="lg:col-span-4 col-span-12">
              <SideBar
                setSearchKeyword={setSearchKeyword}
                setPriceFilter={setPriceFilter}
                setCategoryFilter={setCategoryFilter}
                setSkillLevelFilter={setSkillLevelFilter}
                setLanguageFilter={setLanguageFilter}
                categories={categories}
                skillLevels={skillLevels}
                languages={languages}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseSideBar;

const SideBar = ({ setSearchKeyword, setPriceFilter, setCategoryFilter, setSkillLevelFilter, setLanguageFilter, categories, skillLevels, languages }) => {
  const [priceVal, setPriceVal] = useState(200); // Default max price

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.elements.search.value;
    setSearchKeyword(keyword);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceVal(value);
    setPriceFilter(value);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(prev => prev === category ? "" : category);
  };

  const handleSkillLevelChange = (skillLevel) => {
    setSkillLevelFilter(prev => prev === skillLevel ? "" : skillLevel);
  };

  const handleLanguageChange = (language) => {
    setLanguageFilter(prev => prev === language ? "" : language);
  };

  return (
    <div className="sidebarWrapper space-y-[30px]">
      <div className="wdiget widget_search">
        <form onSubmit={handleSearch}>
          <div className="bg-[#F8F8F8] flex rounded-md shadow-e1 items-center py-[4px] pl-3 relative">
            <div className="flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search keyword..."
                className="border-none focus:ring-0 bg-transparent"
              />
            </div>
            <div className="flex-none">
              <button type="submit" className="btn btn-primary">
                <img src={search} alt="" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="wdiget widget_catagory">
        <h4 className="widget-title">Price Filter</h4>
        <input
          type="range"
          max={200}
          min={0}
          className="slider-range"
          value={priceVal}
          onChange={handlePriceChange}
        />
        <div className="price_slider_amount">
          <div className="mt-6">
            <div className="flex space-x-2 text-xl font-medium text-black">
              <span className="flex-none">Price:</span>
              <input
                type="number"
                name="price"
                placeholder="Add Your Price"
                value={priceVal}
                disabled
                className="amount flex-1 border-none focus:outline-none focus:ring-0 p-0 text-xl font-medium text-black"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="wdiget widget_catagory">
        <h4 className="widget-title">Categories</h4>
        <ul className="list-item space-y-4">
          {categories.map((category, index) => (
            <li className="block" key={index}>
              <button
                onClick={() => handleCategoryChange(category)}
                className="flex justify-between bg-[#F8F8F8] py-[17px] px-5 rounded hover:bg-primary hover:text-white transition-all duration-150"
              >
                <span>{category}</span>
                <span className="text-2xl">
                  <iconify-icon icon="heroicons:chevron-right-20-solid"></iconify-icon>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="wdiget widget_catagory">
        <h4 className="widget-title">Skill Level</h4>
        <ul className="list-item space-y-5">
          {skillLevels.map((skillLevel, index) => (
            <li className="block" key={index}>
              <label className="flex space-x-3 form-check cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden form-check-input"
                  onChange={() => handleSkillLevelChange(skillLevel)}
                />
                <span className="ck-box flex flex-col items-center justify-center">
                  <img src={whiteCheck} alt="" className="object-contain" />
                </span>
                <span className="form-check-label">{skillLevel}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="wdiget widget_catagory">
        <h4 className="widget-title">Language</h4>
        <ul className="list-item space-y-5">
          {languages.map((language, index) => (
            <li className="block" key={index}>
              <label className="flex space-x-3 form-check cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden form-check-input"
                  onChange={() => handleLanguageChange(language)}
                />
                <span className="ck-box flex flex-col items-center justify-center">
                  <img src={whiteCheck} alt="" className="object-contain" />
                </span>
                <span className="form-check-label">{language}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};