import React from "react";
import { Link } from "react-router-dom";
import { Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";

const Services = () => {
  const creationFeatures = [
    "1-3 week turnaround",
    "Collaborative revision process",
    "Professional design and build",
    "Domain setup & basic SEO",
    "Mobile-responsive design",
    "Contact form integration",
  ];

  const redesignFeatures = [
    "1-3 week turnaround",
    "Collaborative revision process",
    "Modern, responsive design",
    "SEO optimization",
    "Content migration",
    "Performance improvements",
  ];

  const extras = [
    { service: "Additional revisions", price: "$50 each" },
    { service: "Each new page", price: "$50" },
    { service: "Domain connection", price: "$25" },
    { service: "Website inspection plan", price: "$10/month", description: "Monthly health checks, SEO monitoring, and uptime verification" },
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
            Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Quality web solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-card hover:-translate-y-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Website Creation</CardTitle>
                <p className="text-sm text-muted-foreground">Build your new website from scratch</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {creationFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/get-started">Get a Quote</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-card hover:-translate-y-2 border-primary scale-105 animate-scale-in">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Website Redesign</CardTitle>
                <p className="text-sm text-muted-foreground">Refresh and modernize your existing site</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {redesignFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/get-started">Get a Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Terms & Conditions */}
          <div className="text-center mb-16">
            <Card className="max-w-xl mx-auto p-6">
              <CardContent className="flex flex-col items-center gap-4 pt-6">
                <AlertCircle className="text-primary" size={32} />
                <h3 className="text-xl font-heading font-semibold">Terms of Service</h3>
                <p className="text-sm text-muted-foreground">
                  View our complete terms and conditions
                </p>
                <Button variant="cosmic" asChild>
                  <a href="/terms-of-service.pdf" download="Saltarelli_Web_Studio_Terms_of_Service.pdf" rel="noopener noreferrer">
                    <Download size={20} className="mr-2" />
                    Download Terms of Service
                  </a>
                </Button>
              </CardContent>
            </Card>
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
            Let's discuss your project and create a custom quote
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