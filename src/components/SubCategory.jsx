import React, { useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SubCategory = ({ subCategories, selectedId, onSelect }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Buttons - only show if subCategories exist */}
      {subCategories.length > 0 && (
        <>
          <button
            onClick={scrollLeft}
            className="hidden lg:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-10"
            aria-label="Scroll Left"
          >
            <ChevronLeftIcon className="text-gray-600 hover:scale-125 active:scale-95" />
          </button>

          <button
            onClick={scrollRight}
            className="hidden lg:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-10"
            aria-label="Scroll Right"
          >
            <ChevronRightIcon className="text-gray-600 hover:scale-125 active:scale-95" />
          </button>
        </>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap py-2 px-2 hide-scrollbar scroll-smooth"
      >
        <div className="flex gap-3">
          {subCategories.length === 0 ? (
            <p className="text-gray-500 italic"></p>
          ) : (
            subCategories.map((category) => {
              const isSelected = selectedId === category.cat_id;
              return (
                <div
                  key={category.cat_id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(category.cat_id, category.cat_name)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    onSelect(category.cat_id, category.cat_name)
                  }
                  aria-selected={isSelected}
                  className={`flex-shrink-0 w-24 text-center rounded-md shadow-sm transition duration-300 cursor-pointer hover:scale-105
                    ${isSelected ? "bg-black text-white" : "bg-white"}`}
                >
                  <img
                    src={
                      category.image
                        ? `${import.meta.env.VITE_MEDIA_URL}/categories/${
                            category.image
                          }`
                        : "/img/Nocat.png"
                    }
                    alt={category.cat_name}
                    className="w-full h-16 object-cover rounded-t-md"
                  />
                  <div className="p-2 w-full max-w-[120px]">
                    <p className="text-xs font-medium break-words whitespace-normal line-clamp-2">
                      {category.cat_name}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
