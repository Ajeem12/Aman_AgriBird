import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_PORT_URL;

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      buyNowProduct: null,

      // Fetch cart data from the server and update the local cart
      fetchCartFromServer: async () => {
        const token = useAuthStore.getState().token;
        try {
          const response = await axios.get(`${API_URL}/cart_details`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const cartData = response.data;
          if (cartData?.data?.cartsdata) {
            set({ cart: cartData.data.cartsdata });
          }
          // console.log("Cart fetched from server:", cartData.data.cartsdata);
        } catch (error) {
          console.error("Failed to fetch cart from server:", error);
        }
      },

      addToCart: (product, qty = 1) => {
        const existing = get().cart.find((item) => item.id === product.id);
        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? { ...item, qty: Number(item.qty) + Number(qty) }
                : item
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, qty: Number(qty) }],
          });
        }
      },
      removeFromCart: async (id) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        const token = useAuthStore.getState().token;

        if (isAuthenticated && token) {
          try {
            await axios.post(
              `${API_URL}/remove_to_cart`,
              { product_id: id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // ✅ Sync local cart with server after successful removal
            await get().fetchCartFromServer();
            return;
          } catch (error) {
            console.error("Failed to remove item from server cart:", error);
            return;
          }
        }

        // For guest/local cart
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      setBuyNowProduct: (product) => {
        set(() => ({
          buyNowProduct: {
            ...product,
            product_id: product.id, // Ensure `product_id` is set
          },
        }));
      },

      clearBuyNowProduct: () => {
        set(() => ({ buyNowProduct: null }));
      },

      // removeFromCart: (id) =>
      //   set({ cart: get().cart.filter((item) => item.id !== id) }),

      decreaseQuantity: (id) => {
        const cart = get().cart.map((item) =>
          item.id === id
            ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
            : item
        );
        set({ cart });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // Persist cart data in local storage
    }
  )
);
