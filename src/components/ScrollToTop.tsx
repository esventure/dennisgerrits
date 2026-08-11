import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Scroll back to the top whenever the route changes, unless the URL
   points at a specific section via a hash. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
