import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import ProductCard from "../components/ProductCard";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { results, loading, error, searchProducts } = useSearch();

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query, searchProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-1 mb-10">
      <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-6">
        Search Results for <span className="text-primary">"{query}"</span>
      </h1>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center font-medium">{error}</p>}

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {results.map((product) => {
            const varient = product.varient_details?.[0];
            const image = product.image_details?.[0];

            return (
              <ProductCard
                key={product.id}
                item={{
                  product_id: product.id,
                  slug: product.product_slug,
                  name: product.product_name,
                  average_rating: product.rating,
                  price_details: [
                    {
                      price: parseFloat(varient?.product_price || 0),
                      sales_price: parseFloat(varient?.sales_price || 0),
                    },
                  ],
                  images: [
                    {
                      image: image?.image || null,
                    },
                  ],
                }}
              />
            );
          })}
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center text-center mt-16">
            <img
              src="/no-results.svg"
              alt="No results"
              className="w-52 h-52 opacity-70 mb-6"
            />
            <p className="text-gray-500 text-lg">
              No products found for "<strong>{query}</strong>"
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchResult;
