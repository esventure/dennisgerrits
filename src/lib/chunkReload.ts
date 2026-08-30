/**
 * Recovery for stale page code after a deploy.
 *
 * When a new version is deployed while someone still has the old version
 * open, the old page asks for a code file that no longer exists. The host
 * answers with an HTML "page could not be found" document, which the
 * browser cannot parse as a module ("Unexpected token 'T' ... is not valid
 * JSON"). Instead of showing an error screen we reload the page once so the
 * visitor silently lands on the current version.
 */

const RELOAD_FLAG = "chunk-reload-attempted";

export function isStaleChunkError(reason: unknown): boolean {
  const message =
    typeof reason === "string"
      ? reason
      : reason instanceof Error
        ? `${reason.name}: ${reason.message}`
        : "";
  if (!message) return false;
  return (
    /Failed to fetch dynamically imported module/i.test(message) ||
    /error loading dynamically imported module/i.test(message) ||
    /Importing a module script failed/i.test(message) ||
    /is not valid JSON/i.test(message) ||
    /Unexpected token '?[<T]/i.test(message) ||
    /ChunkLoadError/i.test(message)
  );
}

/** Reloads once per session; returns true when a reload was triggered. */
export function reloadOnce(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.sessionStorage.getItem(RELOAD_FLAG)) return false;
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    // Private mode without storage: still attempt a single reload.
  }
  window.location.reload();
  return true;
}

export function installChunkReloadHandler() {
  if (typeof window === "undefined") return;

  // Clear the guard once the page has loaded successfully.
  window.addEventListener("load", () => {
    window.setTimeout(() => {
      try {
        window.sessionStorage.removeItem(RELOAD_FLAG);
      } catch {
        /* ignore */
      }
    }, 5000);
  });

  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    reloadOnce();
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (isStaleChunkError(event.reason)) {
      event.preventDefault();
      reloadOnce();
    }
  });

  window.addEventListener("error", (event) => {
    if (isStaleChunkError(event.error ?? event.message)) {
      reloadOnce();
    }
  });
}
