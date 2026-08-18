// Google Analytics 4 (gtag.js).
//
// The base tag is installed statically in index.html exactly as Google's
// tagging instructions specify, so it is present in every pre-rendered HTML
// file and fires on the initial page load. This module only sends page_view
// events for client-side (SPA) route changes.

export const MEASUREMENT_ID = "G-S7VCLYQ9YM";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Kept for API compatibility. The base tag lives in index.html. */
export function initAnalytics(): void {
  /* no-op */
}

/** Send a page_view event for a client-side route change. */
export function trackPageView(path: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
