import React, { useState } from "react";
import "../assets/css/custom.css";

const SignUpModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="modal-backdrop fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-green-600 text-white text-center p-4 relative">
              <button
                type="button"
                className="close absolute right-4 top-4 text-white text-xl"
                onClick={onClose}
              >
                &times;
              </button>
              <h4 className="text-2xl font-bold">Sign Up</h4>
            </div>

            <div className="modal-body p-5">
              {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-500">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="name" className="block font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="block font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="block font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-block py-2 text-black text-center font-bold"
                >
                  Sign Up
                </button>
              </form>
            </div>

            <div className="modal-footer bg-gray-100 p-4 text-center text-black">
              <button
                type="button"
                className="btn btn-danger btn-default pull-left"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;