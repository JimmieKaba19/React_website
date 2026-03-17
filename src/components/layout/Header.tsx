import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";
// import { industries } from "@/data/industries";
import logoColor from "@/assets/logo-color.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubmenu(null);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },

    {
      label: "Solutions",
      href: "/solutions",
      children: solutions.map((s) => ({
        label: s.shortTitle,
        href: `/solutions/${s.slug}`,
        description: s.description.slice(0, 80) + "...",
        icon: s.icon,
      })),
    },
    // {
    //   label: "Industries",
    //   href: "/industries",
    //   children: industries.map((i) => ({
    //     label: i.title,
    //     href: `/industries/${i.slug}`,
    //     description: i.description.slice(0, 80) + "...",
    //     icon: i.icon,
    //   })),
    // },
    { label: "Partners", href: "/partners" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  // commenting out resources for now, can add back later when we have more content

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-transparent backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center relative z-50">
              <img
                src={logoColor}
                alt="Tandem Technologies"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                      location.pathname === item.href ||
                      location.pathname.startsWith(item.href + "/")
                        ? isScrolled 
                          ? "text-primary bg-primary/10 border border-primary/20"
                          : "text-green bg-white/20 border border-white/30"
                        : isScrolled
                          ? "text-foreground hover:text-green hover:bg-green/10"
                          : "text-white hover:text-green hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Horizontal Mega Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card rounded-xl shadow-2xl border border-border overflow-hidden"
                        style={{ width: "min(90vw, 900px)" }}
                      >
                        <div className="p-8">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                            {item.label}
                          </h3>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                            {item.children.map((child, idx) => {
                              const Icon = child.icon;
                              return (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/60 transition-all duration-200"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                    <Icon className="w-5 h-5 text-accent" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-medium text-foreground group-hover:text-green transition-colors text-sm">
                                      {child.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                      {child.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="border-t border-border/60 mt-6 pt-5 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Explore all {item.label.toLowerCase()}
                            </span>
                            <Link
                              to={item.href}
                              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
                            >
                              View All
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button asChild className="bg-green-600 hover:bg-accent/90 text-accent-foreground">
                <Link to="/contact">Request Consultation</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors relative z-50 ${
                isMobileMenuOpen
                  ? "text-foreground"
                  : isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Slide from Right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-40 lg:hidden shadow-2xl"
            >
              <div className="h-full flex flex-col pt-24 pb-6">
                <nav className="flex-1 overflow-y-auto px-4">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        {item.children ? (
                          <button
                            onClick={() =>
                              setMobileSubmenu(
                                mobileSubmenu === item.label ? null : item.label
                              )
                            }
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                          >
                            {item.label}
                            <ChevronRight
                              className={`h-5 w-5 transition-transform ${
                                mobileSubmenu === item.label ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                              location.pathname === item.href
                                ? "bg-accent/10 text-accent"
                                : "text-foreground hover:bg-muted"
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {item.children && mobileSubmenu === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="py-2 pl-4 space-y-1">
                                {item.children.map((child) => {
                                  const Icon = child.icon;
                                  return (
                                    <Link
                                      key={child.href}
                                      to={child.href}
                                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                    >
                                      <Icon className="w-5 h-5 text-accent" />
                                      <span className="text-sm">{child.label}</span>
                                    </Link>
                                  );
                                })}
                                <Link
                                  to={item.href}
                                  className="flex items-center gap-2 px-4 py-3 text-sm text-accent font-medium"
                                >
                                  View All {item.label}
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="px-4 pt-4 border-t border-border">
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-accent/90 text-accent-foreground"
                  >
                    <Link to="/contact">Request Consultation</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
