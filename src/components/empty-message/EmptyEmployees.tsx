import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  setIsAddEmployeeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmptyEmployees: React.FC<Props> = ({ setIsAddEmployeeModalOpen }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white text-2xl mb-4 shadow-md">
        👥
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
        {t("NO_EMPLOYEES_TITLE")}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-xs">
        {t("NO_EMPLOYEES_DESC")}
      </p>

      {/* CTA Button */}
      <button
        onClick={() => setIsAddEmployeeModalOpen(true)}
        className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md transition-all duration-200 active:scale-95"
      >
        ➕ {t("ADD_EMPLOYEE")}
      </button>
    </div>
  );
};

export default EmptyEmployees;
