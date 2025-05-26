import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchNewArrival = async () => {
  const { data } = await axios.get(`${API_URL}/new_arrival_products`);
  return data;
};

export const useNewArrival = () =>
  useQuery({
    queryKey: ["newarrival"],
    queryFn: fetchNewArrival,
    retry: false,
  });
