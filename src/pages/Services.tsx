import React from "react";
import { Link } from "react-router-dom";
import { Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { FadeIn, ScaleIn } from "@/components/motion";
import { SEO } from "@/components/SEO";

const Services = () => {
  const creationFeatures = [
    "1-3 week turnaround",
    "1 round of revisions included",
    "Professional design and build",
    "Domain setup & basic SEO",
    "Mobile-responsive design",
    "Contact form integration",
    "Additional features may increase cost",
  ];

  const redesignFeatures = [
    "1-3 week turnaround",
    "1 round of revisions included",
    "Modern, responsive design",
    "SEO optimization",
    "Content migration",
    "Performance improvements",
    "Additional features may increase cost",
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
        title="Web Design Services & Pricing — Custom Websites"
        description="Affordable web design services in Ontario. Website creation and redesign starting at a few hundred dollars. Mobile-responsive, SEO-optimized, fast turnaround."
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
              Simple plans, transparent process, quality results
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <PricingCard
              title="Website Creation"
              price=""
              description="Build your new website from scratch"
              features={creationFeatures}
              popular={true}
            />
            <PricingCard
              title="Website Redesign"
              price=""
              description="Refresh and modernize your existing site"
              features={redesignFeatures}
            />
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
            Choose your plan and let's bring your website to life
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/get-started">
              Book a Discovery Call
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Services;