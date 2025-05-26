import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useModalStore } from "../store/uiStore";
import {
  AccountCircle,
  ShoppingBag,
  LocationOn,
  Lock,
  Logout,
} from "@mui/icons-material";
import { useAuthStore } from "../store/authStore";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    const closeLoginModal = useModalStore.getState().closeLoginModal;

    await logout();
    closeLoginModal();
    setTimeout(() => navigate("/"), 0);
  };
  const sections = [
    {
      key: "profile",
      label: "Profile",
      path: "/user",
      icon: <AccountCircle />,
    },
    {
      key: "orders",
      label: "Orders",
      path: "/user/my-order",
      icon: <ShoppingBag />,
    },
    {
      key: "addresses",
      label: "Address",
      path: "/user/address",
      icon: <LocationOn />,
    },
    {
      key: "updatePass",
      label: "Password",
      path: "/user/update-pass",
      icon: <Lock />,
    },
    {
      key: "logout",
      label: "Logout",
      path: "/",
      icon: <Logout />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-20 md:pb-0">
      {/* Header */}

      <div className="max-w-7xl mx-auto sm:px-4 py-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar (Desktop only) */}
        <div className="hidden md:block md:w-1/4 bg-white rounded-xl shadow p-4 h-fit">
          <ul className="space-y-3">
            {sections.map((sec) => {
              const isActive =
                (sec.key === "profile" && location.pathname === "/user") ||
                location.pathname === sec.path ||
                (sec.key === "orders" &&
                  location.pathname.includes("/user/order-detail"));

              return (
                <li
                  key={sec.key}
                  className={`cursor-pointer px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${
                    isActive
                      ? "bg-gray-500 text-white"
                      : "text-gray-700 hover:bg-stone-200"
                  }`}
                  onClick={() =>
                    sec.key === "logout" ? handleLogout() : navigate(sec.path)
                  }
                >
                  {sec.icon}
                  {sec.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4">
          <Outlet />
        </div>
      </div>

      {/* Bottom Navigation (Mobile only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow z-50">
        <div className="flex justify-around items-center py-2">
          {sections.map((sec) => {
            const isActive =
              (sec.key === "profile" && location.pathname === "/user") ||
              location.pathname === sec.path ||
              (sec.key === "orders" &&
                location.pathname.includes("/user/order-detail"));

            return (
              <div
                key={sec.key}
                onClick={() =>
                  sec.key === "logout" ? handleLogout() : navigate(sec.path)
                }
                className={`flex flex-col items-center text-xs cursor-pointer ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {sec.icon}
                <span className="mt-1">{sec.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default User;
