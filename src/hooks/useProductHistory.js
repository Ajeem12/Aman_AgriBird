import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchProductHistory = async (orderId) => {
  const { token } = useAuthStore.getState();

  const { data } = await axios.get(`${API_URL}/product_history/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useFetchProductHistory = (orderId) => {
  const token = useAuthStore.getState().token;

  const query = useQuery({
    queryKey: ["productHistory", orderId],
    queryFn: () => fetchProductHistory(orderId),
    enabled: !!token && !!orderId,
    retry: false,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};
