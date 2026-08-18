import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Fires a page_view on client-side route changes. The initial page view is
 * handled by the base gtag.js snippet in index.html.
 */
const AnalyticsTracker = () => {
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
