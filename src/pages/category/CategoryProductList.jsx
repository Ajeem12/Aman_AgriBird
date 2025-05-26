import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "../../components/Filter";
import SubCategory from "../../components/SubCategory";
import { useCategorieProduct } from "../../hooks/useCategorieProduct";
import hashids from "../../util/hashids";
import Loader from "../../components/Loader";
import Cat from "./Cat";
import Breadcrumbs from "../../components/Breadcrumb";

const ClayArtProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const queryParams = new URLSearchParams(location.search);

  const encodedCatId = queryParams.get("catId");

  const categoryId = encodedCatId ? hashids.decode(encodedCatId)[0] : null;

  const [selectedSubCatId, setSelectedSubCatId] = useState(categoryId);

  const [filterCriteria, setFilterCriteria] = useState({
    priceRange: [0, 0],
    sort: "",
    categories: [],
  });

  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setSelectedSubCatId(categoryId);
    }
  }, [categoryId]);

  const { data, isLoading, error } = useCategorieProduct(selectedSubCatId);

  if (!categoryId) {
    return (
      <p className="text-center w-full text-red-500">
        Invalid or missing category ID
      </p>
    );
  }

  const handleSubCatSelect = (subId) => {
    const newParams = new URLSearchParams(location.search);
    const encodedSubId = hashids.encode(subId);
    newParams.set("catId", encodedSubId);

    navigate(`${location.pathname}?${newParams.toString()}`);
    setSelectedSubCatId(subId);
  };

  const handleFilterChange = (newCriteria) => {
    setFilterCriteria((prev) => ({ ...prev, ...newCriteria }));
  };

  // Dynamically set price range from fetched products
  useEffect(() => {
    if (data?.product?.length > 0) {
      const prices = data.product.map(
        (p) => p.varient_details?.[0]?.sales_price || 0
      );
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setPriceBounds({ min, max });

      // Update filter only if default
      setFilterCriteria((prev) => {
        if (prev.priceRange[0] === 0 && prev.priceRange[1] === 0) {
          return { ...prev, priceRange: [min, max] };
        }
        return prev;
      });
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-center w-full text-red-500">{error.message}</p>;

  const subcategories = data?.subcat || [];
  const products = data?.product || [];

  const filteredProducts = products
    .filter((product) => {
      const price = product.varient_details?.[0]?.sales_price || 0;

      const matchesPrice =
        price >= filterCriteria.priceRange[0] &&
        price <= filterCriteria.priceRange[1];

      const matchesCategory =
        filterCriteria.categories.length === 0 ||
        filterCriteria.categories.includes(product.category_slug);

      return matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      if (filterCriteria.sort === "price-asc") {
        return (
          a.varient_details?.[0]?.sales_price -
          b.varient_details?.[0]?.sales_price
        );
      } else if (filterCriteria.sort === "price-desc") {
        return (
          b.varient_details?.[0]?.sales_price -
          a.varient_details?.[0]?.sales_price
        );
      } else if (filterCriteria.sort === "rating") {
        return b.rating - a.rating;
      } else if (filterCriteria.sort === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

  return (
    <div className="flex flex-col sm:flex-row gap-4 px-2 md:px-4  min-h-screen mb-10">
      <div className="sm:w-1/4 w-full">
        <Filter
          filterCriteria={filterCriteria}
          onFilterChange={handleFilterChange}
          isCollapsed={isFilterCollapsed}
          toggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
          minPrice={priceBounds.min}
          maxPrice={priceBounds.max}
        />
      </div>

      <div className="md:w-3/4 w-full md:px-2 sm:mt-3">
        <Breadcrumbs />
        <div className="mb-2">
          <SubCategory
            subCategories={subcategories}
            selectedId={selectedSubCatId}
            onSelect={handleSubCatSelect}
          />
        </div>

        <Cat products={filteredProducts} />
      </div>
    </div>
  );
};

export default ClayArtProductList;
