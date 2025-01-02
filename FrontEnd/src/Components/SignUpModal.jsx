import React, { useState } from "react";
import "../assets/css/custom.css";

const SignUpModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
        body: JSON.stringify({ name, email, password, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
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
              <h4 className="text-2xl font-bold">Sign Up</h4>
            </div>

            <div className="modal-body p-5">
              {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-500">{success}</div>}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-[30px] mt-6">
                <div>
                  <input
                    type="text"
                    className="from-control w-full"
                    placeholder="Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="from-control w-full"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="from-control w-full"
                    placeholder="Phone Number*"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="from-control w-full"
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary mt-[10px] w-full" type="submit">
                  Sign Up
                </button>
              </form>
            </div>

            <div className="modal-footer bg-gray-100 p-4 text-center text-black">
              <button
                type="button"
                className="btn btn-primary mt-[10px]"
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