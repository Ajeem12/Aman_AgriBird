import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const postReview = async ({ product_id, rating, review }) => {
  const { token } = useAuthStore.getState();

  const { data } = await axios.post(
    `${API_URL}/add_review`,
    {
      product_id,
      rating,
      review,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useAddReview = () => {
  return useMutation({
    mutationFn: postReview,
  });
};
