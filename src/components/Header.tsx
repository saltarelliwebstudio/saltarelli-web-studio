import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import logo from "@/assets/sws-logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks: Array<{
    href: string;
    label: string;
    external?: boolean;
    badge?: string;
  }> = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/ai-operator-kit", label: "AI Operator Kit", badge: "FREE" },
    { href: "https://saltarelli-hub.vercel.app/login", label: "Dashboard", external: true },
  ];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <header
      style={{ top: "var(--banner-height, 0px)" }}
      className={`fixed left-0 right-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-5 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <motion.img
              src={logo}
              alt="Saltarelli Web Studio"
              className="h-10 w-10 md:h-12 md:w-12"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
            <span className="font-heading font-bold text-lg md:text-xl text-foreground hidden sm:block">
              Saltarelli Web Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-sm font-medium transition-colors duration-300 inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground"
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-bold uppercase bg-primary/20 text-primary border border-primary/30 rounded-full px-1.5 py-0.5 leading-none">
                      {link.badge}
                    </span>
                  )}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 inline-flex items-center gap-1.5 ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-bold uppercase bg-primary/20 text-primary border border-primary/30 rounded-full px-1.5 py-0.5 leading-none">
                      {link.badge}
                    </span>
                  )}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  )}
                </Link>
              )
            )}
            <Button variant="hero" size="sm" asChild className="ml-2">
              <TrackedLink to="/get-started" trackingLabel="header_book_call" className="gap-2">
                Book a Call
                <ArrowRight size={16} />
              </TrackedLink>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center text-foreground"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMenuOpen(false)}
                style={{ top: 0, left: 0 }}
              />

              {/* Slide-in Menu */}
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-card/95 backdrop-blur-2xl border-l border-border/50 lg:hidden flex flex-col"
                style={{ zIndex: 40 }}
              >
                <div className="flex flex-col h-full pt-24 px-8 pb-8">
                  <div className="flex flex-col gap-6 flex-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        custom={index}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                      >
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl font-heading font-semibold transition-colors duration-300 inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                            {link.badge && (
                              <span className="text-[10px] font-bold uppercase bg-primary/20 text-primary border border-primary/30 rounded-full px-1.5 py-0.5 leading-none">
                                {link.badge}
                              </span>
                            )}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className={`text-2xl font-heading font-semibold transition-colors duration-300 inline-flex items-center gap-2 ${
                              location.pathname === link.href
                                ? "text-primary"
                                : "text-foreground/80 hover:text-foreground"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                            {link.badge && (
                              <span className="text-[10px] font-bold uppercase bg-primary/20 text-primary border border-primary/30 rounded-full px-1.5 py-0.5 leading-none">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <motion.div
                    custom={navLinks.length}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="mt-auto"
                  >
                    <Button variant="hero" size="lg" asChild className="w-full">
                      <TrackedLink to="/get-started" trackingLabel="header_mobile_book_call" className="gap-2">
                        Book a Call
                        <ArrowRight size={18} />
                      </TrackedLink>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
