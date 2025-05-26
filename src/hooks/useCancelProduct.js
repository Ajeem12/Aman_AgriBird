// src/api/useCancelProduct.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

// Function to call the cancel order API
const cancelProduct = async ([productId, reason]) => {
  const { token } = useAuthStore.getState();

  const { data } = await axios.post(
    `${API_URL}/order_pr_cancel/${productId}`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useCancelProduct = () => {
  return useMutation({
    mutationFn: cancelProduct,
    onSuccess: (data) => {
      console.log("Produt cancelled successfully", data);
    },
    onError: (error) => {
      console.error("Error cancelling product", error);
    },
  });
};
