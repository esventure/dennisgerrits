import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/approach", label: "A Day Together" },
  { to: "/interests", label: "Your Interests" },
  { to: "/contact", label: "Get in Touch" },
  { to: "/faq", label: "FAQ" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
        <Link to="/" className="font-heading text-2xl tracking-wider text-primary">
          Dennis Gerrits
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "font-body text-sm tracking-wide transition-colors hover:text-secondary",
                location.pathname === link.to ? "text-secondary font-medium" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-border/40 bg-background px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block font-body text-lg py-2 transition-colors",
                location.pathname === link.to ? "text-secondary font-medium" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
