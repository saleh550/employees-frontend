import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      lastPath.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
