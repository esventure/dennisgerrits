import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { isStaleChunkError, reloadOnce } from "@/lib/chunkReload";

/**
 * Shown instead of the raw router error screen. When the error is caused by
 * stale page code after a deploy, the page reloads itself once.
 */
const RouteError = () => {
  const error = useRouteError();

  useEffect(() => {
    if (isStaleChunkError(error)) reloadOnce();
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-4xl md:text-5xl tracking-wide">One moment</h1>
        <p className="font-body text-foreground/70 mt-4">
          Something went wrong while loading this page. Refreshing usually solves it.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-block font-body text-sm uppercase tracking-[0.2em] underline underline-offset-4"
        >
          Reload the page
        </button>
      </div>
    </main>
  );
};

export default RouteError;
