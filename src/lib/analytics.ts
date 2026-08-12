// Google Analytics 4 (gtag.js) initialization + SPA route tracking.
// The measurement ID is synced from the Google Analytics connector as a
// build-time Vite env var, so it is inlined into the client bundle.
//
// SSR/SSG-safe: every browser-only call is guarded by `typeof window`.

const MEASUREMENT_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Inject the gtag.js library and run the initial config. Browser-only. */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  if (!MEASUREMENT_ID) return;

  // Load the gtag.js script.
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);

  initialized = true;
}

/** Send a page_view event for a client-side route change. */
export function trackPageView(path: string): void {
  if (typeof window === "undefined" || !MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}
