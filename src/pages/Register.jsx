import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

const Register = ({ onClose }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart } = useCartStore.getState();

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fname ||
      !lname ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const result = await login(mobile, password, email, fname, lname, cart);

    setLoading(false);

    if (result.success) {
      toast.success("Rgistration successful");
      onClose();
    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-2 py-6">
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl p-4 sm:p-6 md:p-8 bg-neutral-200 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition"
        >
          <CloseIcon />
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#5e6b50] text-center mb-4 sm:mb-6">
          CREATE AN ACCOUNT
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4"
        >
          <input
            name="fname"
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            className="w-full sm:w-[48%] px-4 py-2 sm:py-3 border border-gray-300 rounded-md outline-none"
          />
          <input
            name="lname"
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            className="w-full sm:w-[48%] px-4 py-2 sm:py-3 border border-gray-300 rounded-md outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-[48%] px-4 py-2 sm:py-3 border border-gray-300 rounded-md outline-none"
          />
          <input
            name="mobile"
            type="text"
            placeholder="Contact No."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full sm:w-[48%] px-4 py-2 sm:py-3 border border-gray-300 rounded-md outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full sm:w-[48%] px-4 py-2 sm:py-3 border border-gray-300 rounded-md outline-none"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full sm:w-[48%] px-4 py-2 sm:py-3 border border-gray-300 rounded-md outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 sm:mt-4 py-2 sm:py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-800 hover:scale-105 transition-all duration-300"
          >
            {loading ? "Creating Account..." : "CREATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
