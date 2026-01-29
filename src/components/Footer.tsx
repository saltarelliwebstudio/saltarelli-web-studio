import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import logo from "@/assets/sws-logo.png";

export const Footer = () => {
  return (
    <footer className="relative z-20 glass-strong border-t border-border/50 mt-auto">
      <div className="container mx-auto px-5 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Logo and Description */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Saltarelli Web Studio" className="h-10 w-10" />
              <span className="font-heading font-bold text-lg">Saltarelli Web Studio</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Managed websites, AI agents, and automations that keep your business running — because your success is my priority.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/saltarelliwebstudio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577498722193" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/portfolio", label: "Portfolio" }].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a href="tel:+12899314142" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone size={16} />
                <span className="text-sm">(289) 931-4142</span>
              </a>
              <a href="mailto:saltarelliwebstudio@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail size={16} />
                <span className="text-sm">saltarelliwebstudio@gmail.com</span>
              </a>
              <p className="text-sm text-muted-foreground italic pt-2">Response time: 24-48 hours</p>
              <Button variant="hero" size="sm" className="mt-4 w-full sm:w-auto" asChild>
                <TrackedLink to="/get-started" trackingLabel="footer_book_call">Book a Call</TrackedLink>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Saltarelli Web Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
