import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        to="/#contact"
        className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors font-body text-sm tracking-wide"
        onClick={() => {
          const el = document.getElementById("contact");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <MessageCircle size={18} />
        Let's Talk
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default FloatingCTA;
