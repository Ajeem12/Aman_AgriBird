import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

const updateUserProfile = async ({ firstname, lastname, email, token }) => {
  const payload = { firstname, lastname, email };

  const { data } = await axios.post(`${API_URL}/update_profile`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useUpdateUserProfile = () => {
  const token = useAuthStore.getState().token;

  return useMutation({
    mutationFn: (variables) => updateUserProfile({ ...variables, token }),
  });
};
