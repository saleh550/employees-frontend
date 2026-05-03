import React from "react";

const EmployeesLoadingCards: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl bg-white/60 dark:bg-gray-900/60 shadow-md border border-gray-200 dark:border-gray-700 animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>

          {/* Work amount */}
          <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>

          {/* Rate */}
          <div className="h-3 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

          {/* Total */}
          <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default EmployeesLoadingCards;