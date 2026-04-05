import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import dennisIllustration from "@/assets/dennis_illustration.png";

const navLinks = [
  { to: "/#about", label: "About" },
  { to: "/#day", label: "A Day Together" },
  { to: "/#proof", label: "Reviews" },
  { to: "/#more", label: "More" },
  { to: "/#stories", label: "Stories" },
  { to: "/#contact", label: "Contact" },
  { to: "/get-inspired", label: "Get Inspired" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (to: string) => {
    setOpen(false);
    if (location.pathname === "/" && to.startsWith("/#")) {
      const id = to.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <img src={dennisIllustration} alt="Dennis Gerrits logo" className="h-12 w-12 object-contain" />
          <span className="font-heading text-2xl tracking-wider text-primary">Dennis Gerrits</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
              className={cn(
                "font-body text-sm tracking-wide transition-colors hover:text-secondary",
                location.pathname === link.to ? "text-secondary font-medium" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/40 bg-background px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
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
