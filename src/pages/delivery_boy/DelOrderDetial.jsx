import React from "react";
import { useParams } from "react-router-dom";
import { useDelOrderDetails } from "../../hooks/delivery-boy/useDelOrderDetail";
import { useChangeStatus } from "../../hooks/delivery-boy/useChangeStatus";
import hashids from "../../util/hashids";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const getStatusLabel = (order_status) => {
  switch (order_status) {
    case 0:
      return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
    case 1:
      return { label: "Order Processed", color: "bg-blue-100 text-blue-800" };
    case 2:
      return {
        label: "Out for Delivery",
        color: "bg-purple-100 text-purple-800",
      };
    case 3:
      return { label: "Delivered", color: "bg-green-100 text-green-800" };
    case 4:
      return { label: "Cancelled", color: "bg-red-100 text-red-800" };
    default:
      return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
  }
};

const statusOptions = [
  { value: 0, label: "Pending" },
  { value: 1, label: "Order Processed" },
  { value: 2, label: "Out for Delivery" },
  { value: 3, label: "Delivered" },
];

const DelOrderDetails = () => {
  const { id } = useParams();
  const decoded = hashids.decode(id);
  const orderId = decoded[0];

  const { data, isLoading, error, refetch } = useDelOrderDetails(orderId);
  const { mutate, isLoading: isUpdating } = useChangeStatus();

  const handleStatusChange = (e) => {
    const newStatus = parseInt(e.target.value);
    mutate(
      { order_id: orderId, status: newStatus },
      {
        onSuccess: () => {
          toast.success("Order status updated successfully!");
          refetch();
        },
        onError: () => {
          toast.error("Failed to update order status.");
        },
      }
    );
  };

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
  const currentStatus = getStatusLabel(order.order_status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white border rounded-xl space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
        Order #{order.order_no}
      </h2>

      {/* Order Status Display & Dropdown */}
      <div className="text-center space-y-2">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color}`}
        >
          {currentStatus.label}
        </span>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Change Status:
          </label>
          <select
            value={order.order_status}
            onChange={(e) => handleStatusChange(e, order.id)}
            disabled={isUpdating}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.value === 0 || opt.value === 1 || opt.value === 2}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

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
            <strong>Vendor OTP:</strong> {order.vendor_otp || ""}
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
            <strong>Email:</strong> {order.user_details?.email || ""}
          </p>
          <p>
            <strong>Mobile:</strong> {order.user_details?.mobile || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DelOrderDetails;
