import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomeTwo from "./Components/Home/HomeTwo";
import InstructorOne from "./Components/Pages/InstructorOne";
import CourseSideBar from "./Components/Pages/CourseSideBar";
import ContactUs from "./Components/Pages/ContactUs";
import SingleCourse from "./Components/Pages/SingleCourse";
import InstructorDetails from "./Components/Pages/InstructorDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="font-gilroy font-medium text-gray text-lg leading-[27px]">
        <Routes>
          <Route
            path="/"
            element={<HomeTwo />}
          />
          <Route
            path="/instructor"
            element={<InstructorOne />}
          />
          <Route
            path="/courses-sidebar"
            element={<CourseSideBar />}
          />
          <Route
            path="/contacts"
            element={<ContactUs />}
          />
          <Route
            path="/single-course/:id"
            element={<SingleCourse />}
          />
          <Route
            path="/single-instructors/:id"
            element={<InstructorDetails />}
          />
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;