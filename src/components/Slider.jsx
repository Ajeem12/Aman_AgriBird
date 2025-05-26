import React from "react";
import { useBanner } from "../hooks/useBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const Slider = () => {
  const { data, isLoading } = useBanner();

  const bannerItems =
    data?.map((item) => ({
      id: item.id,
      img: `${import.meta.env.VITE_MEDIA_URL}/banners/${item.image}`,
      title: item.title,
      desc: item.description || "",
      cta: "Shop Now",
      link: item.link,
    })) || [];

  if (bannerItems.length === 0) {
    return <div className="w-full h-[30vh]" />;
  }

  return (
    <div className="w-full h-[30vh] sm:h-[40vh] md:h-[100vh] lg:h-[80vh] overflow-hidden relative ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="w-full h-full custom-swiper"
      >
        {bannerItems.map((item, index) => (
          <SwiperSlide key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item.img}
                alt={item.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/img/Noimages.png";
                }}
                className="w-full h-[30vh] sm:h-[40vh] md:h-[100vh] lg:h-[80vh] object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white px-4 pb-16">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                  {item.title}
                </h1>
                <p className="mt-2 sm:mt-4 text-base sm:text-xl drop-shadow-sm">
                  {item.desc}
                </p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
