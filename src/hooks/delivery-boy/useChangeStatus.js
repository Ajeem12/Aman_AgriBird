import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const changeStatus = async ({ order_id, status }) => {
  const token = useAuthStore.getState().token;
  const response = await axios.post(
    `${API_URL}/order_per_details_approve_delivery`,
    { order_id, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// React Query Mutation Hook
export const useChangeStatus = () => {
  return useMutation({
    mutationFn: changeStatus,
  });
};
