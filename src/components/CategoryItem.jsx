import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/category");
  };

  return (
    <div
      onClick={handleNavigate}
      className="group cursor-pointer bg-neutral-50 backdrop-blur-md hover:backdrop-blur-lg border border-black/5 rounded-md p-2 sm:p-1 flex flex-row items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg min-h-[60px] sm:min-h-[80px]"
    >
      {/* Title */}
      <div className="flex flex-col flex-grow md:p-2">
        <h2 className="text-sm sm:text-base font-semibold text-black drop-shadow-sm">
          {item.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-900 opacity-70 mt-1">
          Tap to explore →
        </p>
      </div>

      {/* Image Thumbnail — NO padding */}
      <div className="w-14 h-14 sm:w-40 sm:h-36 rounded-lg overflow-hidden flex-shrink-0 ">
        <img
          src="/img/copy.png"
          alt={item.title}
          className="w-full h-full object-cover m-0 p-0"
        />
      </div>
    </div>
  );
};

export default CategoryItem;
