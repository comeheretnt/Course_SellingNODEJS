import React, { useState, useEffect } from "react";
import "../assets/css/custom.css";
import SignUpModal from "./SignUpModal";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for remember me
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const savedEmail = localStorage.getItem("email"); // Lấy email đăng nhập gần nhất
      setEmail(savedEmail || "");

      if (savedEmail) {
        const savedPassword = localStorage.getItem(savedEmail); // Lấy mật khẩu theo email
        if (savedPassword) {
          setPassword(savedPassword);
          setRememberMe(true); // Tự tick nếu có mật khẩu
        } else {
          setPassword("");
          setRememberMe(false); // Không tick nếu không có mật khẩu
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const savedPassword = localStorage.getItem(newEmail);
    if (savedPassword) {
      setPassword(savedPassword);
      setRememberMe(true); // Tự động tick nếu có mật khẩu
    } else {
      setPassword("");
      setRememberMe(false); // Bỏ tick nếu không có mật khẩu
    }
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
        localStorage.setItem("email", email); // Lưu email tài khoản đăng nhập cuối cùng

        // Lưu mật khẩu theo email nếu tick "Remember Me"
        if (rememberMe) {
          localStorage.setItem(email, password); // Lưu mật khẩu theo email
        } else {
          localStorage.removeItem(email); // Xóa mật khẩu của email này nếu không tick
        }

        onLogin(data.token, data.user);
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
            <div className="modal-header bg-[#ff7e84] text-white text-center p-4 relative">
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
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-[30px] mt-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700"
                  >
                    <span className="glyphicon glyphicon-user mr-2"></span>{" "}
                    Email
                  </label>
                  <input
                    type="email"
                    className="from-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange} // Thay đổi từ setEmail sang handleEmailChange
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block font-medium text-gray-700"
                  >
                    <span className="glyphicon glyphicon-eye-open mr-2"></span>{" "}
                    Password
                  </label>
                  <input
                    type="password"
                    className="from-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="checkbox mb-4">
                  <label>
                    <input
                      type="checkbox"
                      value=""
                      className="mr-2"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary mt-[10px]">
                  <span className="glyphicon glyphicon-off mr-2"></span> Login
                </button>
              </form>
            </div>

            <div className="modal-footer bg-gray-100 p-4 text-center text-black">
              <button
                type="button"
                className="btn btn-primary mt-[10px]"
                onClick={onClose}
              >
                <span className="glyphicon glyphicon-remove mr-2"></span> Cancel
              </button>
              <p className="mt-3">
                Not a member?{" "}
                <a
                  href="#"
                  onClick={handleSignUpClick}
                  className="text-[#ff7e84]"
                >
                  Sign Up
                </a>
              </p>
              <p>
                Forgot{" "}
                <a href="#" className="text-[#ff7e84]">
                  Password?
                </a>
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
