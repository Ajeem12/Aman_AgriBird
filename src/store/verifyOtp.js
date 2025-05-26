import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../util/api";
import { useCartStore } from "./cartStore";
import { useAuthStore } from "./authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const useVerifyOtpStore = create(
  persist(
    (set) => ({
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

          useAuthStore.setState({
            token,
            user,
            isAuthenticated: true,
          });

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
    }),
    {
      name: "verify-otp-storage",
    }
  )
);

export default useVerifyOtpStore;
