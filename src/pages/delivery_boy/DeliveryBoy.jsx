import React from "react";
import { useDeliveryBoyOrders } from "../../hooks/delivery-boy/useDeliveryBoyOrder";
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

const DeliveryBoy = () => {
  const { data, isLoading, error } = useDeliveryBoyOrders(true);

  if (isLoading)
    return (
      <p className="text-center text-lg text-gray-600">Loading orders...</p>
    );
  if (error)
    return <p className="text-center text-red-500">Failed to load orders.</p>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-800">
        Orders
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {data?.orders?.map((order) => {
          const status = getStatusLabel(order.order_status);
          const hashId = hashids.encode(order.id);

          return (
            <Link
              to={`/vendor/delivery-order/${hashId}`}
              key={order.id}
              className="bg-white rounded-2xl shadow-md border hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-blue-700">
                  {order.order_no}
                </h2>
                <span
                  className={`text-xs sm:text-sm px-3 py-1 rounded-full font-semibold ${status.color}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="text-gray-700 text-sm space-y-1 leading-6">
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

export default DeliveryBoy;
