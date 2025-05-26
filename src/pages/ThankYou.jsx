import React from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <CheckCircleIcon
          fontSize="large"
          className="text-green-500 mb-4"
          style={{ fontSize: "4rem" }}
        />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. We appreciate your trust in
          us and will notify you once your items are shipped.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Continue Shopping
        </Link>
        <div className="mt-4">
          <Link
            to="/user/my-order"
            className="text-blue-600 hover:underline text-sm"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
