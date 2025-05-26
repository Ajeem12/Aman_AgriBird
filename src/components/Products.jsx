import React from "react";
import { useHomeProducts } from "../hooks/useHomeProducts";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import hashids from "../util/hashids";
import useMediaQuery from "../util/mobile";

const Products = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const visibleCount = isSmallScreen ? 6 : 5;
  const { data, isLoading, error } = useHomeProducts();

  if (isLoading)
    return (
      <div className="text-center w-full">
        <Loader />
      </div>
    );
  if (error)
    return (
      <p className="text-center text-lg w-full text-red-500">
        Can't load products
      </p>
    );

  return (
    <div className="p-2 space-y-8">
      {Object.entries(data || {}).map(([categoryName, categoryObj]) => {
        const [rawCatId, products] = Object.entries(categoryObj)[0];
        const encodedId = hashids.encode(Number(rawCatId));

        if (products.length === 0) return null;

        return (
          <div key={categoryName}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{categoryName}</h2>
              <Link
                to={`/category/${categoryName
                  .toLowerCase()
                  .replace(/\s+/g, "-")}?catId=${encodedId}`}
                className="bg-red-600 py-2 px-3 rounded-md text-white font-medium hover:bg-red-700 transition"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {products.slice(0, visibleCount).map((item, index) => {
                const uniqueKey =
                  item.id || item.product_id || `${categoryName}-${index}`;
                return <ProductCard key={uniqueKey} item={item} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
