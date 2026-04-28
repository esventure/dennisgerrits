import { Link } from "react-router-dom";

const Footer = () => (
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
            {[
              { to: "/#about", label: "About Me" },
              { to: "/#day", label: "A Day Together" },
              { to: "/#proof", label: "Reviews" },
              { to: "/#stories", label: "Stories" },
              { to: "/#contact", label: "Get in Touch" },
              { to: "/get-inspired", label: "Get Inspired" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
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
            <Link
              to="/travel-agents"
              className="block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Travel Agents & Concierges
            </Link>
            <Link
              to="/travel-agents"
              className="block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Universities & Schools
            </Link>
          </nav>
          <p className="font-body text-primary-foreground/40 text-xs mt-8">
            © {new Date().getFullYear()} Dennis Gerrits. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
