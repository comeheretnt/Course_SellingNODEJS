import React, { useState } from "react";
import "../assets/css/custom.css";
import SignUpModal from "./SignUpModal";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        onLogin(data.token, data.user); // Gọi hàm onLogin để cập nhật trạng thái người dùng
        onClose();
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
              <h4 className="text-2xl font-bold">
                <span className="glyphicon glyphicon-lock"></span> Login
              </h4>
            </div>

            <div className="modal-body p-5">
              {error && <div className="text-red-500">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="block font-medium text-gray-700">
                    <span className="glyphicon glyphicon-user mr-2"></span> Email
                  </label>
                  <input
                    type="email"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="block font-medium text-gray-700">
                    <span className="glyphicon glyphicon-eye-open mr-2"></span> Password
                  </label>
                  <input
                    type="password"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="checkbox mb-4">
                  <label>
                    <input type="checkbox" value="" className="mr-2" defaultChecked />
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-block py-2 text-black text-center font-bold"
                >
                  <span className="glyphicon glyphicon-off mr-2"></span> Login
                </button>
              </form>
            </div>

            <div className="modal-footer bg-gray-100 p-4 text-center text-black">
              <button
                type="button"
                className="btn btn-danger btn-default pull-left"
                onClick={onClose}
              >
                <span className="glyphicon glyphicon-remove mr-2"></span> Cancel
              </button>
              <p className="mt-3">
                Not a member? <a href="#" onClick={handleSignUpClick}>Sign Up</a>
              </p>
              <p>
                Forgot <a href="#">Password?</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <SignUpModal isOpen={isSignUpOpen} onClose={handleSignUpClose} />
    </>
  );
};

export default LoginModal;