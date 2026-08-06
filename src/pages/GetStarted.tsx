import React from "react";
import { motion } from "framer-motion";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

const GetStarted = () => {

  return (
    <>
      <SEO
        canonical="/get-started"
        title="Free Website Demo"
        description="Book a free 15-minute review of your website, Google profile, and reviews. Honest feedback and clear next steps, no pressure."
      />
    <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
      <Starfield />
      
      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      
      <Header />

      <section className="relative min-h-[80svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
        {/* max-w-5xl so the inline Calendly gets its two-column layout. */}
        <div className="container mx-auto max-w-5xl relative z-10">
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
              Free Website Demo
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A free 15-minute look at your website, Google profile, and reviews.
              You'll leave with honest feedback and clear next steps, no pressure.
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm">
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Honest Review, No Pressure</h3>
                  <p className="text-muted-foreground">
                    We'll look at your site, your Google profile, and how customers actually find you — straight feedback, no pitch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-heading font-semibold mb-2">15 Minutes, Your Schedule</h3>
                  <p className="text-muted-foreground">
                    Pick a time that works for you. Online and quick — get in, get clarity, get out.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Walk Away With Clear Next Steps</h3>
                  <p className="text-muted-foreground">
                    You'll leave knowing exactly what's costing you leads and the simplest way to fix it — whether you work with me or not.
                  </p>
                </div>
              </div>
            </div>

            <div id="apply">
              <CalendlyEmbed trackingLabel="get_started_inline" />
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
