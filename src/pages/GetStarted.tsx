import React, { useEffect } from "react";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle } from "lucide-react";

const GetStarted = () => {
  // Automatically redirect to Calendly after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://calendly.com/saltarelliwebstudio/30min";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      <Starfield />
      <Header />

      <section className="relative pt-32 pb-20 px-4 md:px-6 flex-1 flex items-center">
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12">
            <Calendar className="mx-auto mb-6 text-primary" size={64} />
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Let's Build Something Amazing Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Book a free 30-minute discovery call to discuss your website vision, 
              goals, and how we can collaborate to make it happen.
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm">
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-heading font-semibold mb-2">No Pressure, Just Conversation</h3>
                  <p className="text-muted-foreground">
                    We'll chat about your business, your goals, and explore if we're a good fit
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-heading font-semibold mb-2">30 Minutes, Your Schedule</h3>
                  <p className="text-muted-foreground">
                    Pick a time that works for you—virtual or in-person, whatever's convenient
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Get Clear Next Steps</h3>
                  <p className="text-muted-foreground">
                    Leave the call with a clear understanding of timeline, process, and pricing
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button variant="hero" size="lg" className="w-full md:w-auto" asChild>
                <a href="https://calendly.com/saltarelliwebstudio/30min" target="_blank" rel="noopener noreferrer">
                  Schedule Your Free Discovery Call
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Redirecting to booking calendar in a few seconds...
              </p>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
