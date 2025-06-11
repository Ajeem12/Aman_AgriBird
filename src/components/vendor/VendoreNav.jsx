import React from "react";
import { Link } from "react-router-dom";

const VendoreNav = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-start items-center">
        <Link to="/">
          <img src="/img/logo.jpeg" alt="Logo" className="h-[42px] md:h-20" />
        </Link>
      </div>
    </nav>
  );
};

export default VendoreNav;
