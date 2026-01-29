import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";

export const StickyBookButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button 
        variant="hero" 
        size="lg" 
        className="shadow-2xl hover:scale-105 transition-transform duration-300"
        asChild
      >
        <TrackedLink 
          to="/get-started"
          trackingLabel="sticky_book_call"
          className="flex items-center gap-2"
        >
          <Calendar size={20} />
          <span className="hidden sm:inline">Book a Call</span>
        </TrackedLink>
      </Button>
    </div>
  );
};
