import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../LoginModal";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [user, setUser] = useState(null); // State for user
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  const scrollNav = useRef(null); // Reference for sticky behavior

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
  };

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token || !isTokenValid(token)) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        console.error("Failed to fetch user data.");
        handleLogout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleLogout();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowScroll = window.scrollY > 100; // Threshold for activating sticky
      scrollNav.current.classList.toggle("rt-sticky-active", windowScroll);
      scrollNav.current.classList.toggle("sticky", windowScroll);
    };

    window.addEventListener("scroll", handleScroll);

    fetchUser();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={scrollNav} className="site-header rt-sticky top-0 w-full z-[999]">
      <div className="main-header py-8 header-normal2 bg-white shadow-md transition-all duration-300">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="brand-logo flex-none lg:mr-10 md:w-auto max-w-[120px] text-3xl font-bold"
            >
              <span className="text-black">Edu</span>
              <span style={{ color: "#ff7e84" }}>Market</span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center flex-1">
              <div className="flex-1 main-menu relative mr-[74px]">
                <ul className="menu-active-classes lg:block">
                  <li className="menu-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/instructor">Instructor</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/courses-sidebar">Course</Link>
                  </li>
                  <li>
                    <Link to="/contacts">Contacts</Link>
                  </li>
                </ul>
                <div className="lg:block hidden">
                  <div className="border border-gray rounded-md h-[46px] modal-search">
                    <input
                      type="text"
                      className="block w-full rounded-md h-full border-none ring-0 focus:outline-none focus:ring-0"
                      placeholder="Search.."
                    />
                  </div>
                </div>
              </div>

              {/* Header Buttons */}
              <div className="flex-none flex space-x-[18px]">
                {isLoggedIn ? (
                  <div className="relative hidden lg:block">
                    <span className="text-black cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      Hi, {user.name} <span className="ml-2">&#x25BC;</span>
                    </span>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                        <ul>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden lg:block">
                    <button
                      onClick={toggleModal}
                      className="btn bg-black text-white py-[15px] px-8"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={toggleModal} onLogin={handleLogin} />
    </header>
  );
};

export default Header;