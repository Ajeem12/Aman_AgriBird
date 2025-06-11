// import React, { useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useOtherAuthStore } from "../../store/otherAuthStore";
// import useVerifyOtpStore from "../../store/verifyOtp";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";

// const VBLogin = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState("mobile");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputRefs = useRef([]);

//   const user = useAuthStore((state) => state.user);
//   // console.log(user.role);

//   const sendOtp = useOtherAuthStore((state) => state.sendOtp);
//   const { verifyOtp } = useVerifyOtpStore();

//   const handleMobileSubmit = async (e) => {
//     e.preventDefault();
//     if (!/^\d{10}$/.test(mobile)) {
//       toast.error("Please enter a valid 10-digit mobile number.");
//       return;
//     }

//     const res = await sendOtp(mobile);
//     if (res.success) {
//       toast.success("OTP sent to your mobile.");
//       setStep("otp");
//     } else {
//       toast.error(res.error || "Failed to send OTP");
//     }
//   };

//   const handleOtpChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();

//     const enteredOtp = otp.join("");
//     if (!/^\d{4}$/.test(enteredOtp)) {
//       toast.error("Please enter a valid 4-digit OTP.");
//       return;
//     }

//     const res = await verifyOtp(mobile, enteredOtp);

//     if (res.success) {
//       toast.success("Login successful!");

//       // Clear form fields
//       setMobile("");
//       setOtp(["", "", "", ""]);
//       setStep("mobile");

//       setTimeout(() => {
//         const { user } = useAuthStore.getState();
//         if (user?.role === 2) {
//           navigate("/vendor");
//         } else {
//           navigate("/vendor/delivery-boy");
//         }
//       }, 300); // 300ms delay to ensure store is updated
//     } else {
//       toast.error(res.error || "OTP verification failed");
//     }
//   };

//   return (
//     <div className="max-w-sm   sm:max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//       {step === "mobile" ? (
//         <form onSubmit={handleMobileSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Mobile Number
//             </label>
//             <input
//               type="tel"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               placeholder="Enter 10-digit number"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Send OTP
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleOtpSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-1">Enter OTP</label>
//             <div className="flex justify-between gap-3">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(e.target.value, index)}
//                   onKeyDown={(e) => handleOtpKeyDown(e, index)}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ))}
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//           >
//             Verify OTP
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default VBLogin;

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useOtherAuthStore } from "../../store/otherAuthStore";
import useVerifyOtpStore from "../../store/verifyOtp";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const VBLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const user = useAuthStore((state) => state.user);
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
      setMobile("");
      setOtp(["", "", "", ""]);
      setStep("mobile");

      setTimeout(() => {
        const { user } = useAuthStore.getState();
        if (user?.role === 2) {
          navigate("/vendor");
        } else {
          navigate("/vendor/delivery-boy");
        }
      }, 500);
    } else {
      toast.error(res.error || "OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 transition-all">
          {step === "mobile" ? "Welcome!" : "Enter OTP"}
        </h2>

        {step === "mobile" ? (
          <form onSubmit={handleMobileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter 10-digit number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Verify OTP
            </button>
            <p className="text-sm text-center text-gray-500">
              Entered wrong number?{" "}
              <span
                onClick={() => {
                  setStep("mobile");
                  setOtp(["", "", "", ""]);
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Change number
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default VBLogin;
