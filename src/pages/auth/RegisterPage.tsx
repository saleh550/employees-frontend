import React from "react";
import SignupForm from "./components/SignupForm";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface props {}

const RegisterPage: React.FC<props> = () => {
  const { t } = useTranslation();
  return (
    <div
      data-aos="flip-left"
      className="isolate  px-6 py-20 sm:py-32 lg:px-8  rounded-lg"
    >
      <div className="flex justify-start">
        <Link
          to="/auth"
          className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full 
               bg-linear-to-r from-blue-600 to-indigo-600 
               text-white text-sm font-semibold 
               shadow-md hover:shadow-lg 
               transition-all duration-300 
               hover:from-blue-700 hover:to-indigo-700 
               active:scale-95"
        >
          <span className="relative z-10">{t("LOGIN")}</span>

          {/* subtle glow */}
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition duration-300" />
        </Link>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {t("SIGNUP")}
        </h2>
        {/* <p className="mt-2 text-lg/8 text-gray-600">AgriSmart login: Secure, quick access to manage your agricultural needs efficiently</p> */}
      </div>

      {/* <LoginForm /> */}
      <SignupForm />
    </div>
  );
};

export default RegisterPage;
