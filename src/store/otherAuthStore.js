// import { create } from "zustand";
// import api from "../util/api";

// const API_URL = import.meta.env.VITE_PORT_URL;

// export const useOtherAuthStore = create((set) => ({
//   otherToken: null,
//   otherUser: null,
//   isOtherAuthenticated: false,
//   error: null,
//   isLoading: false,

//   otherLogin: async (mobile) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await api.post(`${API_URL}/otherlogin`, {
//         mobile, // Only mobile is sent
//       });

//       const { token, name, role } = response.data.data;

//       set({
//         otherToken: token,
//         otherUser: { name, role },
//         isOtherAuthenticated: true,
//         isLoading: false,
//       });

//       return { success: true };
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error.response?.data?.message || "Login failed",
//       });
//       return { success: false, error: error.message };
//     }
//   },

//   otherLogout: () =>
//     set({
//       otherToken: null,
//       otherUser: null,
//       isOtherAuthenticated: false,
//     }),
// }));

import { create } from "zustand";
import api from "../util/api";

const API_URL = import.meta.env.VITE_PORT_URL;

export const useOtherAuthStore = create((set) => ({
  otherToken: null,
  otherUser: null,
  isOtherAuthenticated: false,
  isLoading: false,
  error: null,

  sendOtp: async (mobile) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post(`${API_URL}/otherlogin`, { mobile });
      set({ isLoading: false });
      return { success: true };
    } catch (err) {
      set({
        isLoading: false,
        error: err?.response?.data?.message || "Failed to send OTP",
      });
      return { success: false, error: err?.message };
    }
  },
}));
