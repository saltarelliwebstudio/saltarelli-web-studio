import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { WorkflowStep } from "@/components/WorkflowStep";
import logo from "@/assets/sws-logo.png";

const Index = () => {
  const portfolioItems = [
    {
      title: "Genius Fitness & MMA",
      description: "Modern fitness studio website with class scheduling and member portal",
      category: "Fitness & Wellness",
    },
    {
      title: "Mary N Mae's Tack N Feed",
      description: "E-commerce solution for equestrian supplies and feed store",
      category: "Retail & E-commerce",
    },
    {
      title: "The Carrot Effect",
      description: "Professional consulting firm website with resource library",
      category: "Business Services",
    },
    {
      title: "Mom Duke's Authentic Jamaican Cuisine",
      description: "Restaurant website with online ordering and catering services",
      category: "Food & Restaurant",
    },
  ];

  const workflowSteps = [
    {
      title: "Discovery",
      description: "Initial in-person/virtual consultation, signatures, understanding project scope.",
    },
    {
      title: "Design",
      description: "I create a concept wireframe (using Lovable/Canva). This is only a draft for approval. One included revision; further revisions are $50 each.",
    },
    {
      title: "Build",
      description: "I use my chosen design software to build the official website.",
    },
    {
      title: "Launch & Support",
      description: "Domain setup, basic SEO, and a short post-launch support period with light social media advice to help drive traffic. Final payment due within 72 hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <div className="mb-8 animate-float">
              <img
                src={logo}
                alt="Saltarelli Web Studio"
                className="h-32 w-32 mx-auto rounded-full bg-white p-2 shadow-glow"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Turn your dreams into <span className="text-accent">reality</span>.
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              Bringing your vision to life with tailored web design solutions,
              because your success is my priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="cosmic" size="lg" asChild>
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Hi, I'm Adam
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            I'm a web designer from Ontario who builds clean, engaging websites that help businesses thrive. 
            I combine practical design with quality workmanship — raised to believe if you won't do your best, don't bother.
          </p>
          <Button variant="hero" asChild>
            <Link to="/about">Learn More About Me</Link>
          </Button>
        </div>
      </section>

      {/* Services & Pricing */}
      <section id="pricing" className="py-20 px-6 relative z-10 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <PricingCard
              title="Website Creation"
              price="$499"
              description="Build your new website from scratch"
              features={[
                "1-3 week turnaround",
                "1 round of revisions included",
                "Professional design and build",
                "Domain setup & basic SEO",
                "50% non-refundable deposit required",
              ]}
            />
            <PricingCard
              title="Website Redesign"
              price="$499"
              description="Refresh and modernize your existing site"
              features={[
                "1-3 week turnaround",
                "1 round of revisions included",
                "Modern, responsive design",
                "SEO optimization included",
                "50% non-refundable deposit required",
              ]}
              popular={true}
            />
          </div>

          <div className="text-center">
            <Button variant="cosmic" asChild>
              <a href="/pricing.pdf" download>
                <Download size={16} className="mr-2" />
                Download Pricing PDF
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Additional revisions: $50 each • New pages: $50 each • Late fees may apply after 3 weeks
            </p>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              My Simple 4-Step Process
            </h2>
            <p className="text-lg text-muted-foreground">
              From concept to launch in just 1-3 weeks
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {workflowSteps.map((step, index) => (
              <WorkflowStep
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-6 relative z-10 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results for real businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {portfolioItems.map((item, index) => (
              <PortfolioCard key={index} {...item} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              What Clients Say
            </h2>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="fill-primary text-primary" />
              ))}
            </div>
          </div>

          <TestimonialCard
            quote="I would highly recommend Adam if you are looking to refresh your website. He did a fantastic job for us and we are really happy with the results"
            author="Owner"
            business="Mom Duke's Authentic Jamaican Cuisine"
            rating={5}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-cosmic rounded-2xl p-12 shadow-card">
            <Sparkles className="mx-auto mb-4 text-white" size={48} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
              Ready to Launch Your Website?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's bring your vision to life with a website that works as hard as you do
            </p>
            <Button variant="cosmic" size="lg" asChild>
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;