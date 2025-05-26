// src/hooks/useBecomeSeller.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const becomeSeller = async (sellerData) => {
  const { token } = useAuthStore.getState();
  const { data } = await axios.post(
    `${import.meta.env.VITE_PORT_URL}/become_seller`,
    sellerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useBecomeSeller = () => {
  return useMutation({
    mutationFn: becomeSeller,
  });
};
