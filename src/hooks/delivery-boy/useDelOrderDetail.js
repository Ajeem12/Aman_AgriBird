import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchDelOrderDetails = async (orderId) => {
  const token = useAuthStore.getState().token;
  const response = await axios.get(
    `${API_URL}/orders_det_delivery_boy/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useDelOrderDetails = (orderId, enabled = true) => {
  return useQuery({
    queryKey: ["del-order-details", orderId],
    queryFn: () => fetchDelOrderDetails(orderId),
    enabled: !!orderId && enabled,
  });
};
