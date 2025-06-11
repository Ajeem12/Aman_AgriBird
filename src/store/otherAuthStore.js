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
