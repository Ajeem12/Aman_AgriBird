// import { create } from "zustand";

// export const useModalStore = create((set) => ({
//   showLoginModal: false,
//   showRegisterModal: false,
//   openLoginModal: () => set({ showLoginModal: true }),
//   closeLoginModal: () => set({ showLoginModal: false }),
//   openRegisterModal: () => set({ showRegisterModal: true }),
//   closeRegisterModal: () => set({ showRegisterModal: false }),
// }));

import { create } from "zustand";

export const useModalStore = create((set) => ({
  showLoginModal: false,
  showRegisterModal: false,
  showPincodeModal: false,

  openLoginModal: () => set({ showLoginModal: true }),
  closeLoginModal: () => set({ showLoginModal: false }),

  openRegisterModal: () => set({ showRegisterModal: true }),
  closeRegisterModal: () => set({ showRegisterModal: false }),

  openPincodeModal: () => set({ showPincodeModal: true }),
  closePincodeModal: () => set({ showPincodeModal: false }),
}));
