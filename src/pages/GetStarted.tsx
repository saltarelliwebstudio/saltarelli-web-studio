import React from "react";
import { motion } from "framer-motion";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

const GetStarted = () => {

  return (
    <>
      <SEO
        canonical="/get-started"
        title="Book a Free Discovery Call — Get Started Today"
        description="Schedule a free 15-minute discovery call to discuss your web design project. No pressure, just conversation about your goals and how we can help."
      />
    <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
      <Starfield />
      
      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      
      <Header />

      <section className="relative min-h-[80svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12">
            {/* Glowing Calendar Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex justify-center"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-150" />
                <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                  <Calendar className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              </motion.div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Let's Build Something Amazing Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Book a free 15-minute discovery call to discuss your project, 
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
                    We'll chat about your business, your goals, and explore if we're a good fit for your project
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-heading font-semibold mb-2">15 Minutes, Your Schedule</h3>
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
                <a href="https://calendly.com/saltarelliwebstudio/15min" target="_blank" rel="noopener noreferrer">
                  Schedule Your Free Discovery Call
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default GetStarted;
