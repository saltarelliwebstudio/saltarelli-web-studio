import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Star, Sparkles, Clock, DollarSign, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { WorkflowStep } from "@/components/WorkflowStep";
import logo from "@/assets/sws-logo.png";
const Index = () => {
  const portfolioItems = [{
    title: "Genius Fitness & MMA",
    description: "Modern fitness studio website with class scheduling and member portal",
    category: "Fitness & Wellness",
    imageUrl: "/lovable-uploads/f85c8a0e-5816-4475-b06f-7f5e11fea28d.png",
    liveUrl: "https://www.geniusfitnessandmma.com"
  }, {
    title: "CDS Lawn Care Services",
    description: "Professional lawn care service website with service packages, online quotes, and seasonal maintenance scheduling.",
    category: "Home Services",
    imageUrl: "/lovable-uploads/2f0cdffd-2fae-4ffa-85d7-d2d01a0cc1d5.png",
    liveUrl: "https://sites.google.com/view/cds-lawn-care-services/home?authuser=1"
  }, {
    title: "The Carrot Effect",
    description: "Professional consulting firm website with resource library",
    category: "Business Services",
    imageUrl: "/lovable-uploads/4a288da7-0dfe-401d-8145-ae4a58e5ac0b.png",
    liveUrl: "https://thecarroteffect.ca"
  }, {
    title: "Mom Duke's Authentic Jamaican Cuisine",
    description: "Restaurant website with online ordering and catering services",
    category: "Food & Restaurant",
    imageUrl: "/lovable-uploads/52f46296-b829-46d0-8c4f-2729a1d3cf97.png",
    liveUrl: "https://www.momdukes2020.com"
  }];
  const workflowSteps = [{
    title: "Discovery",
    description: "Initial in-person/virtual consultation, signatures, understanding project scope."
  }, {
    title: "Design",
    description: "I create a concept design in Lovable. This is only a draft for approval, and we'll collaborate on revisions as needed."
  }, {
    title: "Build",
    description: "I use the approved draft to create the live, functioning website."
  }, {
    title: "Launch & Support",
    description: "Domain setup, basic SEO, and a short post-launch support period with light social media advice to help drive traffic."
  }];
  return <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-20">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <div className="mb-8 animate-float flex justify-center">
              <img src={logo} alt="Saltarelli Web Studio" className="h-48 w-48 drop-shadow-lg" />
            </div>
            <h1 className="text-5xl font-heading font-bold mb-6 md:text-6xl animate-fade-in">
              Turn your dreams into <span className="text-orange-500">reality.</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-4 max-w-3xl mx-auto md:text-xl animate-fade-in stagger-1">
              Let's collaborate to create something amazing. Book a free discovery call and let's discuss how we can turn your vision into a beautiful, functional website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-2">
              <Button variant="hero" size="lg" asChild>
                <Link to="/get-started">
                  Book a Discovery Call <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="cosmic" size="lg" asChild>
                <a href="tel:+12898138298">Call Our AI Assistant</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 px-4 md:px-6 relative z-10">
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

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/30 backdrop-blur-sm hover-scale transition-all duration-300 hover:shadow-card animate-fade-in">
              <CardHeader>
                <Clock className="text-primary mb-4 transition-transform duration-300 hover:scale-110" size={40} />
                <CardTitle className="text-xl font-heading">Quick Turnaround</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Time Commitment? I can produce a fully custom website for you in just a few days!</p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm hover-scale transition-all duration-300 hover:shadow-card animate-fade-in stagger-1">
              <CardHeader>
                <Star className="text-primary mb-4 transition-transform duration-300 hover:scale-110" size={40} />
                <CardTitle className="text-xl font-heading">Proven Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Value Uncertainty? Check out some of my other pieces of work inside of the portfolio!                                    </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm hover-scale transition-all duration-300 hover:shadow-card animate-fade-in stagger-2">
              <CardHeader>
                <DollarSign className="text-primary mb-4 transition-transform duration-300 hover:scale-110" size={40} />
                <CardTitle className="text-xl font-heading">Tight Budget?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Cost Concern? I can deliver a fully functional website to you for just a few hundred dollars.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground">
            Professional web solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Website Creation */}
          <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-card hover:-translate-y-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Website Creation</CardTitle>
              <CardDescription>Build your new website from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">1-3 week turnaround</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Collaborative revision process</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Professional design and build</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Domain setup & basic SEO</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Mobile-responsive design</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Contact form integration</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/get-started">Get a Quote</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Website Redesign */}
          <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-card hover:-translate-y-2 border-primary scale-105 animate-scale-in">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
              MOST POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Website Redesign</CardTitle>
              <CardDescription>Refresh and modernize your existing site</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">1-3 week turnaround</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Collaborative revision process</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Modern, responsive design</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">SEO optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Content migration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-primary mt-1" size={16} />
                  <span className="text-sm text-muted-foreground">Performance improvements</span>
                </li>
              </ul>
              <Button variant="hero" className="w-full" asChild>
                <Link to="/get-started">Get a Quote</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4 md:px-6 relative z-10">
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
            {workflowSteps.map((step, index) => <WorkflowStep key={index} number={index + 1} title={step.title} description={step.description} />)}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-4 md:px-6 relative z-10 bg-card/30 backdrop-blur-sm">
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
            {portfolioItems.map((item, index) => <PortfolioCard key={index} {...item} />)}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              What Clients Say
            </h2>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} className="fill-primary text-primary" />)}
            </div>
          </div>

          <TestimonialCard quote="I would highly recommend Adam if you are looking to refresh your website. He did a fantastic job for us and we are really happy with the results" author="Owner" business="Mom Duke's Authentic Jamaican Cuisine" rating={5} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-cosmic rounded-2xl p-12 shadow-card bg-amber-500">
            <Sparkles className="mx-auto mb-4 text-white" size={48} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
              Ready to Discuss Your Website?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Schedule a free 15-minute call and let's explore how we can make your website dreams a reality
            </p>
            <Button variant="cosmic" size="lg" asChild>
              <Link to="/get-started">
                Book Your Discovery Call
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;