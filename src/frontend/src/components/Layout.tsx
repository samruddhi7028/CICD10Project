import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import { SiPinterest } from "react-icons/si";
import { EMPTY_RECIPE_SEARCH } from "../App";

const NAV_LINKS = [
  { label: "Home", to: "/" as const },
  { label: "Recipes", to: "/recipes" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Contact", to: "/contact" as const },
];

function NavLink({
  link,
  onClick,
}: { link: (typeof NAV_LINKS)[number]; onClick?: () => void }) {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const isActive =
    pathname === link.to || (link.to !== "/" && pathname.startsWith(link.to));
  const cls = [
    "text-sm font-body font-medium tracking-wide transition-smooth",
    isActive
      ? "text-primary border-b-2 border-primary pb-0.5"
      : "text-foreground/70 hover:text-foreground",
  ].join(" ");

  if (link.to === "/recipes") {
    return (
      <Link
        to="/recipes"
        search={EMPTY_RECIPE_SEARCH}
        onClick={onClick}
        data-ocid={`nav.${link.label.toLowerCase()}_link`}
        className={cls}
      >
        {link.label}
      </Link>
    );
  }
  return (
    <Link
      to={link.to}
      onClick={onClick}
      data-ocid={`nav.${link.label.toLowerCase()}_link`}
      className={cls}
    >
      {link.label}
    </Link>
  );
}

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group"
      data-ocid="nav.logo_link"
    >
      <span className="font-display text-2xl font-semibold text-primary leading-none tracking-tight group-hover:opacity-80 transition-smooth">
        Delicious Bites
      </span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-xs"
      data-ocid="header"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />

        <nav
          className="hidden md:flex items-center gap-8"
          data-ocid="nav.desktop"
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} link={link} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" data-ocid="nav.submit_recipe_button">
            <Button
              variant="default"
              size="sm"
              className="font-body text-xs tracking-wide"
            >
              Submit a Recipe
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground transition-smooth"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-ocid="nav.hamburger_toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden bg-card border-t border-border px-4 pb-6 pt-4 flex flex-col gap-5"
          data-ocid="nav.mobile_menu"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              link={link}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            data-ocid="nav.mobile_submit_button"
          >
            <Button
              variant="default"
              size="sm"
              className="w-full font-body text-xs tracking-wide"
            >
              Submit a Recipe
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Vegan",
] as const;

function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-semibold text-primary">
              Delicious Bites
            </span>
            <p className="mt-2 text-sm text-muted-foreground font-body max-w-xs">
              Recipes & stories for every kitchen. From quick weeknight dinners
              to showstopping desserts.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-ocid="footer.instagram_link"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                data-ocid="footer.pinterest_link"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <SiPinterest size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                data-ocid="footer.facebook_link"
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-foreground/50 mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  {link.to === "/recipes" ? (
                    <Link
                      to="/recipes"
                      search={EMPTY_RECIPE_SEARCH}
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-body"
                      data-ocid={`footer.${link.label.toLowerCase()}_link`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-body"
                      data-ocid={`footer.${link.label.toLowerCase()}_link`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-foreground/50 mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/recipes"
                    search={{ ...EMPTY_RECIPE_SEARCH, category: cat }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-body"
                    data-ocid={`footer.category_${cat.toLowerCase()}_link`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground font-body">
            © {year} Delicious Bites. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Built with love using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
