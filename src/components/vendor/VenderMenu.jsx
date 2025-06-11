import React from "react";
import { Link, useLocation } from "react-router-dom";

const VenderMenu = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="max-w-4xl mx-auto px-4 py-2 sticky top-[58px] sm:top-24 z-20 bg-white">
      <nav className="flex space-x-8 justify-center border-b pb-2">
        <Link
          to="/vendor/today-orders"
          className={`text-lg font-medium ${
            isActive("/vendor/today-orders")
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          Today Orders
        </Link>
        <Link
          to="/vendor/all-orders"
          className={`text-lg font-medium ${
            isActive("/vendor/all-orders")
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          All Orders
        </Link>
      </nav>
    </div>
  );
};

export default VenderMenu;
