import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../HomeComponents/Header";
import Footer from "../HomeComponents/Footer";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
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
          setFormData({
            name: data.user.name,
            email: data.user.email,
            phoneNumber: data.user.phoneNumber,
            role: data.user.role,
          });
        } else {
          setError("Failed to fetch user profile. Please try again later.");
        }
      } catch (error) {
        setError("An error occurred while fetching user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-start md:space-x-6">
          <div className="flex flex-col items-center md:w-1/4 bg-white p-6 shadow-md rounded-lg">
            <div className="relative w-32 h-32 mb-4">
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold">Avatar</span>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-center">{user?.name || "User Name"}</h2>
            <p className="text-sm text-gray-500 text-center">{user?.role || "Role"}</p>
          </div>
          <div className="w-full md:w-3/4 bg-white p-6 shadow-md rounded-lg">
            <div className="border-b border-gray-300 mb-4">
              <nav className="flex space-x-4">
                {["account", "courses"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 text-lg ${
                      activeTab === tab
                        ? "border-b-2 border-purple-500 text-purple-500 font-medium"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "account" ? "Account" : "Purchased Courses"}
                  </button>
                ))}
              </nav>
            </div>
            <div className="min-h-[300px] overflow-y-auto">
              {activeTab === "account" ? (
                <div className="space-y-4">
                  {["name", "email", "phoneNumber", "role"].map((field) => (
                    <div key={field}>
                      <label className="block font-medium text-gray-700 capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="form-control border border-gray-300 p-2 rounded-md w-full"
                        readOnly={!isEditing}
                      />
                    </div>
                  ))}
                  {isEditing ? (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn btn-primary mt-4 bg-purple-500 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary mt-4 bg-purple-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ) : (
                <PurchasedCourses userId={user.id} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const PurchasedCourses = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/payments?user_id=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch purchased courses");
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        setError("An error occurred while fetching purchased courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Purchased Courses</h3>
      <ul className="list-disc pl-6">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <li key={index} className="mb-4">
              <div className="flex items-center space-x-4">
                <img src={course.img} alt={course.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <p className="text-sm text-gray-500">{course.category?.name}</p>
                  <p className="text-sm text-gray-500">${course.price}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No courses purchased yet.</p>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;