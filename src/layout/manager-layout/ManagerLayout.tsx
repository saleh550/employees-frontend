import React, { useEffect, useState } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import { Outlet } from "react-router-dom";
// import bgImage from "../../assets/backgrounds/BGImage.png";
import bgImageDark from "../../assets/backgrounds/BGImage.png";
import bgImageLight from "../../assets/backgrounds/BGImageLight.png";
import ManagerHeader from "./ManagerHeader";

interface props {}

const ManagerLayout: React.FC<props> = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const bgImage = isDark ? bgImageLight : bgImageDark;
  return (
    <div
      className={`min-h-svh bg-cover bg-center bg-no-repeat bg-fixed
            overflow-hidden`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ManagerHeader />
      {/* add padding to push outlet below fixed header */}
      <main className="pt-18">
        <ScrollToTop />
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;
