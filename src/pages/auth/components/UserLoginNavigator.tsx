import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface props {
}

const UserLoginNavigator: React.FC<props> = () => {
    const {t} = useTranslation();
    return (
<Link
  to="/auth"
  className="
    group inline-flex items-center gap-2
    rounded-full border border-slate-200
    bg-white/80 px-5 py-2.5
    text-sm font-semibold text-slate-700
    shadow-sm backdrop-blur-md
    transition-all duration-300
    hover:-translate-y-0.5
    hover:border-slate-300
    hover:bg-slate-900
    hover:text-white
    hover:shadow-lg
    active:scale-95
  "
>
  <span
    className="
      flex h-7 w-7 items-center justify-center
      rounded-full bg-slate-100
      transition-all duration-300
      group-hover:bg-white/10
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  </span>

  <span>{t("LOGIN_AS_ADMIN", "Admin Login")}</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-6-6 6 6-6 6"
    />
  </svg>
</Link>
    );
};

export default UserLoginNavigator;