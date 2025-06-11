import React from "react";
import { useParams } from "react-router-dom";
import { useVendorOrderDetails } from "../../hooks/vendor/useVendorOrderDetails";
import hashids from "../../util/hashids";
import Loader from "../../components/Loader";

const VendorOrderDetails = () => {
  const { id } = useParams();
  const decoded = hashids.decode(id);
  const orderId = decoded[0];

  const { data, isLoading, error } = useVendorOrderDetails(orderId);

  if (isLoading)
    return (
      <div className="text-center py-10">
        <Loader />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load order details.
      </p>
    );

  const order = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white shadow-lg rounded-xl space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
        Order #{order.order_no}
      </h2>

      {/* Customer & Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
        <div>
          <p>
            <strong>Name:</strong> {order.customer_name}
          </p>
          <p>
            <strong>Contact:</strong> {order.customer_contact}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Pincode:</strong> {order.pincode}
          </p>
        </div>
        <div>
          <p>
            <strong>Order Date:</strong> {order.order_date}
          </p>
          <p>
            <strong>Amount:</strong> ₹{order.final_amount}
          </p>
          <p>
            <strong>Delivery Charge:</strong> ₹{order.delivery_charge}
          </p>
          <p>
            <strong>Vendor OTP:</strong> {order.vendor_otp || "N/A"}
          </p>
        </div>
      </div>

      {/* Ordered Products */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Ordered Products
        </h3>
        <div className="space-y-4">
          {order.order_details?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm"
            >
              <img
                src={`${import.meta.env.VITE_MEDIA_URL}/products/${item.image}`}
                alt={item.product_name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border"
              />
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                  {item.product_name}
                </h4>
                <p className="text-sm text-gray-600">
                  Qty: {item.product_qty} | Price: ₹{item.sales_price} <br />
                  <span className="text-red-600">
                    Discount: ₹{item.discount_amount}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Total: ₹{item.total_sales_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Account Info */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          User Account Info
        </h3>
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border text-sm sm:text-base">
          <p>
            <strong>Name:</strong> {order.user_details?.first_name}{" "}
            {order.user_details?.last_name}
          </p>
          <p>
            <strong>Email:</strong> {order.user_details?.email || "N/A"}
          </p>
          <p>
            <strong>Mobile:</strong> {order.user_details?.mobile}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorOrderDetails;
