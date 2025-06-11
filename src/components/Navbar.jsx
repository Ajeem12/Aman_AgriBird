import React, { useEffect, useState } from "react";
import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useModalStore } from "../store/uiStore"; // Assuming you have a utility function to open the pincode modal

import Login from "../pages/Login";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import useSearch from "../hooks/useSearch";
import useGetProfile from "../hooks/useGetProfile";
import useLocationStore from "../store/locationStore";

const Navbar = () => {
  const { city, pincode } = useLocationStore();
  const openPincodeModal = useModalStore((state) => state.openPincodeModal);
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, fetchCartFromServer } = useCartStore();
  const { profile } = useGetProfile();

  const { user } = useAuthStore();
  console.log("user", user);

  const { searchProducts } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartFromServer();
  }, [fetchCartFromServer]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // Perform the search
      await searchProducts(searchQuery);

      // Navigate to the SearchResult page with the query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md sm:shadow-none">
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-600 ml-8 md:ml-0">
          <Link to="/" className="block">
            <img
              src="/img/logo.jpeg"
              alt="Whimsy & Wonder"
              className="h-[42px] md:h-20"
            />
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center">
          <form onSubmit={handleSearchSubmit} className="flex w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow px-4 py-2 border border-red-600 rounded-l-full text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-gray-200 px-4 rounded-r-full flex items-center justify-center"
            >
              <Search fontSize="small" />
            </button>
          </form>
        </div>
        <div
          onClick={openPincodeModal}
          className=" flex items-center gap-1 text-gray-700 cursor-pointer"
        >
          <LocationOnOutlinedIcon color="error" />
          <div className="font-medium">
            {city?.label && pincode?.label ? (
              <span>
                {city.label}
                <span className="hidden sm:inline"> - {pincode.label}</span>
              </span>
            ) : (
              <span className="text-gray-400">Select Location</span>
            )}
          </div>
        </div>

        {/* Right Menu: Seller + Account + Cart */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Become a Seller */}
          {/* <Link
            to="/seller-registration"
            className="hidden md:flex items-center gap-2 text-gray-800 px-4 py-2 rounded-full font-medium hover:text-red-500"
          >
            <StorefrontOutlinedIcon fontSize="small" />
            Become a Partner
          </Link> */}

          {/* Desktop Auth/Cart */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
            {!user ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="hover:text-red-500"
              >
                Login
              </button>
            ) : (
              <Link to="/user" className="flex items-center gap-2">
                <AccountCircleOutlinedIcon style={{ fontSize: 30 }} />
                <span>{profile?.first_name}</span>
              </Link>
            )}
            <Link to="/cart" className="hover:text-red-500">
              <Badge badgeContent={cart.length || 0} color="primary">
                <ShoppingCartOutlined style={{ fontSize: 22 }} />
              </Badge>
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setShowSearch((prev) => !prev)}>
              <Search />
            </button>
            <Link to="/user">
              <AccountCircleOutlinedIcon />
            </Link>
            <Link to="/cart">
              <Badge badgeContent={cart.length || 0} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden p-2 bg-white shadow-md z-50">
          <form onSubmit={handleSearchSubmit} className="flex w-full h-10">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-gray-100 px-4 rounded-r-md flex items-center justify-center"
            >
              <Search fontSize="small" />
            </button>
          </form>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Login onClose={() => setShowLoginModal(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
