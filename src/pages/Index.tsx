import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, Clock, DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { WorkflowStep } from "@/components/WorkflowStep";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import logo from "@/assets/sws-logo.png";

const Index = () => {
  const portfolioItems = [
    {
      title: "Pop's Landscaping",
      description: "Professional website creation to amplify their online presence and attract higher quality leads",
      category: "Landscaping",
      imageUrl: "/lovable-uploads/pops-landscaping.png",
      liveUrl: "https://popslandscaping.ca",
    },
    {
      title: "Genius Fitness & MMA",
      description: "Modern fitness studio website with class scheduling and member portal",
      category: "Fitness & Wellness",
      imageUrl: "/lovable-uploads/f85c8a0e-5816-4475-b06f-7f5e11fea28d.png",
      liveUrl: "https://www.geniusfitnessandmma.com",
    },
    {
      title: "CDS Lawn Care Services",
      description: "Professional lawn care service website with service packages, online quotes, and seasonal maintenance scheduling.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/2f0cdffd-2fae-4ffa-85d7-d2d01a0cc1d5.png",
      liveUrl: "https://sites.google.com/view/cds-lawn-care-services/home?authuser=1",
    },
    {
      title: "The Carrot Effect",
      description: "Professional consulting firm website with resource library",
      category: "Business Services",
      imageUrl: "/lovable-uploads/4a288da7-0dfe-401d-8145-ae4a58e5ac0b.png",
      liveUrl: "https://thecarroteffect.ca",
    },
    {
      title: "Mom Duke's Authentic Jamaican Cuisine",
      description: "Restaurant website with online ordering and catering services",
      category: "Food & Restaurant",
      imageUrl: "/lovable-uploads/52f46296-b829-46d0-8c4f-2729a1d3cf97.png",
      liveUrl: "https://www.momdukes2020.com",
    },
  ];

  const workflowSteps = [
    {
      title: "Discovery",
      description: "We connect to discuss your vision and understand your project scope — what you need, who you're reaching, and how we can bring it to life.",
    },
    {
      title: "Design",
      description: "I create a free concept website based on your ideas, giving you a clear visual of what you'll be getting before any commitment.",
    },
    {
      title: "Build",
      description: "After signatures and payment, we collaborate to refine the concept and perfect every detail until the website matches your vision.",
    },
    {
      title: "Launch & Support",
      description: "I handle domain setup, provide solid SEO, and offer ongoing maintenance. Prefer full ownership? A one-time buyout option is available.",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Get a fully custom website in just a few days, not weeks.",
    },
    {
      icon: Star,
      title: "Proven Value",
      description: "See real results from real clients with verified reviews.",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Custom websites and redesigns for just a few hundred dollars.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
      <Starfield />
      
      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            {/* Floating Logo */}
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
                <img
                  src={logo}
                  alt="Saltarelli Web Studio"
                  className="h-32 w-32 md:h-40 md:w-40 relative z-10 drop-shadow-2xl"
                  width={160}
                  height={160}
                  fetchPriority="high"
                />
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
            >
              Turn your dreams into{" "}
              <span className="text-primary glow-text">reality</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Let's collaborate to create something amazing. Book a free discovery call and turn your vision into a beautiful, functional website.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Button variant="hero" size="lg" asChild className="text-base">
                <Link to="/get-started" className="gap-2">
                  Book a Discovery Call
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="cosmic" size="lg" asChild className="text-base">
                <a href="#pricing">View Services</a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
          >
            <motion.div className="w-1.5 h-3 bg-foreground/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <FadeIn className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Hi, I'm <span className="text-primary">Adam</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              I'm a web designer from Ontario who builds clean, engaging websites that help businesses thrive.
              I combine practical design with quality workmanship — raised to believe if you won't do your best, don't bother.
            </p>
            <Button variant="hero" asChild>
              <Link to="/about">Learn More About Me</Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="glass group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 h-full">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon
                        className="text-primary mb-4"
                        size={44}
                      />
                    </motion.div>
                    <CardTitle className="text-xl font-heading">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services & Pricing */}
      <section id="pricing" className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Your Website, <span className="text-primary">Your Way</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Custom solutions for new builds and redesigns
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8">
            <StaggerItem>
              <PricingCard
                title="Website Creation"
                price=""
                description="Build your new website from scratch"
                features={[
                  "1-3 week turnaround",
                  "1 round of revisions included",
                  "Professional design and build",
                  "Domain setup & basic SEO",
                  "Additional features may increase cost",
                ]}
              />
            </StaggerItem>
            <StaggerItem>
              <PricingCard
                title="Website Redesign"
                price=""
                description="Refresh and modernize your existing site"
                features={[
                  "1-3 week turnaround",
                  "1 round of revisions included",
                  "Modern, responsive design",
                  "SEO optimization included",
                  "Additional features may increase cost",
                ]}
                popular={true}
              />
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.4} className="text-center">
            <p className="text-sm text-muted-foreground">
              Additional revisions: $50 each • New pages: $50 each • Late fees may apply after 3 weeks
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              My Simple <span className="text-primary">4-Step Process</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              From concept to launch in just 1-3 weeks
            </p>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            {workflowSteps.map((step, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <WorkflowStep number={index + 1} title={step.title} description={step.description} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Featured <span className="text-primary">Work</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Real results for real businesses
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-10">
            {portfolioItems.map((item, index) => (
              <StaggerItem key={index}>
                <PortfolioCard {...item} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              What Clients <span className="text-primary">Say</span>
            </h2>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <Star size={24} className="fill-primary text-primary" />
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <ScaleIn>
            <TestimonialCard
              quote="I would highly recommend Adam if you are looking to refresh your website. He did a fantastic job for us and we are really happy with the results"
              author="Owner"
              business="Mom Duke's Authentic Jamaican Cuisine"
              rating={5}
            />
          </ScaleIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <ScaleIn>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-secondary opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
              <div className="relative p-8 md:p-12 lg:p-16 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-6"
                >
                  <Sparkles className="text-white" size={48} />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                  Ready to Discuss Your Website?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
                  Schedule a free 15-minute call and let's explore how we can make your website dreams a reality
                </p>
                <Button
                  size="lg"
                  asChild
                  className="bg-background text-foreground hover:bg-background/90 font-semibold shadow-lg"
                >
                  <Link to="/get-started" className="gap-2">
                    Book Your Discovery Call
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </ScaleIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
