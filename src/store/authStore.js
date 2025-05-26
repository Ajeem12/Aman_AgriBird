import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./cartStore";
import api from "../util/api";

const API_URL = import.meta.env.VITE_PORT_URL;

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (mobile, password, email, fname, lname) => {
        try {
          const res = await api.post(`${API_URL}/register`, {
            mobile,
            password,
            email,
            fname,
            lname,
          });

          return { success: true };
        } catch (error) {
          console.error("Login failed:", error);
          return {
            success: false,
            error: error.response?.data?.message || "Login error",
          };
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        useCartStore.setState({ cart: [], buyNowProduct: null });
      },

      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "auth-storage",
    }
  )
);
