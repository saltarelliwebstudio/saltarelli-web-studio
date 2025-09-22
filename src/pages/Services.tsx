import React from "react";
import { Link } from "react-router-dom";
import { Download, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";

const Services = () => {
  const basicFeatures = [
    "1-3 week turnaround",
    "1 round of revisions",
    "Built on Google Sites, Carrd.co, or Canva (your choice)",
    "SEO basics & social media setup advice",
    "Mobile-responsive design",
    "Contact form integration",
    "Basic analytics setup",
    "50% non-refundable deposit required",
  ];

  const growthFeatures = [
    "1-3 week turnaround",
    "2 rounds of revisions",
    "Premium platform options (Squarespace available)",
    "Advanced SEO optimization",
    "Enhanced design polish",
    "Priority support",
    "Content strategy consultation",
    "50% non-refundable deposit required",
  ];

  const extras = [
    { service: "Additional revisions", price: "$50 each" },
    { service: "Rush delivery (under 1 week)", price: "Quote on request" },
    { service: "Logo design", price: "$150" },
    { service: "Content writing", price: "$75/page" },
    { service: "Domain setup assistance", price: "$25" },
    { service: "Email setup", price: "$50" },
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
    <div className="min-h-screen bg-background text-foreground relative">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Services & Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Simple plans, transparent pricing, quality results
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <PricingCard
              title="Basic Plan"
              price="$499"
              description="Perfect for small businesses and startups"
              features={basicFeatures}
            />
            <PricingCard
              title="Growth Plan"
              price="$799"
              description="Ideal for established businesses wanting more"
              features={growthFeatures}
              popular={true}
            />
          </div>

          {/* Platform Options */}
          <Card className="max-w-4xl mx-auto mb-16">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Platform Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Basic Plan Platforms</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary mt-0.5" size={16} />
                      <span className="text-sm">
                        <strong>Google Sites:</strong> Free, easy to maintain, great for simple sites
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary mt-0.5" size={16} />
                      <span className="text-sm">
                        <strong>Carrd:</strong> Beautiful one-page sites, perfect for portfolios
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary mt-0.5" size={16} />
                      <span className="text-sm">
                        <strong>Canva:</strong> Visual design focus, easy editing
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Growth Plan Platforms</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary mt-0.5" size={16} />
                      <span className="text-sm">All Basic Plan platforms included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary mt-0.5" size={16} />
                      <span className="text-sm">
                        <strong>Squarespace:</strong> Premium features, e-commerce ready
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary mt-0.5" size={16} />
                      <span className="text-sm">
                        <strong>Custom recommendations</strong> based on your needs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card className="max-w-4xl mx-auto mb-16">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Additional Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {extras.map((extra, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="text-sm">{extra.service}</span>
                    <span className="font-semibold text-primary">{extra.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="max-w-4xl mx-auto mb-16">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                <AlertCircle className="text-primary" size={24} />
                Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {terms.map((term, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm text-muted-foreground">{term}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Download PDF */}
          <div className="text-center">
            <Button variant="cosmic" size="lg" asChild>
              <a href="/pricing.pdf" download>
                <Download size={20} className="mr-2" />
                Download Complete Pricing Guide
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Get our full pricing guide with all details and terms
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose your plan and let's bring your website to life
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Book Your Project</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;