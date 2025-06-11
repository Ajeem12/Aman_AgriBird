// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import api from "../util/api";
// import { useCartStore } from "./cartStore";
// import { useAuthStore } from "./authStore";

// const API_URL = import.meta.env.VITE_PORT_URL;

// const useVerifyOtpStore = create(
//   persist(
//     (set) => ({
//       mobile: "",
//       otp: "",
//       isLoading: false,
//       error: null,

//       setMobile: (mobile) => set({ mobile }),
//       setOtp: (otp) => set({ otp }),

//       verifyOtp: async (mobile, otp, localCart = []) => {
//         set({ isLoading: true, error: null });
//         try {
//           const response = await api.post(`${API_URL}/verifyOtp`, {
//             mobile,
//             otp,
//             cart: localCart.map((item) => ({
//               ...item,
//               quantity: item.qty,
//             })),
//           });

//           const { token, name, role, cartsdata } = response.data.data;
//           const user = { name, role };

//           useAuthStore.setState({
//             token,
//             user,
//             isAuthenticated: true,
//           });

//           if (Array.isArray(cartsdata)) {
//             useCartStore.setState({ cart: cartsdata });
//           }

//           set({ isLoading: false });
//           return { success: true };
//         } catch (error) {
//           set({
//             isLoading: false,
//             error: error.response?.data?.message || error.message,
//           });
//           return { success: false, error: error.message };
//         }
//       },
//     }),
//     {
//       name: "verify-otp-storage",
//     }
//   )
// );

// export default useVerifyOtpStore;

// import { create } from "zustand";
// import api from "../util/api";
// import { useCartStore } from "./cartStore";
// import { useAuthStore } from "./authStore";

// const API_URL = import.meta.env.VITE_PORT_URL;

// const useVerifyOtpStore = create((set) => ({
//   mobile: "",
//   otp: "",
//   isLoading: false,
//   error: null,

//   setMobile: (mobile) => set({ mobile }),
//   setOtp: (otp) => set({ otp }),

//   verifyOtp: async (mobile, otp, localCart = []) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await api.post(`${API_URL}/verifyOtp`, {
//         mobile,
//         otp,
//         cart: localCart.map((item) => ({
//           ...item,
//           quantity: item.qty,
//         })),
//       });

//       const { token, name, role, cartsdata } = response.data.data;
//       const user = { name, role };

//       useAuthStore.setState({
//         token,
//         user,
//         isAuthenticated: true,
//       });

//       if (Array.isArray(cartsdata)) {
//         useCartStore.setState({ cart: cartsdata });
//       }

//       set({ isLoading: false });
//       return { success: true };
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || error.message,
//       });
//       return { success: false, error: error.message };
//     }
//   },
// }));

// export default useVerifyOtpStore;

import { create } from "zustand";
import api from "../util/api";
import { useCartStore } from "./cartStore";
import { useAuthStore } from "./authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const useVerifyOtpStore = create((set) => ({
  mobile: "",
  otp: "",
  isLoading: false,
  error: null,

  setMobile: (mobile) => set({ mobile }),
  setOtp: (otp) => set({ otp }),

  verifyOtp: async (mobile, otp, localCart = []) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post(`${API_URL}/verifyOtp`, {
        mobile,
        otp,
        cart: localCart.map((item) => ({
          ...item,
          quantity: item.qty,
        })),
      });

      const { token, name, role, cartsdata } = response.data.data;
      const user = { name, role };

      const expiry = Date.now() + 24 * 60 * 60 * 1000; // 1 day

      useAuthStore.setState({
        token,
        tokenExpiry: expiry,
        user,
        isAuthenticated: true,
      });

      // Auto logout after 1 day
      setTimeout(() => {
        const currentState = useAuthStore.getState();
        if (
          currentState.tokenExpiry &&
          Date.now() >= currentState.tokenExpiry
        ) {
          useAuthStore.setState({
            token: null,
            tokenExpiry: null,
            user: null,
            isAuthenticated: false,
          });
        }
      }, 24 * 60 * 60 * 1000); // 1 day

      if (Array.isArray(cartsdata)) {
        useCartStore.setState({ cart: cartsdata });
      }

      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message,
      });
      return { success: false, error: error.message };
    }
  },
}));

export default useVerifyOtpStore;
