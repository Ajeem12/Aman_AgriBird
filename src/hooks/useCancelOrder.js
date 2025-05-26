import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

// Function to call the cancel order API
const cancelOrder = async ({ orderId, reason }) => {
  const { token } = useAuthStore.getState();

  const { data } = await axios.post(
    `${API_URL}/order_cancel/${orderId}`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useCancelOrder = () => {
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (data) => {
      console.log("Order cancelled successfully", data);
    },
    onError: (error) => {
      console.error("Error cancelling order", error);
    },
  });
};
