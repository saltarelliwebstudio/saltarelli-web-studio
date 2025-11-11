import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Saltarelli Web Studio"
              className="h-12 w-12 group-hover:scale-110 transition-transform"
            />
            <span className="font-heading font-bold text-xl text-foreground hidden sm:block">
              Saltarelli Web Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-foreground/80 hover:text-primary transition-all duration-300 relative ${
                  location.pathname === link.href ? "text-primary" : ""
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:bottom-0 after:left-0 after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="hero" size="sm" asChild>
              <a href="https://calendly.com/saltarelliwebstudio/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden -mx-6 mt-4 pb-4 border-t border-border/20 pt-4 bg-background/95 backdrop-blur-lg shadow-lg animate-slide-up">
            <div className="flex flex-col gap-4 px-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-foreground/80 hover:text-primary transition-all duration-300 animate-fade-in ${
                    location.pathname === link.href ? "text-primary font-semibold" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="hero" size="sm" asChild className="w-full animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <a href="https://calendly.com/saltarelliwebstudio/30min" target="_blank" rel="noopener noreferrer">
                  Book a Call
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};