import React from "react";
import ReactSlider from "react-slider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const Filter = ({
  filterCriteria,
  onFilterChange,
  isCollapsed,
  toggleCollapse,
  minPrice = 0,
  maxPrice = 10000,
}) => {
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    const updatedCategories = filterCriteria.categories.includes(value)
      ? filterCriteria.categories.filter((category) => category !== value)
      : [...filterCriteria.categories, value];
    onFilterChange({ categories: updatedCategories });
  };

  const handlePriceChange = (newPrice) => {
    onFilterChange({ priceRange: newPrice });
  };

  const handleSortChange = (e) => {
    onFilterChange({ sort: e.target.value });
  };

  return (
    <>
      {/* Mobile Filter Button */}
      {!isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="fixed bottom-20 right-6 z-30 bg-gray-600 text-white p-2 rounded-full shadow-md sm:hidden"
        >
          <span aria-label="Open Filters" className="flex items-center gap-1">
            <FilterAltIcon /> Filter
          </span>
        </button>
      )}

      {/* Sidebar / Drawer */}
      <div
        className={`fixed sm:sticky top-0 left-0 z-40 md:z-30 sm:top-36 sm:left-6 h-full w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 sm:transform-none sm:w-full sm:shadow-none sm:bg-transparent sm:h-auto border border-gray-100 rounded ${
          isCollapsed ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <button
          onClick={toggleCollapse}
          className="absolute top-16 right-4 z-50 text-black sm:hidden"
          aria-label="Close Filters"
        >
          <CloseIcon />
        </button>

        <div className="bg-white p-6 sm:shadow-lg sm:rounded-lg sm:p-6">
          <h2 className="sm:text-2xl font-bold text-gray-800 mb-6">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Price (₹)</h3>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>₹{filterCriteria.priceRange[0]}</span>
              <span>₹{filterCriteria.priceRange[1]}</span>
            </div>
            <ReactSlider
              min={minPrice}
              max={maxPrice}
              step={10}
              value={filterCriteria.priceRange}
              onChange={handlePriceChange}
              pearling
              minDistance={10}
              renderTrack={(props, state) => {
                const { key, ...rest } = props;
                return (
                  <div
                    key={key}
                    {...rest}
                    style={{
                      ...props.style,
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor:
                        state.index === 1 ? "#4d9cdd" : "#E5E7EB",
                    }}
                  />
                );
              }}
              renderThumb={(props) => {
                const { key, ...rest } = props;
                return (
                  <div
                    key={key}
                    {...rest}
                    className="cursor-pointer h-4 w-4 bg-blue-500 rounded-full top-[-4px] focus:outline-none"
                  />
                );
              }}
            />
          </div>

          {/* Sort By Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Sort By</h3>
            <select
              value={filterCriteria.sort}
              onChange={handleSortChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Ratings</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Category Filter */}
          {/* <div>
            <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
            <div className="space-y-2">
              {Option.map((item) => (
                <label key={item.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={item.value}
                    checked={filterCriteria.categories.includes(item.value)}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleCollapse}
        ></div>
      )}
    </>
  );
};

export default Filter;
