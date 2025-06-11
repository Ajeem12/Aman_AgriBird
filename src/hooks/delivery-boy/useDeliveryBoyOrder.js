import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchDeliveryBoyOrder = async () => {
  const token = useAuthStore.getState().token;

  const response = await axios.get(`${API_URL}/orders_delivery_boy`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// React Query Hook
export const useDeliveryBoyOrders = () => {
  return useQuery({
    queryKey: ["delivery-boy-order"],
    queryFn: fetchDeliveryBoyOrder,
  });
};
