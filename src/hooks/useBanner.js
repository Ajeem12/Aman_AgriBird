import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchBanners = async () => {
  const { data } = await axios.get(`${API_URL}/banners`);
  return data;
};

export const useBanner = () =>
  useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
