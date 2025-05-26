import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchCategories = async () => {
  const { data } = await axios.get(`${API_URL}/categories`);
  return data;
};

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
