import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchCategorieProduct = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  try {
    const { data } = await axios.get(
      `${API_URL}/category_wise_product_sub/${id}`
    );
    if (!data || !data.product || !data.subcat) {
      throw new Error("Invalid API response structure");
    }
    return data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};
export const useCategorieProduct = (id) => {
  if (!id) {
    console.warn("Category ID is missing or invalid");
    return { data: null, isLoading: false, error: "Invalid category ID" };
  }
  return useQuery({
    queryKey: ["category_product", id],
    queryFn: fetchCategorieProduct,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
