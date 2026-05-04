import React from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface props {}

const BackButton: React.FC<props> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-start mt-4 mx-2">
      <button
        onClick={handleBack}
        className="group flex items-center gap-2 px-4 py-2 rounded-lg 
  bg-linear-to-r from-gray-100 to-gray-200 
  dark:from-gray-800 dark:to-gray-700
  text-gray-800 dark:text-white 
  shadow-sm hover:shadow-lg 
  transition-all duration-300 active:scale-95"
      >
        <FaArrowRight className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="font-medium">{t("BACK_TO_EMPLOYEES")}</span>
      </button>
    </div>
  );
};

export default BackButton;
