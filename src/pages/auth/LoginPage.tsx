import React from "react";

import LoginForm from "./components/LoginForm";
import Title from "./components/Title";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div
        data-aos="flip-left"
        className="isolate  px-6 py-20 sm:py-32 lg:px-8  rounded-lg"
      >
        <div className="flex justify-start ">
          <Link
            to="/auth/signup"
            className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full 
               bg-linear-to-r from-blue-600 to-indigo-600 
               text-white text-sm font-semibold 
               shadow-md hover:shadow-lg 
               transition-all duration-300 
               hover:from-blue-700 hover:to-indigo-700 
               active:scale-95"
          >
            <span className="relative z-10">{t("SIGNUP")}</span>

            {/* subtle glow */}
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition duration-300" />
          </Link>
        </div>
        <Title />
        <LoginForm />
      </div>
    </>
  );
};
