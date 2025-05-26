import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchReviews = async (productId) => {
  const { data } = await axios.post(`${API_URL}/review_list`, {
    product_id: productId,
  });
  return data;
};

export const useFetchReviews = (productId) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviews(productId),
    enabled: !!productId,
  });
};
