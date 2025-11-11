import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StickyBookButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button 
        variant="hero" 
        size="lg" 
        className="shadow-2xl hover:scale-105 transition-transform duration-300"
        asChild
      >
        <Link 
          to="/get-started"
          className="flex items-center gap-2"
        >
          <Calendar size={20} />
          <span className="hidden sm:inline">Book a Call</span>
        </Link>
      </Button>
    </div>
  );
};
