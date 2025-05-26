import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

export const useGetCart = () => {
  const token = useAuthStore.getState().token;

  const fetchCart = async () => {
    const { data } = await axios.get(`${API_URL}/cart_details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    retry: false,
    enabled: !!token,
  });
};
