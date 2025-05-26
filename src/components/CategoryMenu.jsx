import React, { useState, useRef } from "react";
import { ArrowDropDown, Close as CloseIcon, Home } from "@mui/icons-material";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCategories } from "../hooks/useCategories";
import { Link } from "react-router-dom";
import hashids from "../util/hashids";

const CategoryMenu = () => {
  const [openParent, setOpenParent] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState({});
  const closeTimeout = useRef(null);
  const { data } = useCategories();
  const categories = data?.data || [];

  const handleMouseEnterParent = (index) => {
    clearTimeout(closeTimeout.current);
    setOpenParent(index);
  };

  const handleMouseLeaveParent = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenParent(null);
    }, 200);
  };

  const generateLink = (parentName, rawCatId) => {
    if (!parentName || !rawCatId) return "#";
    const formattedName = parentName.toLowerCase().replace(/\s+/g, "-");
    const encodedId = hashids.encode(Number(rawCatId));
    return `/category/${formattedName}?catId=${encodedId}`;
  };

  const findSubcategoryId = (name) => {
    const match = categories.find((item) => item.parentcate === name);
    return match?.id;
  };

  const toggleMobileSub = (index) => {
    setMobileSubOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderDesktopMenu = () =>
    categories
      .filter((cat) => cat.type === 0)
      .map((cat, parentIndex) => (
        <li
          key={cat.id}
          className="relative group"
          onMouseEnter={() => handleMouseEnterParent(parentIndex)}
          onMouseLeave={handleMouseLeaveParent}
        >
          <div className="flex items-center gap-1 cursor-pointer px-4 py-2 ">
            <Link
              to={generateLink(cat.parentcate, cat.id)}
              className="hover:underline hover:text-green-200"
            >
              {cat.parentcate}
            </Link>
            {cat.subcate1?.length > 0 && (
              <ArrowDropDown fontSize="small" className="ml-1" />
            )}
          </div>

          {cat.subcate1?.length > 0 && openParent === parentIndex && (
            <ul className="absolute left-0 top-full bg-red-600 shadow-lg rounded-md min-w-[200px] z-50">
              {cat.subcate1.map((sub1, sub1Index) => (
                <li key={`${cat.id}-sub1-${sub1Index}`}>
                  <Link
                    to={generateLink(
                      cat.parentcate,
                      findSubcategoryId(sub1.sub_cate2)
                    )}
                    className="block px-4 py-2 text-sm hover:text-green-400"
                  >
                    {sub1.sub_cate2}
                  </Link>

                  {sub1.subcate3?.length > 0 && (
                    <ul className="pl-4">
                      {sub1.subcate3.map((sub2, sub2Index) => (
                        <li
                          key={`${cat.id}-sub1-${sub1Index}-sub2-${sub2Index}`}
                          className="pl-2 py-1 text-sm"
                        >
                          <Link
                            to={generateLink(
                              cat.parentcate,
                              findSubcategoryId(sub2.sub_cate2)
                            )}
                            className="block px-4 py-1 text-sm hover:text-green-200"
                          >
                            {sub2.sub_cate2}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ));

  const renderMobileMenu = () =>
    categories
      .filter((cat) => cat.type === 0)
      .map((cat, index) => (
        <li key={cat.id} className="border-b">
          <div className="flex justify-between items-center px-4 py-2">
            <Link
              to={generateLink(cat.parentcate, cat.id)}
              onClick={() => setMobileOpen(false)}
              className="block font-medium"
            >
              {cat.parentcate}
            </Link>
            {cat.subcate1?.length > 0 && (
              <button onClick={() => toggleMobileSub(index)}>
                <ArrowDropDown
                  className={`transition-transform duration-200 ${
                    mobileSubOpen[index] ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
          {mobileSubOpen[index] && (
            <ul className="pl-6 pb-2">
              {cat.subcate1.map((sub1, sub1Index) => (
                <li key={`${cat.id}-mobile-sub1-${sub1Index}`}>
                  <Link
                    to={generateLink(
                      cat.parentcate,
                      findSubcategoryId(sub1.sub_cate2)
                    )}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 text-sm"
                  >
                    {sub1.sub_cate2}
                  </Link>

                  {sub1.subcate3?.length > 0 && (
                    <ul className="pl-4">
                      {sub1.subcate3.map((sub2, sub2Index) => (
                        <li
                          key={`${cat.id}-mobile-sub1-${sub1Index}-sub2-${sub2Index}`}
                        >
                          <Link
                            to={generateLink(
                              cat.parentcate,
                              findSubcategoryId(sub2.sub_cate2)
                            )}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-sm"
                          >
                            {sub2.sub_cate2}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ));

  return (
    <>
      {/* Desktop View */}
      <div className="bg-red-600 text-white font-medium py-1 hidden md:block sticky top-[88px] z-40 shadow">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="hidden sm:flex justify-center gap-8 items-center">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1 text-white hover:text-green-300 transition-all hover:border-b border-green-300"
              >
                <Home fontSize="small" />
                <span className="text-base font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-1 text-white hover:text-green-300 transition-all hover:border-b border-green-300"
              >
                <span className="text-base font-medium">About</span>
              </Link>
            </li>
            {renderDesktopMenu()}
          </ul>
        </div>
      </div>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-4 z-50 md:hidden transition-all"
      >
        <RxHamburgerMenu fontSize={24} />
      </button>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-lg">Aman AgriBird</h3>
          <button onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <ul className="overflow-y-auto max-h-[calc(100vh-60px)] py-2 text-sm">
          <li className="border-b">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <span className="block px-4 py-2 font-medium">Home</span>
            </Link>
          </li>
          <li className="border-b">
            <Link to="/about" onClick={() => setMobileOpen(false)}>
              <span className="block px-4 py-2 font-medium">About</span>
            </Link>
          </li>

          {renderMobileMenu()}
          <li className="border-b">
            <Link
              to="/seller-registration"
              onClick={() => setMobileOpen(false)}
            >
              <span className="block px-4 py-2 font-medium">
                Become a Partner
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategoryMenu;
