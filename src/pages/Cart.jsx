import React, { useEffect } from "react";
import { Add, Remove, Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useModalStore } from "../store/uiStore";
import Rating from "@mui/material/Rating";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    addToCart,
    decreaseQuantity,
    fetchCartFromServer,
    isLoading,
    error,
  } = useCartStore();

  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartFromServer();
  }, [fetchCartFromServer]);

  const handleNavigate = () => {
    if (isAuthenticated) {
      navigate("/order");
    } else {
      openLoginModal();
    }
  };

  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.price || item.product_price || 0) *
        (item.quantity || item.qty || 1),
    0
  );

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 min-h-screen flex items-center justify-center">
        Loading your cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 min-h-screen flex items-center justify-center">
        Failed to load your cart. Please try again later.
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12  ">
        <img
          src="/img/shopping-cart.gif"
          alt="No Data"
          className="w-40 h-40 mb-6 animate-bounce"
        />
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
          Your cart is empty.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-2">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          YOUR BAG
        </h1>

        {/* Top Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <Link to={"/"}>
            <button className="px-6 py-3 border-2 border-gray-800 font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-md">
              CONTINUE SHOPPING
            </button>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 underline mr-3">
            <span className="cursor-pointer hover:text-gray-800">
              Shopping Bag ({cart.length})
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Info */}
          <div className="flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6"
              >
                {/* Left: Image + Info */}
                <div className="relative flex items-start gap-4">
                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${import.meta.env.VITE_MEDIA_URL}/products/${
                            item.image || "/img/Noimages.png"
                          }`
                    }
                    alt={item.product_name || item.name || "Product"}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                  />

                  {/* Product details beside the image */}
                  <div className="text-sm sm:text-base">
                    {/* Product name at top-right over the image */}
                    <div className="top-0 left-24 sm:left-28 text-gray-800 font-semibold text-xs md:text-lg ">
                      {item.product_name || item.name}
                    </div>

                    {/* Display Category Name and Rating */}
                    <p className="text-gray-600  hidden sm:block">
                      {item.product_details?.category_details?.category_name ||
                        ""}
                    </p>

                    {item.product_details?.rating ? (
                      <div className="flex items-center mt-6">
                        <Rating
                          value={item.product_details.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 sm:mt-1 text-sm text-gray-400 italic ">
                        No rating
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Quantity + Price */}
                <div className="flex flex-col items-center justify-center text-right">
                  <div className="flex items-center mb-2">
                    <Remove
                      className="cursor-pointer text-gray-700 hover:text-gray-900"
                      onClick={() => {
                        if ((item.qty || item.quantity) > 1) {
                          decreaseQuantity(item.id);
                        }
                      }}
                    />
                    <span className="mx-2 text-base sm:text-lg font-medium">
                      {item.quantity || item.qty || 1}
                    </span>
                    <Add
                      className="cursor-pointer text-gray-700 hover:text-gray-900"
                      onClick={() => addToCart(item, 1)}
                    />
                  </div>
                  <div className="test-base sm:text-lg font-semibold text-gray-800 mb-1">
                    ₹
                    {Number(item.product_price || item.price || 0) *
                      (item.quantity || item.qty || 1)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product_id || item.id)}
                    className="flex items-center text-sm text-red-500 hover:text-red-700 transition"
                  >
                    <Delete fontSize="small" className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ORDER SUMMARY
            </h2>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span>₹ {subtotal}</span>
            </div>
            <button
              onClick={handleNavigate}
              className="w-full py-3 bg-gray-800 text-white font-bold hover:bg-gray-700 transition-all duration-300 rounded-md"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
