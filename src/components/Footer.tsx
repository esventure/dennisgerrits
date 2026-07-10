import { Link, useLocation, useNavigate } from "react-router-dom";

const exploreLinks = [
  { to: "/#about", label: "About Me" },
  { to: "/#how-it-works", label: "How I Work" },
  { to: "/#rick-steves", label: "Rick Steves" },
  { to: "/get-inspired", label: "Experiences" },
  { to: "/#podcast", label: "Podcast" },
  { to: "/#proof", label: "Reviews" },
  { to: "/#contact", label: "Contact" },
  { to: "/notebook", label: "Notebook" },
];

const proLinks = [
  { to: "/travel-agents", label: "Travel Agents & Concierges" },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, to: string) => {
    if (to === "#") return;

    const scrollToId = (id: string) => {
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
        if (attempts < 20) {
          requestAnimationFrame(() => tryScroll(attempts + 1));
        }
      };
      tryScroll();
    };

    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      if (location.pathname === "/") scrollToId(id);
      else {
        navigate("/");
        setTimeout(() => scrollToId(id), 50);
      }
      return;
    }

    if (to.includes("#")) {
      const [path, id] = to.split("#");
      if (location.pathname === path) {
        e.preventDefault();
        scrollToId(id);
      }
    }
  };

  return (
    <footer className="border-t border-border/40 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-3xl mb-3">Dennis Gerrits</h3>
            <p className="font-body text-primary-foreground/80 text-sm tracking-wide mb-4">
              Storyteller, Host &amp; Travel Companion
            </p>
            <p className="font-body text-primary-foreground/60 text-xs leading-relaxed max-w-xs">
              Formerly Love My City Tours — now dennisgerrits.com.
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
