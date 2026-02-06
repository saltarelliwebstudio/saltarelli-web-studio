import React from "react";
import { Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { FadeIn, ScaleIn } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedLink } from "@/components/TrackedLink";

const Services = () => {
  const creationFeatures = [
    "1-3 week setup",
    "Ongoing updates and refinements",
    "Professional design and managed hosting",
    "Domain, hosting, and continuous SEO",
    "Mobile-responsive design",
    "Contact form integration",
    "Custom features available as add-ons",
  ];

  const redesignFeatures = [
    "1-3 week migration",
    "Ongoing updates and refinements",
    "Modern, responsive design",
    "Continuous SEO optimization",
    "Content migration",
    "Ongoing performance monitoring",
    "Custom features available as add-ons",
  ];

  const chatWidgetFeatures = [
    "Trained on your business knowledge",
    "Answers customer questions 24/7",
    "Qualifies leads automatically",
    "Seamless website integration",
    "Continuously improved and monitored",
    "Matches your brand's look and feel",
  ];

  const terms = [
    "50% deposit required to begin work (non-refundable)",
    "Final payment due within 72 hours of project completion",
    "Projects typically complete in 1-3 weeks",
    "Client-caused delays beyond 3 weeks may incur $100/week late fee (after 48-hour grace period)",
    "Deposit forfeited if client cancels mid-project",
    "Deposit refunded if Saltarelli Web Studio cancels",
    "Major post-launch updates quoted separately",
  ];

  return (
    <>
      <SEO
        canonical="/services"
        title="Managed Web Services & Pricing — Professional Websites"
        description="Managed web services in Ontario. Professional websites with ongoing support, optimization, and care. Simple monthly plans."
      />
    <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
      <Starfield />
      
      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          {/* Monitor Icon */}
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
              <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                <Monitor className="w-14 h-14 md:w-18 md:h-18 text-white" />
              </div>
            </motion.div>
          </motion.div>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Custom Websites
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-xl text-muted-foreground">
              Simple monthly plans, transparent process, ongoing support
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="order-2 lg:order-1">
              <PricingCard
                title="Website Redesign"
                price=""
                description="Migrate to a modern, managed website"
                features={redesignFeatures}
              />
            </div>
            <div className="order-1 lg:order-2">
              <PricingCard
                title="Website Creation"
                price=""
                description="Launch a professionally managed website"
                features={creationFeatures}
                popular={true}
              />
            </div>
            <div className="order-3">
              <PricingCard
                title="Chat Widget"
                price=""
                description="An AI assistant on your site that knows your business"
                features={chatWidgetFeatures}
              />
            </div>
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 relative z-10 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose your plan and let your website work for you
          </p>
          <Button variant="hero" size="lg" asChild>
            <TrackedLink to="/get-started" trackingLabel="services_book_call">
              Book a Discovery Call
            </TrackedLink>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Services;
