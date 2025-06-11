import React, { useEffect, useState } from "react";
import { useFetchOrderHistory } from "../../hooks/useOrderHistory";
import { Link } from "react-router-dom";
import hashids from "../../util/hashids";
import { useCancelOrder } from "../../hooks/useCancelOrder";
// import { useOrderVerificationVendor } from "../../hooks/useOrderVerificationVender";
import Loader from "../../components/Loader";

export default function MyOrders() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchOrderHistory();
  const { mutate: cancelOrder, isLoading: isCanceling } = useCancelOrder();
  // const { mutate: sendOrderVerification } = useOrderVerificationVendor();

  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const handleCancelSubmit = () => {
    if (!cancelingOrderId || !selectedReason) return;
    cancelOrder(
      { orderId: cancelingOrderId, reason: selectedReason },
      {
        onSuccess: () => {
          refetch();
          setCancelingOrderId(null);
          setSelectedReason("");
        },
      }
    );
  };

  // useEffect(() => {
  //   if (orders && Array.isArray(orders)) {
  //     orders.forEach((order) => {
  //       sendOrderVerification({
  //         orderId: order.id,
  //         link: `${window.location.origin}/order/verify/${order.id}`,
  //       });
  //     });
  //   }
  // }, [orders, sendOrderVerification]);

  if (isLoading)
    return (
      <div className="text-center text-gray-600 flex flex-col items-center">
        <Loader />
        <p className="mt-2 text-lg font-medium">
          Loading orders
          <span className="dots" />
        </p>
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-600">
        Failed to load orders: {error?.message}
      </div>
    );
  if (!orders || orders.length === 0)
    return (
      <div className="text-center text-gray-600">
        You have not placed any orders yet.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {orders.map((order) => {
            const hashedOrderId = hashids.encode(order.id);
            const isCancellable = parseInt(order.order_status) === 0;

            return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition"
              >
                <Link to={`/user/order-detail/${hashedOrderId}`}>
                  <div className="flex justify-between items-center p-2 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        Order {order.order_no}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on:{" "}
                        {new Date(order.order_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Address: {order.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        Delivery Charge: ₹{order.delivery_charge}
                      </p>
                      <p className="text-sm text-gray-500">
                        Order Price: ₹{order.products_amount}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        order.order_status === 4
                          ? "bg-green-100 text-green-700"
                          : order.order_status === 3
                          ? "bg-blue-100 text-blue-700"
                          : order.order_status === 2
                          ? "bg-yellow-100 text-yellow-700"
                          : order.order_status === 1
                          ? "bg-orange-100 text-orange-700"
                          : order.order_status === 100
                          ? "bg-orange-100 text-red-700"
                          : order.order_status === 0
                          ? "bg-gray-200 text-gray-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.order_status === 4
                        ? "Delivered"
                        : order.order_status === 3
                        ? "Packed"
                        : order.order_status === 2
                        ? "Procuring"
                        : order.order_status === 1
                        ? "Processing"
                        : order.order_status === 100
                        ? "Canceled"
                        : order.order_status === 0
                        ? "Placed"
                        : "Placed"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600 text-sm mr-2">Total:</span>
                    <span className="font-bold text-gray-800 text-lg">
                      ₹{order.final_amount}
                    </span>
                  </div>
                </Link>

                {/* Cancel button only if status === 0 */}
                {isCancellable && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setCancelingOrderId(order.id)}
                      className="text-sm text-red-600 hover:underline"
                      disabled={isCanceling}
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Cancel Reason */}
      {cancelingOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Please provide a reason for cancelling your order:
            </h2>

            <textarea
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your reason here..."
            />

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setCancelingOrderId(null);
                  setSelectedReason("");
                }}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCancelSubmit}
                disabled={!selectedReason.trim() || isCanceling}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                {isCanceling ? "Cancelling..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
