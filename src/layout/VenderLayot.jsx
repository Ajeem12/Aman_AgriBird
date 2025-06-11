import React from "react";
import VendoreNav from "../components/vendor/VendoreNav";
import { Outlet } from "react-router-dom";

const VendoreLayout = () => {
  return (
    <div>
      <VendoreNav />
      {/* <VenderMenu /> */}
      <main className="pt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default VendoreLayout;
