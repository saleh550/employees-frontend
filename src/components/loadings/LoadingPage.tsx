import React from "react";
import { FaCircleNotch } from "react-icons/fa";

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center 
                    bg-linear-to-br from-white via-gray-100 to-gray-200 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Glow circle */}
      <div className="absolute w-40 h-40 bg-orange-400 opacity-20 rounded-full blur-3xl animate-pulse" />

      {/* Spinner */}
      <FaCircleNotch className="text-5xl text-orange-500 animate-spin z-10" />

      {/* Title */}
      <h2 className="mt-6 text-lg font-semibold text-gray-800 dark:text-white">
        Loading...
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Preparing your data
      </p>
    </div>
  );
};

export default FullScreenLoader;