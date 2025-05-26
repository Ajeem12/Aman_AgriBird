import { Add, Remove, Star } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ZoomableImage from "./ZoomableImage";
import ProductTabs from "../components/ProductTabs";
import { useProductDetails } from "../hooks/useProductDetails";
import Loader from "../components/Loader";
import { Rating } from "@mui/material";
import hashids from "../util/hashids";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useModalStore } from "../store/uiStore";
import { usePostalCode } from "../hooks/usePostalCode";
import { useAddCart } from "../hooks/useAddCart";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id: hashedId } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, setBuyNowProduct } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useModalStore();
  console.log("cart", cart);

  const decoded = hashids.decode(hashedId);
  const productId =
    Array.isArray(decoded) && decoded.length > 0 ? decoded[0] : null;

  const { data, isLoading, error } = useProductDetails(productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [submittedPincode, setSubmittedPincode] = useState(null);
  const [pincodeStatus, setPincodeStatus] = useState("");
  const [pincodeAvailable, setPincodeAvailable] = useState(false);

  const [deliveryCharge, setDeliveryCharge] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { mutate: addToCartServer } = useAddCart();

  const isProductInCart = cart.some(
    (item) => (item.product_id || item.id) === productId
  );

  const handleBuyNow = () => {
    setBuyNowProduct({
      id: data.id,
      name: data.product_name,
      image: images[0],
      price: salesPrice,
      quantity,
    });

    if (isAuthenticated) {
      navigate("/order?buyNow=true");
    } else {
      openLoginModal();
    }
  };

  const { data: postalCodeData } = usePostalCode(submittedPincode);

  const handlePincodeCheck = () => {
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPincodeStatus("Please enter a valid 6-digit pincode.");
      setDeliveryCharge(null);
      return;
    }

    setSubmittedPincode(pincode);
  };

  useEffect(() => {
    if (!postalCodeData) return;

    if (postalCodeData.message === "aviliable") {
      setPincodeStatus("Delivery is available in your area!");
      setDeliveryCharge(postalCodeData.data.delivery_charge);
      setPincodeAvailable(true);
    } else {
      setPincodeStatus(" Sorry, delivery is not available to this pincode.");
      setDeliveryCharge(null);
      setPincodeAvailable(false);
    }
  }, [postalCodeData]);

  if (!productId) {
    return (
      <div className="p-6 text-red-600 text-lg font-semibold">
        Invalid product ID.
      </div>
    );
  }

  if (isLoading) return <Loader />;
  if (error || !data) {
    return (
      <div className="p-6 text-red-600 text-lg font-semibold">
        Failed to load product.
      </div>
    );
  }

  const images =
    data.image_details?.map(
      (img) => `${import.meta.env.VITE_MEDIA_URL}/products/${img.image}`
    ) || [];
  const variant = data.varient_details?.[0];
  const price = variant?.product_price || data.product_price;
  const salesPrice = variant?.sales_price || data.sales_price;

  const handleAddToCart = () => {
    const product = {
      product_id: data.id,
      name: data.product_name,
      image: images[0],
      price: salesPrice,
      quantity,
    };

    if (isAuthenticated) {
      addToCartServer(product, {
        onSuccess: () => {
          setIsAddedToCart(true);
          toast.success("Product added to cart successfully!");
        },
        onError: () => {
          toast.error("Failed to add product to cart. Please try again.");
        },
      });
    } else {
      addToCart(
        {
          id: data.id,
          name: data.product_name,
          image: images[0],
          price: salesPrice,
        },
        quantity
      );
      setIsAddedToCart(true);
    }
  };
  return (
    <div className="min-h-screen p-4 mb-6 sm:mb-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex-1 flex flex-col items-center">
            {images.length > 0 && (
              <>
                <ZoomableImage src={images[selectedImage]} alt="Product" />
                <div className="flex gap-2 mt-4">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                        selectedImage === index
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-red-800">
              {data.product_name}
            </h1>
            <p
              className="text-gray-600 "
              dangerouslySetInnerHTML={{
                __html: data.category_details?.category_name,
              }}
            />
            <div className="flex items-center gap-2 mb-4">
              {data.average_rating ? (
                <>
                  <span className="text-yellow-500 flex items-center">
                    <Rating
                      value={data.average_rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </span>
                  <span className="text-sm text-gray-600">
                    ({data.rating_count} Ratings)
                  </span>
                </>
              ) : (
                <span className="text-sm text-gray-500">No ratings yet</span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-800">
                ₹{salesPrice}
              </span>
              {price !== salesPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{price}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {Math.round(((price - salesPrice) / price) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p
              className="text-gray-600 mb-6"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            {/* Options */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-700">Quantity:</span>
                  <Remove
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  />
                  <span className="w-10 h-10 border rounded-md flex items-center justify-center font-semibold">
                    {quantity}
                  </span>
                  <Add
                    className="cursor-pointer hover:text-green-500"
                    onClick={() => setQuantity((q) => q + 1)}
                  />
                </div>
              </div>
            </div>

            {/* Pincode Checker */}
            <div className="my-4">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                Check delivery availability
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your pincode"
                  className="border p-2 rounded-md w-full sm:w-60"
                />
                {pincodeStatus && (
                  <p
                    className={`mt-2 text-sm ${
                      pincodeAvailable ? "text-green-600" : "text-red-500"
                    } sm:hidden`}
                  >
                    {pincodeStatus}
                  </p>
                )}
                <button
                  onClick={handlePincodeCheck}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Check
                </button>
              </div>
              {pincodeStatus && (
                <p
                  className={`hidden sm:block mt-2 text-sm ${
                    pincodeAvailable ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {pincodeStatus}
                </p>
              )}
              {pincodeAvailable && deliveryCharge !== null && (
                <div className="mt-2 text-sm text-gray-700">
                  Delivery Charge: ₹{deliveryCharge}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="gap-5 hidden sm:flex">
                {isProductInCart ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105"
                  >
                    GO TO CART
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transform transition-transform duration-300 hover:scale-105"
                  >
                    ADD TO CART
                  </button>
                )}

                <button
                  onClick={handleBuyNow}
                  className="px-6 py-3 border border-gray-600 text-gray-600 rounded-md hover:bg-gray-200"
                >
                  BUY NOW
                </button>
              </div>

              {/* Mobile Sticky Buttons */}
              <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex gap-4 sm:hidden z-50">
                {isProductInCart ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    GO TO CART
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    ADD TO CART
                  </button>
                )}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Seller Info */}
            {/* <div className="flex py-6 border-t mt-6">
              <div className="flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_MEDIA_URL}/vendors/${
                    data.vendor_details?.photo
                  }`}
                  alt={data.vendor_details?.vendor_name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">
                  Seller:
                  <span className="font-bold ml-2">
                    {data.vendor_details?.vendor_name}
                  </span>
                </h2>
                <p className="text-gray-600 font-medium">
                  No. {data.vendor_details?.mobile_no}
                </p>
                <p className="text-gray-600 font-medium">
                  Address. {data.vendor_details?.address}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <ProductTabs longdes={data.long_description} id={data.id} />
    </div>
  );
};

export default ProductPage;
