import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchCities = async () => {
  const { data } = await axios.get(`${API_URL}/cities`);
  return data;
};

export const useCity = () =>
  useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    // retry: false,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
