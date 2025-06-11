import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

const API_URL = import.meta.env.VITE_PORT_URL;

export const useAddCart = () => {
  const token = useAuthStore.getState().token;
  const queryClient = useQueryClient();
  const setCart = useCartStore.setState;

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(`${API_URL}/add_to_cart`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data?.data?.cartsdata;
    },
    onSuccess: (serverCart) => {
      // Overwrite local cart with server cart
      setCart({ cart: serverCart });
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Failed to add to cart:", error);
    },
  });
};
