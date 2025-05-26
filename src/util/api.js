import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_PORT_URL,
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token might be expired
      const logout = useAuthStore.getState().logout;
      logout();

      // Optionally show login modal or redirect
      // e.g., useModalStore.getState().openLoginModal();

      return Promise.reject({
        ...error,
        customMessage: "Session expired. Please log in again.",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
