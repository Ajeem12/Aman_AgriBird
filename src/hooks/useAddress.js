// src/api/useAddress.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

export const useAddress = () => {
  const token = useAuthStore.getState().token;

  const fetchAddress = async () => {
    const { data } = await axios.get(`${API_URL}/get_address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  return useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddress,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!token,
  });
};

export const useAddAddress = () => {
  const token = useAuthStore.getState().token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(`${API_URL}/addaddress`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });
};

export const useDeleteAddress = () => {
  const token = useAuthStore.getState().token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.post(
        `${API_URL}/deleteaddress/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });
};

export const useUpdateAddress = () => {
  const token = useAuthStore.getState().token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axios.post(
        `${API_URL}/updateaddress/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });
};
