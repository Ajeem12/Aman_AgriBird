import React from "react";
import { Link } from "react-router-dom";
import hashids from "../../util/hashids";
import { Rating } from "@mui/material";

const Cat_Product = ({ product }) => {
  const averageRating = parseFloat(product?.average_rating || 0);

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="text-center py-8 text-gray-900">
        No product data available.
      </div>
    );
  }

  return (
    <div>
      <Link
        to={`/product/${product.product_slug}/${hashids.encode(product.id)}`}
      >
        <div className="w-full h-auto relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl bg-white transition-transform duration-300 hover:scale-105 hover:text-green-800">
          <div className="relative">
            <img
              src={
                product.image_details?.[0]?.image
                  ? `${import.meta.env.VITE_MEDIA_URL}/products/${
                      product.image_details[0].image
                    }`
                  : "/img/Noimages.png"
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/img/Noimages.png";
              }}
              alt={product.product_name}
              className="w-full h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] object-cover rounded-t-lg transition-transform duration-300"
            />
          </div>
          <div className="p-3">
            <h2 className="text-base sm:text-lg font-medium  truncate mb-1">
              {product.product_name}
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
                <span className="text-sm text-gray-500">No ratings yet</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {product.varient_details?.[0]?.sales_price > 0 && (
                <span className="text-sm sm:text-base font-semibold text-black">
                  ₹{product.varient_details[0].sales_price}
                </span>
              )}

              {product.varient_details?.[0]?.product_price > 0 &&
                product.varient_details?.[0]?.sales_price <
                  product.varient_details?.[0]?.product_price && (
                  <del className="text-xs sm:text-sm text-gray-500">
                    ₹{product.varient_details?.[0]?.product_price}
                  </del>
                )}

              {/* Discount */}
              {product.varient_details?.[0]?.sales_price > 0 &&
                product.varient_details?.[0]?.product_price > 0 &&
                (() => {
                  const discount = Math.round(
                    ((product.varient_details[0].product_price -
                      product.varient_details[0].sales_price) /
                      product.varient_details[0].product_price) *
                      100
                  );
                  return discount > 0 ? (
                    <span className="text-xs sm:text-sm text-green-600 font-semibold">
                      {`${discount}% off`}
                    </span>
                  ) : null;
                })()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cat_Product;
