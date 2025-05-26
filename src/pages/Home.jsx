import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
// import NewArrivals from "../components/NewArrivals";

// Lazy-loaded components
const NewArrivals = lazy(() => import("../components/newArrivals/NewArrivals"));
const Slider = lazy(() => import("../components/Slider"));
const Categories = lazy(() => import("../components/Categories"));
const Products = lazy(() => import("../components/Products"));
const Loader = lazy(() => import("../components/Loader"));

const Home = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/category");
  };

  return (
    <>
      <Suspense
        fallback={
          <div className="text-center py-4">
            {" "}
            <Loader />
            Loading slider...
          </div>
        }
      >
        <Slider />
      </Suspense>

      {/* <Suspense
        fallback={
          <div className="text-center py-4">
            {" "}
            <Loader />
            Loading categories...
          </div>
        }
      >
        <Categories />
      </Suspense> */}

      {/* <Suspense
        fallback={
          <div className="text-center py-4">
            {" "}
            <Loader />
            Loading New Arrivals...
          </div>
        }
      >
        <NewArrivals />
      </Suspense> */}

      <Suspense
        fallback={
          <div className="text-center py-4">
            {" "}
            <Loader />
            Loading products...
          </div>
        }
      >
        <Products />
      </Suspense>
    </>
  );
};

export default Home;
