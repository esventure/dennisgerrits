import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "moved-banner-dismissed-v1";

const MovedBanner = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      role="status"
      className="relative border-b"
      style={{
        backgroundColor: "hsl(40 38% 96%)",
        borderColor: "hsl(var(--heritage-taupe) / 0.4)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 py-2.5 flex items-center justify-between gap-3">
        <p
          className="font-body text-xs sm:text-sm leading-snug"
          style={{ color: "hsl(var(--heritage-bordeaux))" }}
        >
          <span aria-hidden className="mr-2 inline-block">↪</span>
          <span className="font-medium">Formerly Love My City Tours</span>
          <span className="opacity-70"> — now dennisgerrits.com. Same Dennis, same Amsterdam, new home.</span>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
          style={{ color: "hsl(var(--heritage-bordeaux))" }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default MovedBanner;
