import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";

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
    <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Custom Websites
          </h1>
          <p className="text-xl text-muted-foreground">
            Simple plans, transparent process, quality results
          </p>
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
            />
            <PricingCard
              title="Website Redesign"
              price=""
              description="Refresh and modernize your existing site"
              features={redesignFeatures}
              popular={true}
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
  );
};

export default Services;