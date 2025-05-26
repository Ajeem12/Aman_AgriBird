// hooks/useDeleteReview.js
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const useDeleteReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_PORT_URL;
  const { token } = useAuthStore.getState();

  const deleteReview = async ({ product_id, review_id }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/review_delete`,
        {
          product_id,
          review_id,
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
      setError(err.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteReview,
    loading,
    error,
    success,
  };
};

export default useDeleteReview;
