import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = ({ onClick, label = "Back" }) => {
  return (
    <button
      onClick={onClick}
      className="block md:hidden items-center gap-2 text-teal-700 hover:text-teal-900 font-medium transition"
    >
      <ArrowBackIcon />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
