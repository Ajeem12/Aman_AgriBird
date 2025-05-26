import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNewArrival } from "../../hooks/useNewArrival";
import { Link } from "react-router-dom";
import hashids from "../../util/hashids";
import { Rating } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "./NewArrivals.css";

const NewArrivalCard = ({ item }) => {
  const encodedId = hashids.encode(item.id);
  const priceInfo = item.varient_details?.[0];
  const originalPrice = parseFloat(priceInfo?.product_price || 0);
  const salesPrice = parseFloat(priceInfo?.sales_price || 0);
  const averageRating = parseFloat(item.rating || 0);

  const calculatedDiscount =
    originalPrice > 0
      ? Math.round(((originalPrice - salesPrice) / originalPrice) * 100)
      : 0;

  const imageUrl = item.image_details?.[0]?.image
    ? `${import.meta.env.VITE_MEDIA_URL}/products/${
        item.image_details[0].image
      }`
    : "/img/Noimages.png";

  return (
    <div className="w-full h-auto relative group overflow-hidden border border-gray-200 rounded-lg   bg-white transition-transform  duration-300 hover:scale-105">
      <Link to={`/product/${item.product_slug}/${encodedId}`}>
        <img
          src={imageUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/img/Noimages.png";
          }}
          alt={item.product_name}
          className="w-full h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] object-cover rounded-t-lg transition-transform duration-300"
        />

        <div className="p-3 sm:p-4">
          <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-700 truncate mb-1">
            {item.product_name}
          </h2>

          <div className="flex items-center gap-1 mb-1">
            {averageRating > 0 ? (
              <Rating
                value={averageRating}
                precision={0.5}
                readOnly
                size="small"
              />
            ) : (
              <span className="text-sm text-gray-500">No ratings</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm sm:text-lg font-semibold text-black">
              ₹{salesPrice}
            </span>
            {salesPrice < originalPrice && (
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
    </div>
  );
};

const NewArrivals = () => {
  const { data, isLoading, error } = useNewArrival();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products
      </div>
    );
  if (!data || data.length === 0)
    return <div className="text-center py-10">No products found</div>;

  return (
    <div className="py-6 px-2">
      <h2 className="text-2xl font-bold mb-4 text-center ">New Arrivals</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={16}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full toto"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <NewArrivalCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewArrivals;
