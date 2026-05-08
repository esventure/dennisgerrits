import { Link, useLocation, useNavigate } from "react-router-dom";

const exploreLinks = [
  { to: "/#about", label: "About Me" },
  { to: "/#how-it-works", label: "How I Work" },
  { to: "/#day", label: "A Day Together" },
  { to: "/#proof", label: "Reviews" },
  { to: "/#stories", label: "Stories" },
  { to: "/get-inspired", label: "Get Inspired" },
  { to: "#", label: "Two Stories, One City (Podcast)" },
  { to: "/#contact", label: "Get in Touch" },
];

const proLinks = [
  { to: "/travel-agents", label: "Travel Agents & Concierges" },
  { to: "/travel-agents#universities", label: "Universities & Schools" },
  { to: "/#contact", label: "Speaking" },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, to: string) => {
    if (to === "#") return;
    // Same-page hash on home: smooth-scroll
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      if (location.pathname === "/") scroll();
      else {
        navigate("/");
        setTimeout(scroll, 80);
      }
      return;
    }
    // Cross-page hash like "/travel-agents#universities"
    if (to.includes("#")) {
      const [path, id] = to.split("#");
      if (location.pathname === path) {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t border-border/40 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-3xl mb-4">Dennis Gerrits</h3>
            <p className="font-body text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              A personal, trust-based way of experiencing places. Guided by someone who feels like a friend.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">Explore</h4>
            <nav className="space-y-2">
              {exploreLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => handleClick(e, link.to)}
                  className="block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">For Professionals</h4>
            <nav className="space-y-2">
              {proLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => handleClick(e, link.to)}
                  className="block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="font-body text-primary-foreground/40 text-xs mt-8">
              © {new Date().getFullYear()} Dennis Gerrits. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
