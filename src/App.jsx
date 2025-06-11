import { Suspense, lazy, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import VendoreLayout from "./layout/VenderLayot";
import { useAuthStore } from "./store/authStore";
import { useModalStore } from "./store/uiStore";
import UpdatePass from "./pages/UpdatePass";
import SearchResult from "./pages/SearchResult";
import NotFound from "./pages/NotFound";
import PincodeModal from "./pages/PincodeModal";
import useLocationStore from "./store/locationStore";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CategoryProductList = lazy(() =>
  import("./pages/category/CategoryProductList")
);
const Terms = lazy(() => import("./pages/Terms"));
const Partner = lazy(() => import("./pages/Partner"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const About = lazy(() => import("./pages/About"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const User = lazy(() => import("./pages/User"));
const Profile = lazy(() => import("./pages/Profile"));
const MyOrders = lazy(() => import("./pages/orders/MyOrder"));
const OrderDetails = lazy(() => import("./pages/orders/OrderDetails"));
const Address = lazy(() => import("./pages/Address"));
const Order = lazy(() => import("./pages/Order"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const VBLogin = lazy(() => import("./pages/vender/VBLogin"));
const VendorOrders = lazy(() => import("./pages/vender/VenderOrders"));
const VendorHome = lazy(() => import("./pages/vender/VendorHome"));
const VendorOrderDetails = lazy(() =>
  import("./pages/vender/VendorOrderDetails")
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const openLoginModal = useModalStore((state) => state.openLoginModal);

  if (!token) {
    openLoginModal();
    return null;
  }
  return children;
};

// Suspense Wrapper
const withSuspense = (Component) => (
  <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
    {Component}
  </Suspense>
);

// Route Definitions
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(<Home />),
      },
      {
        path: "/cart",
        element: withSuspense(<Cart />),
      },
      {
        path: "/vendor-orders",
        element: withSuspense(<VendorOrders />),
      },
      {
        path: "/product/:slug/:id",
        element: withSuspense(<ProductPage />),
      },
      {
        path: "/user",
        element: <ProtectedRoute>{withSuspense(<User />)}</ProtectedRoute>,
        children: [
          {
            index: true,
            element: withSuspense(<Profile />),
          },
          {
            path: "my-order",
            element: withSuspense(<MyOrders />),
          },
          {
            path: "address",
            element: withSuspense(<Address />),
          },
          {
            path: "update-pass",
            element: withSuspense(<UpdatePass />),
          },
          {
            path: "order-detail/:orderId",
            element: withSuspense(<OrderDetails />),
          },
        ],
      },
      {
        path: "/about",
        element: withSuspense(<About />),
      },
      // {
      //   path: "/refund-policy",
      //   element: withSuspense(<RefundPolicy />),
      // },
      // {
      //   path: "/privacy-policy",
      //   element: withSuspense(<PrivacyPolicy />),
      // },
      // {
      //   path: "/terms",
      //   element: withSuspense(<Terms />),
      // },
      {
        path: "/order",
        element: withSuspense(<Order />),
      },
      {
        path: "/search",
        element: withSuspense(<SearchResult />),
      },
      {
        path: "/category/:slug/:subslug?",
        element: withSuspense(<CategoryProductList />),
      },
      {
        path: "/thank-you",
        element: <ProtectedRoute>{withSuspense(<ThankYou />)}</ProtectedRoute>,
      },
      // {
      //   path: "/seller-registration",
      //   element: <ProtectedRoute>{withSuspense(<Partner />)}</ProtectedRoute>,
      // },
      {
        path: "*",
        element: withSuspense(<NotFound />),
      },
    ],
  },
  {
    path: "/register",
    element: withSuspense(<Register />),
  },
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/vendor",
    element: <VendoreLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<VendorHome />),
      },
      {
        path: "today-orders",
        element: withSuspense(<VendorHome />),
      },
      {
        path: "all-orders",
        element: withSuspense(<VendorOrders />),
      },
      {
        path: "vendor-order/:id",
        element: withSuspense(<VendorOrderDetails />),
      },
    ],
  },

  {
    path: "/vendor-login",
    element: withSuspense(<VBLogin />),
  },
]);

function App() {
  const { city, pincode } = useLocationStore();
  const { showPincodeModal, openPincodeModal } = useModalStore();

  useEffect(() => {
    if (!city || !pincode) {
      openPincodeModal();
    }
  }, [city, pincode, openPincodeModal]);

  return (
    <>
      {showPincodeModal && <PincodeModal />}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
        className="mobile-only"
      />
      <Suspense
        fallback={<div className="text-center py-10">Loading App...</div>}
      >
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
