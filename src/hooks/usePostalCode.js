import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_PORT_URL;

const fetchPostalCode = async ({ queryKey }) => {
  const [, pincode] = queryKey;
  const { data } = await axios.post(`${API_URL}/pincode_confir`, { pincode });
  return data;
};

export const usePostalCode = (pincode) =>
  useQuery({
    queryKey: ["postalCode", pincode],
    queryFn: fetchPostalCode,
    enabled: !!pincode,
    retry: false,
    refetchOnWindowFocus: false,
  });
