import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useCartStore } from "../store/cartStore";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddress,
  useAddAddress,
  useUpdateAddress,
} from "../hooks/useAddress";
import useCoupon from "../hooks/useCoupon";
import usePlaceOrder from "../hooks/usePlaceOrder";
import { usePostalCode } from "../hooks/usePostalCode";
import toast from "react-hot-toast";

const Order = () => {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });
  const [pincodeError, setPincodeError] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(200);

  const {
    data,
    isLoading: isAddressLoading,
    isError: isAddressError,
    error: addressError,
  } = useAddress();
  const addresses = data || [];

  const selectedAddress = addresses[selectedIndex];
  const {
    data: pincodeData,
    isLoading: isPincodeLoading,
    isError: isPincodeError,
  } = usePostalCode(selectedAddress?.pincode);

  const { cart, buyNowProduct, clearBuyNowProduct, clearCart } = useCartStore();
  const location = useLocation();

  const isBuyNow =
    new URLSearchParams(location.search).get("buyNow") === "true";

  const productsToDisplay = isBuyNow && buyNowProduct ? [buyNowProduct] : cart;

  const calculateSubtotal = () =>
    productsToDisplay.reduce((total, item) => {
      const unitPrice = item.price ?? item.product_price ?? 0;
      const quantity = item.quantity ?? item.qty ?? 1;
      return total + unitPrice * quantity;
    }, 0);

  const subtotal = calculateSubtotal();
  const discount = isApplied ? (subtotal * discountPercentage) / 100 : 0;
  const grandTotal = subtotal + deliveryCharge - discount;

  const {
    applyCoupon,
    isLoading: isCouponLoading,
    error: couponError,
    couponResponse,
  } = useCoupon();

  const handleApplyCoupon = async () => {
    if (!coupon) return toast("Please enter a coupon code");

    try {
      const response = await applyCoupon(coupon);
      if (response?.data?.discount_per) {
        setDiscountPercentage(parseFloat(response.data.discount_per));
        setIsApplied(true);
      } else {
        toast.error("Invalid coupon response");
        setIsApplied(false);
      }
    } catch (err) {
      toast.error(couponError || "Invalid coupon code!");
      setIsApplied(false);
    }
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const { mutate: addAddress } = useAddAddress();
  const { mutate: updateAddress } = useUpdateAddress();

  const saveEditedAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.address ||
      !newAddress.pincode
    ) {
      toast("Please fill in all the fields.");
      return;
    }

    if (isEditing) {
      // Update existing address
      updateAddress(
        {
          id: addresses[selectedIndex].id,
          payload: newAddress,
        },
        {
          onSuccess: () => {
            toast.success("Address updated successfully!");
            setIsOpen(false);
          },
          onError: (error) => {
            console.error("Failed to update address:", error);
            toast.error("Failed to update address. Please try again.");
          },
        }
      );
    } else {
      // Add new address
      addAddress(newAddress, {
        onSuccess: () => {
          toast.success("Address added successfully!");
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Failed to add address:", error);
          toast.error("Failed to add address. Please try again.");
        },
      });
    }
  };

  const {
    placeOrder,
    isLoading: isOrderLoading,
    error: orderError,
  } = usePlaceOrder();

  const handleAddressSelection = (index) => {
    setSelectedIndex(index);
    const selectedAddress = addresses[index];

    // Validate the pincode of the selected address
    if (!isPincodeLoading && pincodeData?.message !== "aviliable") {
      setPincodeError("The selected address has an invalid pincode.");
    } else {
      setPincodeError(""); // Clear the error if the pincode is valid
    }
  };

  const handleOrderComplete = async () => {
    if (!selectedAddress) {
      toast("Please select a delivery address.");
      return;
    }

    // Check if the selected address's pincode is valid
    if (pincodeError) {
      toast.error("Please select an address with a valid pincode.");
      return;
    }

    const orderPayload = {
      address: selectedAddress.address,
      addressId: selectedAddress.id,
      valid_coupan: isApplied ? coupon : null,
      product: productsToDisplay.map((item) => ({
        id: item.product_id,
        qty: item.quantity || item.qty,
      })),
    };

    try {
      const result = await placeOrder(orderPayload);
      toast.success("Order placed successfully!");

      if (isBuyNow) {
        clearBuyNowProduct();
      } else {
        clearCart();
      }
      navigate("/thank-you");
    } catch (err) {
      console.error("Failed to place order:", orderError || err.message);
      toast.error(orderError || "Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    if (!selectedAddress || isPincodeLoading) return;

    if (pincodeData?.message === "aviliable") {
      setDeliveryCharge(pincodeData.data?.delivery_charge || 200);
      setPincodeError(""); // Clear any previous error
    } else {
      setPincodeError("Delivery not available on this pincode.");
      setDeliveryCharge(0); // Optional: reset delivery charge
    }
  }, [selectedAddress, pincodeData, isPincodeLoading]);

  if (isAddressLoading) return <div>Loading addresses...</div>;
  if (isAddressError) return <div>Error: {addressError.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-3 mb-20 md:mb-0">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Order Summary
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {productsToDisplay.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start bg-gray-100 p-4 rounded-lg shadow-sm gap-4"
                >
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${import.meta.env.VITE_MEDIA_URL}/products/${
                            item.image
                          }`
                    }
                    alt={item.name || item.product_name}
                    className="w-20 md:w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="overflow-hidden">
                    <h2
                      className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700 break-words line-clamp-2"
                      title={item.name || item.product_name}
                    >
                      {item.name || item.product_name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity || item.qty}
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-2">
                      ₹{" "}
                      {(item.price || item.product_price) *
                        (item.quantity || item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address Section */}
            <div>
              <div className="flex justify-between border-b">
                <h2 className="text-base sm:text-2xl font-bold text-gray-800 mb-6 ">
                  Manage Delivery Address
                </h2>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setIsEditing(false);
                      setNewAddress({
                        name: "",
                        phone: "",
                        address: "",
                        pincode: "",
                      });
                    }}
                    className="px-2 py-2  text-xs sm:text-sm sm:px-5 sm:py-3 bg-zinc-600 text-white rounded-lg shadow hover:bg-zinc-700 transition duration-300"
                  >
                    Add Address
                  </button>
                </div>
              </div>

              <>
                <div className="mb-6">
                  {addresses.length > 0 && (
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Select Address:
                    </label>
                  )}
                  <div className="flex flex-col sm:flex-row gap-5">
                    {addresses.map((addr, index) => (
                      <div key={index} className="group relative">
                        <input
                          type="radio"
                          id={`address-${index}`}
                          name="address"
                          value={index}
                          checked={selectedIndex === index}
                          onChange={() => handleAddressSelection(index)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`address-${index}`}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedIndex === index
                              ? "border-blue-500 bg-blue-50 text-gray-800"
                              : "border-gray-300 text-gray-800 hover:border-blue-400"
                          }`}
                        >
                          <div>
                            <div
                              className={`text-base sm:text-lg ${
                                selectedIndex === index
                                  ? "text-gray-800"
                                  : "text-gray-600"
                              }`}
                            >
                              {`${addr.name} - ${addr.phone}`}
                              <br />
                              {`${addr.address},  ${addr.pincode}`}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {pincodeError && (
                  <p className="text-red-500 text-sm">{pincodeError}</p>
                )}

                {addresses.length > 0 && (
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setIsEditing(true);
                      setNewAddress(addresses[selectedIndex]);
                    }}
                    className="mt-6 px-5 py-3 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition duration-300 flex items-center justify-center gap-2"
                  >
                    <EditIcon className="w-5 h-5" />
                    <span className="font-medium">Edit Address</span>
                  </button>
                )}
              </>
            </div>
          </div>

          {/* Price Summary */}
          <div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Price Details
              </h2>

              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">₹ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">₹ {deliveryCharge}</span>
                </div>
                <div className="w-full">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">
                    Apply Coupon
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />

                    <button
                      className={`w-full text-sm sm:w-auto px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
                        isApplied
                          ? "bg-green-500 text-white cursor-default"
                          : "bg-gray-800 text-white hover:bg-gray-900"
                      }`}
                      onClick={handleApplyCoupon}
                      disabled={isCouponLoading}
                    >
                      {isCouponLoading
                        ? "Applying..."
                        : isApplied
                        ? "Applied"
                        : "Apply"}
                    </button>
                  </div>

                  {isApplied && (
                    <p className="text-green-600 mt-2 text-sm">
                      🎉 Coupon applied successfully!
                    </p>
                  )}
                  {couponError && (
                    <p className="text-red-600 mt-2 text-sm">{couponError}</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="font-medium text-green-600">
                    ₹ -{discount}
                  </span>
                </div>
              </div>

              <div className="border-t mt-6 pt-4 flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>₹ {grandTotal}</span>
              </div>

              {/* Conditionally Render Continue to Payment Button */}
              {!pincodeError && (
                <button
                  onClick={handleOrderComplete}
                  className="hidden sm:block w-full mt-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg hover:shadow-xl transition duration-300"
                >
                  Continue to Payment
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Sticky Footer for Small Screens */}
        {!pincodeError && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t border-gray-200 sm:hidden">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">
                Total: ₹ {grandTotal}
              </span>

              <button
                onClick={handleOrderComplete}
                className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg hover:shadow-xl transition duration-300"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-md shadow-lg w-80 sm:w-full max-w-xl space-y-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition"
            >
              <CloseIcon />
            </button>

            {/* <h2 className="text-xl font-bold text-center mb-4">Edit Address</h2> */}
            <h2 className="text-xl font-bold text-center mb-4">
              {isEditing ? "Edit Address" : "Add Address"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                value={newAddress.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="address"
                value={newAddress.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="text-right">
              <button
                onClick={saveEditedAddress}
                className="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
