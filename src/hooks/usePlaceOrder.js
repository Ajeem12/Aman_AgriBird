import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const usePlaceOrder = () => {
  const token = useAuthStore((state) => state.token);
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const placeOrder = async ({ address, valid_coupan, product, addressId }) => {
    setIsPlacing(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/place_order`,
        {
          address,
          valid_coupan,
          product,
          addressId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to place order.";
      setError(message);
      throw new Error(message);
    } finally {
      setIsPlacing(false);
    }
  };

  return {
    placeOrder,
    isPlacing,
    error,
    response,
  };
};

export default usePlaceOrder;
