import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocationStore = create(
  persist(
    (set) => ({
      city: null,
      pincode: null,
      setCity: (city) => set({ city }),
      setPincode: (pincode) => set({ pincode }),
      clearLocation: () => set({ city: null, pincode: null }),
    }),
    {
      name: "user-location", // key in localStorage
    }
  )
);

export default useLocationStore;
