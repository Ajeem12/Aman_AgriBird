import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Breadcrumbs = () => {
  const location = useLocation();
  const rawSegments = location.pathname.split("/").filter(Boolean);

  // Filter out "category" or any other segment you want to skip
  const segments = rawSegments.filter(
    (segment) => segment.toLowerCase() !== "category"
  );

  const formatSegment = (segment) =>
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <p className="text-sm text-gray-600 flex items-center flex-wrap gap-1">
      <Link
        to="/"
        className="flex items-center gap-1 text-gray-600 hover:text-black"
      >
        <HomeIcon fontSize="small" />
        <span>Home</span>
      </Link>

      {segments.map((segment, index) => {
        const path =
          "/" +
          rawSegments.slice(0, rawSegments.indexOf(segment) + 1).join("/");
        const isLast = index === segments.length - 1;
        const formattedText = formatSegment(segment);

        return (
          <span key={index} className="flex items-center gap-1">
            <span className="mx-1">{">"}</span>
            {isLast ? (
              <span className="text-black font-medium">{formattedText}</span>
            ) : (
              <span to={path} className="text-gray-600 hover:text-black">
                {formattedText}
              </span>
            )}
          </span>
        );
      })}
    </p>
  );
};

export default Breadcrumbs;
