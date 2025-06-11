import React from "react";
import { useVendorOrders } from "../../hooks/vendor/useVenderOrders";
import { Link } from "react-router-dom";
import hashids from "../../util/hashids";

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

const VendorOrders = () => {
  const { data, isLoading, error } = useVendorOrders(true);

  if (isLoading)
    return (
      <p className="text-center text-lg text-gray-600">Loading orders...</p>
    );
  if (error)
    return <p className="text-center text-red-500">Failed to load orders.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Vendor Orders
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((order, index) => {
          const status = getStatusLabel(order.order_status);
          const hashId = hashids.encode(order.id);

          return (
            <Link
              to={`/vendor/vendor-order/${hashId}`}
              key={index}
              className="bg-white rounded-2xl shadow-lg border hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between hover:bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-700">
                  #{order.order_no}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${status.color}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="text-gray-700 text-sm space-y-1">
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {order.customer_name}
                </p>
                <p>
                  <span className="font-medium">Contact:</span>{" "}
                  {order.customer_contact}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {order.address}
                </p>
                <p>
                  <span className="font-medium">Pincode:</span> {order.pincode}
                </p>
                <p>
                  <span className="font-medium">Order Date:</span>{" "}
                  {order.order_date}
                </p>
                <p>
                  <span className="font-medium">Final Amount:</span> ₹
                  {order.final_amount}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VendorOrders;
