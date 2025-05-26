import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import { useCategories } from "../hooks/useCategories";
import { Link } from "react-router-dom";
import hashids from "../util/hashids";

const Footer = () => {
  const { data } = useCategories();

  const generateLink = (parentName, rawCatId) => {
    if (!parentName || !rawCatId) {
      console.error("Missing parentName or rawCatId:", {
        parentName,
        rawCatId,
      });
      return "#";
    }
    const formattedName = parentName.toLowerCase().replace(/\s+/g, "-");
    const encodedId = hashids.encode(Number(rawCatId));
    return `/category/${formattedName}?catId=${encodedId}`;
  };

  return (
    <footer className="bg-[#152339] text-gray-200 ">
      <div className="container mx-auto px-6 py-3 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-4">
            Aman AgriBird.
          </h1>
          <p className="mb-4 text-sm">
            At Aman Agribird, we offer high-quality chicken and fish, raised and
            sourced with care. Whether you're cooking for everyday meals or
            special occasions, our products bring fresh taste and nutrition
            straight from the farm to your kitchen.
          </p>
          <div className="flex space-x-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Facebook fontSize="small" />
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
              <Instagram fontSize="small" />
            </div>
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center">
              <Twitter fontSize="small" />
            </div>
            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
              <Pinterest fontSize="small" />
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Useful Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:underline hover:text-blue-400 transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="hover:underline hover:text-blue-400 transition-colors duration-300"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:underline hover:text-blue-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:underline hover:text-blue-400 transition-colors duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="flex flex-col gap-y-3 gap-x-6 text-[16px]">
              {data?.data
                ?.filter((cat) => cat.type === 0)
                .slice(0, 4)
                .map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={generateLink(cat.parentcate, cat.id)}
                      className="hover:text-blue-600 transition-colors duration-300"
                    >
                      {cat.parentcate}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact</h3>
          <div className="flex items-center mb-4 text-sm">
            <Room className="mr-2 text-blue-600" />
            622 Dixie Path, South Tobinchester 98336
          </div>
          <div className="flex items-center mb-4 text-sm">
            <Phone className="mr-2 text-green-600" />
            +1 234 56 78
          </div>
          <div className="flex items-center mb-4 text-sm">
            <MailOutline className="mr-2 text-red-600" />
            contact@amanagribird.dev
          </div>
          <img
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            alt="Payment methods"
            className="w-1/2 mt-4"
          />
        </div>
      </div>
      <div className="flex justify-between border-t border-gray-400 px-4">
        <div className=" py-4 text-xs text-gray-300 ">
          © {new Date().getFullYear()} Aman Agribird. All rights reserved.
        </div>
        <div className=" py-4 text-xs text-gray-300">
          Design & Maintained by |
          <a
            href="https://www.ayodhyawebosoft.com/"
            target="_blank"
            className="hover:text-blue-400"
          >
            {" "}
            Ayodhya Webosoft Private Limited
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
