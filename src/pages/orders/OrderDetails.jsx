import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hashids from "../../util/hashids";
import { useFetchProductHistory } from "../../hooks/useProductHistory";
import { useCancelProduct } from "../../hooks/useCancelProduct";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { orderId: encodedOrderId } = useParams();
  const decoded = hashids.decode(encodedOrderId);
  const orderId = decoded.length ? decoded[0] : null;

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchProductHistory(orderId);

  const { mutate: cancelProduct, isLoading: isCanceling } = useCancelProduct();

  const [cancelInfo, setCancelInfo] = useState({
    show: false,
    productId: null,
  });
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    if (orderId) {
      refetch();
    }
  }, [orderId, refetch]);

  if (!orderId) {
    return <div className="text-center text-red-600">Invalid order ID.</div>;
  }

  if (isLoading) {
    return (
      <div className="text-center text-gray-600">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Failed to load order details: {error?.message || "Unknown error"}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-600">Order details not found.</div>
    );
  }

  const orderInfo = products[0];

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h1>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
          <p className="text-sm text-gray-600">
            Order ID: {orderInfo.order_place_details.order_no}
          </p>
          <p className="text-sm text-gray-600">
            Placed on: {new Date(orderInfo.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Status: {getOrderStatus(orderInfo.order_status)}
          </p>
          <p className="text-sm text-gray-600">
            Delivery Charge: ₹{orderInfo.order_place_details.delivery_charge}
          </p>
        </div>

        {/* Products */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Products</h2>
          <div className="divide-y divide-gray-200">
            {products.map((product) => {
              const status = parseInt(product?.order_status);
              const isCancelable = status === 0;

              return (
                <div key={product.id} className="flex items-start py-3 gap-4">
                  <img
                    src={
                      product.image
                        ? `${import.meta.env.VITE_MEDIA_URL}/products/${
                            product.image
                          }`
                        : "/img/Noimages.png"
                    }
                    alt={product.product_name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      {product.product_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Variant: {product.varient_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {product.product_qty}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price per unit: ₹{product.sales_price}
                    </p>

                    {isCancelable ? (
                      <>
                        <button
                          onClick={() =>
                            setCancelInfo({ show: true, productId: product.id })
                          }
                          disabled={isCanceling}
                          className="mt-2 text-sm text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-50 disabled:opacity-50"
                        >
                          Cancel Product
                        </button>

                        {cancelInfo.show &&
                          cancelInfo.productId === product.id && (
                            <div className="mt-2 p-2 border rounded bg-gray-50">
                              <input
                                type="text"
                                placeholder="Reason for cancellation"
                                value={cancelReason}
                                onChange={(e) =>
                                  setCancelReason(e.target.value)
                                }
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    if (!cancelReason.trim()) {
                                      alert("Please enter a reason.");
                                      return;
                                    }

                                    cancelProduct([product.id, cancelReason], {
                                      onSuccess: () => {
                                        refetch();
                                        setCancelInfo({
                                          show: false,
                                          productId: null,
                                        });
                                        setCancelReason("");
                                      },
                                    });
                                  }}
                                  disabled={isCanceling}
                                  className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                                >
                                  {isCanceling
                                    ? "Cancelling..."
                                    : "Confirm Cancel"}
                                </button>
                                <button
                                  onClick={() => {
                                    setCancelInfo({
                                      show: false,
                                      productId: null,
                                    });
                                    setCancelReason("");
                                  }}
                                  className="text-gray-700 border px-3 py-1 rounded"
                                >
                                  Dismiss
                                </button>
                              </div>
                            </div>
                          )}
                      </>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500 italic">
                        {status === 100 ? "Canceled" : ""}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-800 font-semibold">
                    ₹{product.total_sales_price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Total */}
        <div className="text-right mt-4">
          <p className="text-lg font-bold text-gray-800">
            Total: ₹{products[0]?.order_place_details?.final_amount || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

const getOrderStatus = (status) => {
  switch (parseInt(status)) {
    case 4:
      return "Delivered";
    case 3:
      return "Packed";
    case 2:
      return "Procuring";
    case 1:
      return "Processing";
    case 0:
      return "Placed";
    case 100:
      return "Canceled";
    default:
      return "Placed";
  }
};

export default OrderDetails;
