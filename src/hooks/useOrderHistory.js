import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchOrderHistory = async () => {
  const { token } = useAuthStore.getState();
  const { data } = await axios.get(`${API_URL}/order_history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useFetchOrderHistory = () => {
  const token = useAuthStore.getState().token;

  const query = useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => fetchOrderHistory(),
    enabled: !!token,
    retry: false,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};
