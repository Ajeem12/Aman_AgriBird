import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchHomeProducts = async () => {
  const { data } = await axios.get(`${API_URL}/home_page_cat_product`);
  return data;
};

export const useHomeProducts = () =>
  useQuery({
    queryKey: ["homeproducts"],
    queryFn: fetchHomeProducts,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
