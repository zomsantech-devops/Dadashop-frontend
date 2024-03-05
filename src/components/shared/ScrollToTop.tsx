import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith("/item-shop")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
