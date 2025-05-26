import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const useUpdatePass = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_PORT_URL;
  const { token } = useAuthStore.getState();

  const updatePassword = async (
    old_password,
    new_password,
    new_password_confirmation
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/change_password`,
        {
          old_password,
          new_password,
          new_password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePassword,
    loading,
    error,
    success,
  };
};

export default useUpdatePass;
