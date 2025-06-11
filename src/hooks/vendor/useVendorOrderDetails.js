import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchVendorOrderDetails = async (orderId) => {
  const token = useAuthStore.getState().token;
  const response = await axios.get(`${API_URL}/orders_det_vendor/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useVendorOrderDetails = (orderId, enabled = true) => {
  return useQuery({
    queryKey: ["vendor-order-details", orderId],
    queryFn: () => fetchVendorOrderDetails(orderId),
    enabled: !!orderId && enabled,
  });
};
