import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/sws-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
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
                { href: "/contact", label: "Contact" },
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
                href="mailto:info@saltarelliwebstudio.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} />
                <span className="text-sm">info@saltarelliwebstudio.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={16} />
                <span className="text-sm">(123) 456-7890</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Saltarelli Web Studio. All rights reserved.
          </p>
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};