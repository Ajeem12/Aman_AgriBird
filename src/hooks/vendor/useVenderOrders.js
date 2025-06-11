import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchVendorOrder = async () => {
  const token = useAuthStore.getState().token;

  const response = await axios.get(`${API_URL}/orders_vendor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// React Query Hook
export const useVendorOrders = () => {
  return useQuery({
    queryKey: ["vendor-order"],
    queryFn: fetchVendorOrder,
  });
};
