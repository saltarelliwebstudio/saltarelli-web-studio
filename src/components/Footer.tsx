import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/sws-logo.png";

export const Footer = () => {
  return (
    <footer className="relative z-20 bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Saltarelli Web Studio"
                className="h-10 w-10 rounded-full bg-white p-1"
              />
              <span className="font-heading font-bold text-lg">
                Saltarelli Web Studio
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Bringing your vision to life with tailored web design solutions,
              because your success is my priority.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/saltarelliwebstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577498722193"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="tel:+12899314142"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={16} />
                <span className="text-sm">289 931 4142</span>
              </a>
              <a
                href="mailto:saltarelliwebstudio@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} />
                <span className="text-sm">saltarelliwebstudio@gmail.com</span>
              </a>
              <p className="text-sm text-muted-foreground italic">
                Typical response time: 24-48 hours
              </p>
              <Link to="/get-started">
                <Button variant="hero" size="sm" className="mt-4">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Saltarelli Web Studio. All rights reserved.
          </p>
          <a
            href="https://drive.google.com/file/d/1EXs1LRJiDeN5sCWgr-3OCDAVgrW9Fndg/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};