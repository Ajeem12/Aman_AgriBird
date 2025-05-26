import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "./authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

export const useRemoveCartItem = () => {
  const token = useAuthStore.getState().token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product_id) => {
      const { data } = await axios.post(
        `${API_URL}/remove_to_cart/${product_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Failed to remove cart item:", error);
    },
  });
};
