import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useOtherAuthStore } from "../../store/otherAuthStore";
import useVerifyOtpStore from "../../store/verifyOtp";
import { useNavigate } from "react-router-dom";

const VBLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const sendOtp = useOtherAuthStore((state) => state.sendOtp);
  const { verifyOtp } = useVerifyOtpStore();

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    const res = await sendOtp(mobile);
    if (res.success) {
      toast.success("OTP sent to your mobile.");
      setStep("otp");
    } else {
      toast.error(res.error || "Failed to send OTP");
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (!/^\d{4}$/.test(enteredOtp)) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    const res = await verifyOtp(mobile, enteredOtp);
    if (res.success) {
      toast.success("Login successful!");
      navigate("/vendor");
      setMobile("");
      setOtp(["", "", "", ""]);
      setStep("mobile");
    } else {
      toast.error(res.error || "OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Login</h2>

      {step === "mobile" ? (
        <form onSubmit={handleMobileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter 10-digit number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default VBLogin;
