import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../store/useDarkMode";

const ThemeToggle: React.FC = () => {
  const { setDarkMode } = useDarkMode();
  const [theme, setTheme] = useState("dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setDarkMode(theme === "dark" ? "light" : "dark");

    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        relative w-16 h-9 flex items-center  my-auto rounded-full 
        bg-gray-300 dark:bg-gray-700
        transition-colors duration-500
        shadow-inner
      "
    >
      {/* Slider circle */}
      <span
        className={`
          absolute left-1 top-1 h-7 w-7 rounded-full flex items-center justify-center
          bg-white dark:bg-yellow-400 text-gray-800 dark:text-gray-900
          transform transition-transform duration-500
          ${theme === "dark" ? "translate-x-7 rotate-180" : "translate-x-0 rotate-0"}
        `}
      >
        {theme === "dark" ? (
          // Moon icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M21.75 15.002A9.718 9.718 0 0118 15.75a9.75 9.75 0 01-9.75-9.75 9.718 9.718 0 01.748-3.752A9.753 9.753 0 0012 21.75a9.753 9.753 0 009.75-6.748z" />
          </svg>
        ) : (
          // Sun icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m0 13.5V21m9-9h-2.25M5.25 12H3m15.364 6.364l-1.59-1.59m-9.548 0l-1.59 1.59m0-12.728l1.59 1.59m9.548 0l1.59-1.59M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
