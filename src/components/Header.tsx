import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import dennisIllustration from "@/assets/dennis_illustration.png";

const navLinks = [
  { to: "/#about", label: "About Me" },
  { to: "/#how-it-works", label: "How I Work" },
  { to: "/#rick-steves", label: "Rick Steves" },
  { to: "/#experiences", label: "Experiences" },
  { to: "/#podcast", label: "Podcast" },
  { to: "/#proof", label: "Reviews" },
  { to: "/#contact", label: "Contact" },
  { to: "/#storybook", label: "Notebook" },
];

const secondaryLinks = [
  { to: "/travel-agents", label: "For Professionals" },
];

/** Height of the fixed header, so sections land just below it. */
export const HEADER_OFFSET = 88;

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, to: string) => {
    setOpen(false);
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      if (location.pathname === "/") {
        scrollToId(id);
      } else {
        navigate("/");
        setTimeout(() => scrollToId(id), 150);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-5 sm:px-6 lg:px-12">
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src={dennisIllustration}
            alt="Dennis Gerrits logo"
            className="h-12 w-12 sm:h-16 sm:w-16 object-contain -my-2 sm:-my-4 shrink-0"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(36%) sepia(89%) saturate(2876%) hue-rotate(7deg) brightness(95%) contrast(105%)",
            }}
          />
          <span className="font-heading text-xl sm:text-2xl tracking-wider text-primary truncate">Dennis Gerrits</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleNavClick(e, link.to)}
              className={cn(
                "font-body text-sm tracking-wide transition-colors hover:text-secondary",
                location.pathname === link.to ? "text-secondary font-medium" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-border/60" aria-hidden />
          {secondaryLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleNavClick(e, link.to)}
              className={cn(
                "font-body text-xs tracking-[0.15em] uppercase transition-colors hover:text-secondary",
                location.pathname === link.to ? "text-secondary" : "text-foreground/40"
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
              onClick={(e) => handleNavClick(e, link.to)}
              className={cn(
                "block font-body text-lg py-2 transition-colors",
                location.pathname === link.to ? "text-secondary font-medium" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-border/40">
            {secondaryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className="block font-body text-sm tracking-[0.15em] uppercase py-2 text-foreground/50 hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
    {/* Spacer so page content never sits underneath the fixed header. */}
    <div aria-hidden className="h-[68px] sm:h-[88px]" />
    </>
  );
};

export default Header;
