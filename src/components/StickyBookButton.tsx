import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { CALENDLY_URL } from "@/components/CalendlyEmbed";
import { useChatOpen } from "@/lib/chatOpenStore";

export const StickyBookButton = () => {
  // The open chat panel covers this corner, so step out of its way.
  if (useChatOpen()) return null;

  return (
    // Sits to the LEFT of the chat bubble, which owns bottom-6 right-6.
    // Keep these two in sync if either moves.
    <div className="fixed bottom-6 right-24 z-50 animate-fade-in">
      <Button
        variant="hero"
        size="lg"
        className="shadow-2xl hover:scale-105 transition-transform duration-300"
        asChild
      >
        <TrackedExternalLink
          href={CALENDLY_URL}
          trackingLabel="sticky_book_call"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Calendar size={20} />
          <span className="hidden sm:inline">Book a Free Demo</span>
        </TrackedExternalLink>
      </Button>
    </div>
  );
};
