import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const CategoryMenu = lazy(() => import("../components/CategoryMenu"));
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import { useModalStore } from "../store/uiStore";
import Loader from "../components/Loader";
import Register from "../pages/Register";

const Layout = () => {
  const {
    showLoginModal,
    closeLoginModal,
    showRegisterModal,
    closeRegisterModal,
  } = useModalStore();

  return (
    <div className="relative">
      <Navbar />
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="text-center py-4">
            <Loader />
            Loading menu...
          </div>
        }
      >
        <CategoryMenu />
      </Suspense>

      <div>
        <Outlet />
      </div>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Login onClose={closeLoginModal} />
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Register onClose={closeRegisterModal} />
        </div>
      )}
    </div>
  );
};

export default Layout;
