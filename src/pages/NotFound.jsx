import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <img src="/img/error.gif" alt="404" className="w-72 h-72 mb-8" />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-500 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
