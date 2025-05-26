import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const useCoupon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponResponse, setCouponResponse] = useState(null);

  const token = useAuthStore((state) => state.token);

  const applyCoupon = async (couponCode) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/apply_coupan`, {
        params: { coupon: couponCode },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCouponResponse(response.data);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to apply coupon.";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    applyCoupon,
    isLoading,
    error,
    couponResponse,
  };
};

export default useCoupon;
