import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import useVerifyOtpStore from "../store/verifyOtp";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import { useModalStore } from "../store/uiStore";

const Login = ({ onClose }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const { cart } = useCartStore.getState();
  const verifyOtp = useVerifyOtpStore((state) => state.verifyOtp);

  const openRegisterModal = useModalStore((state) => state.openRegisterModal);

  const handleMobileSubmit = async (e) => {
    e.preventDefault();

    if (!mobile) {
      return toast("Please enter your mobile number");
    }

    setLoading(true);

    const result = await login(mobile, null, null, null, null, cart);

    setLoading(false);

    if (result.success) {
      toast.success("OTP sent successfully");
      setStep(2);
    } else {
      toast.error(result.error || "Failed to send OTP");
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      return toast("Please enter all OTP digits");
    }

    setLoading(true);

    const otpCode = otp.join("");
    const result = await verifyOtp(mobile, otpCode, cart);

    setLoading(false);

    if (result.success) {
      toast.success("Login successful");
      onClose();
    } else {
      toast.error(result.error || "OTP verification failed");
    }
  };

  const handleRegisterClick = () => {
    onClose();
    openRegisterModal();
  };

  return (
    <div className="w-full h-[70vh] flex items-center justify-center px-2 relative">
      <div className="w-full sm:mt-20 sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 md:p-10 bg-neutral-200 bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl mx-4 sm:mx-auto relative">
        {/* Close Button */}
        {onClose ? (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
          >
            <CloseIcon />
          </button>
        ) : null}

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#5e6b50] mb-4 sm:mb-6">
          {step === 1 ? "Welcome Back!" : "Verify OTP"}
        </h1>
        <p className="text-center text-gray-600 mb-4 sm:mb-6">
          {step === 1
            ? "Please enter your mobile number to continue"
            : "Enter the OTP sent to your mobile"}
        </p>

        {step === 1 ? (
          // Step 1: Mobile Input
          <form className="flex flex-col" onSubmit={handleMobileSubmit}>
            <input
              id="mobile"
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mb-3 sm:mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 text-gray-700 placeholder-gray-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold rounded-md hover:from-teal-600 hover:to-teal-800 transform hover:scale-105 transition duration-300 mb-3 sm:mb-4"
            >
              {loading ? "Sending OTP..." : "SEND OTP"}
            </button>
          </form>
        ) : (
          // Step 2: OTP Verification
          <form className="flex flex-col" onSubmit={handleOtpSubmit}>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold rounded-md hover:from-teal-600 hover:to-teal-800 transform hover:scale-105 transition duration-300 mb-3 sm:mb-4"
            >
              {loading ? "Verifying OTP..." : "VERIFY OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
