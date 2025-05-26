import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchProductDetails = async ({ queryKey }) => {
  const [_key, productId] = queryKey;

  if (!productId) throw new Error("Invalid product ID");

  const { data } = await axios.get(`${API_URL}/product_details/${productId}`);

  if (!data || typeof data !== "object" || !data.id) {
    throw new Error("Invalid product data");
  }

  return data;
};

export const useProductDetails = (productId) => {
  return useQuery({
    queryKey: ["product_details", productId],
    queryFn: fetchProductDetails,
    enabled: !!productId,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
