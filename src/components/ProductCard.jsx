import { Link } from "react-router-dom";
import hashids from "../util/hashids";
import { Rating } from "@mui/material";

const ProductCard = ({ item }) => {
  if (!item?.price_details || item.price_details.length === 0) return null;
  const encodedId = hashids.encode(item.product_id);
  const priceInfo = item?.price_details?.[0];
  const originalPrice = priceInfo?.price || 0;
  const salesPrice = priceInfo?.sales_price || 0;
  const averageRating = parseFloat(item?.average_rating || 0);

  const calculatedDiscount =
    originalPrice > 0
      ? Math.round(((originalPrice - salesPrice) / originalPrice) * 100)
      : 0;

  return (
    <Link
      to={`/product/${item.slug}/${encodedId}`}
      className="w-full h-auto relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl bg-white transition-transform duration-300 hover:scale-105 hover:text-green-800"
    >
      <img
        src={
          item.images?.[0]?.image
            ? `${import.meta.env.VITE_MEDIA_URL}/products/${
                item.images[0].image
              }`
            : "/img/Noimages.png"
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/img/Noimages.png";
        }}
        alt={item.name}
        className="w-full h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] object-cover rounded-t-lg transition-transform duration-300"
      />

      <div className="p-3 sm:p-4">
        <h2 className="text-sm sm:text-base md:text-lg font-medium  truncate mb-1">
          {item.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          {averageRating ? (
            <>
              <Rating
                value={averageRating}
                precision={0.5}
                readOnly
                size="small"
              />
            </>
          ) : (
            <span className="text-sm text-gray-500">No ratings</span>
          )}
        </div>

        {/* Pricing */}
        <div className="flex flex-wrap items-center gap-2">
          {salesPrice > 0 && (
            <span className="text-sm sm:text-lg font-semibold text-black">
              ₹{salesPrice}
            </span>
          )}
         {originalPrice > 0 && salesPrice < originalPrice && (
            <del className="text-[12px] sm:text-base text-gray-500">
              ₹{originalPrice}
            </del>
          )}
          
          {calculatedDiscount > 0 && (
            <span className="text-xs sm:text-base text-green-600 font-semibold">
              {calculatedDiscount}% off
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
