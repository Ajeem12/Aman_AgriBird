import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { LogOut } from "lucide-react";

const VendoreNav = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate("/vendor-login");
  };

  // Determine role-based home route
  const homeRoute = user?.role === 2 ? "/vendor" : "/vendor/delivery-boy";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Role-based Logo Link */}
        <Link to={homeRoute} className="flex items-center gap-2">
          <img src="/img/logo.jpeg" alt="Logo" className="h-[42px] md:h-20" />
        </Link>

        {/* Right-side Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 text-red-600 transition"
          >
            <LogOut size={18} />
            <span className="text-sm md:text-base">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default VendoreNav;
