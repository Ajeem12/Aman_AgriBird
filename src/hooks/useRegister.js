import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const registerUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_PORT_URL}/register`,
    userData
  );
  return data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
