import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Workflow, Mail, FileJson, Sheet, MessageCircle, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { SEO } from "@/components/SEO";

const Automations = () => {
  const workflowSteps = [
    {
      icon: Mail,
      title: "Capture Leads",
      description: "Form submissions and inquiries are automatically collected from your website or email.",
    },
    {
      icon: FileJson,
      title: "AI Processing",
      description: "AI compartmentalizes the information into structured data, extracting key details instantly.",
    },
    {
      icon: Sheet,
      title: "Organized Logging",
      description: "All lead data is logged to Google Sheets for easy tracking and follow-up.",
    },
    {
      icon: MessageCircle,
      title: "Instant Notifications",
      description: "Recipients get next steps via email, and you receive lead details via SMS — all automatic.",
    },
  ];

  const benefits = [
    "Save hours of manual data entry",
    "Never miss a lead notification",
    "AI-powered data organization",
    "Seamless Google Sheets integration",
    "SMS alerts to your phone",
    "Built on Make.com or n8n",
  ];

  return (
    <>
      <SEO
        canonical="/automations"
        title="Business Automations — AI-Powered Workflow Automation"
        description="Automate your business processes with AI-powered workflows. From lead capture to SMS notifications, we build custom automations using Make.com and n8n."
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        
        {/* Mesh gradient overlay */}
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[80svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center">
              {/* Workflow Icon */}
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
                  <div className="absolute inset-0 blur-3xl bg-accent/30 rounded-full scale-150" />
                  <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-glow">
                    <Workflow className="w-16 h-16 md:w-20 md:h-20 text-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
              >
                Automate Your <span className="text-primary glow-text">Workflow</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-4"
              >
                Custom automations that handle the repetitive work for you. From lead capture to SMS notifications — built with AI and powered by Make.com or n8n.
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
                    Book a Demo Call
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <FadeIn className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                Stop Doing <span className="text-primary">Repetitive Tasks</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Every minute spent on manual data entry, copying info between apps, or sending the same emails is time taken away from growing your business. Let automation handle the busy work while you focus on what matters.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                How It <span className="text-accent">Works</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Intelligent automation that runs while you sleep
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {workflowSteps.map((step, index) => (
                <StaggerItem key={index}>
                  <Card className="glass group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 h-full border-accent/20 hover:border-accent/50">
                    <CardHeader>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <step.icon
                          className="text-accent mb-4"
                          size={44}
                        />
                      </motion.div>
                      <CardTitle className="text-xl font-heading">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Real-World <span className="text-primary">Example</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Genius Fitness & MMA — Automated Lead Management
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="overflow-hidden border-accent/20">
                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <img 
                      src="/lovable-uploads/genius-fitness-automation.png" 
                      alt="Genius Fitness & MMA automation workflow showing email capture, AI processing, Google Sheets logging, and SMS notifications"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-lg">
                      <strong className="text-foreground">The Challenge:</strong> Genius Fitness & MMA needed a way to capture free trial form submissions and notify coaches immediately while keeping all leads organized.
                    </p>
                    <p className="text-lg">
                      <strong className="text-foreground">The Solution:</strong> We built an automation on Make.com that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Watches for new emails from the free trial form</li>
                      <li>Uses AI (OpenAI) to extract and structure lead information into JSON</li>
                      <li>Logs all details to Google Sheets for easy tracking</li>
                      <li>Sends the prospect instructions for booking their class</li>
                      <li>Notifies the coach via SMS (Twilio) with lead details</li>
                    </ul>
                    <p className="text-lg">
                      <strong className="text-foreground">The Result:</strong> Zero manual work. Coaches get instant SMS notifications, prospects get immediate next steps, and every lead is automatically tracked.
                    </p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                What You <span className="text-primary">Get</span>
              </h2>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm">
                    <CheckCircle className="text-accent flex-shrink-0" size={24} />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
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
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                <div className="relative p-8 md:p-12 lg:p-16 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-6"
                  >
                    <Zap className="text-white" size={48} />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                    Let's Automate Your Business
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
                    Book a quick demo call and I'll show you exactly what automation can do for your specific workflow
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="bg-background text-foreground hover:bg-background/90 font-semibold shadow-lg"
                  >
                    <Link to="/get-started" className="gap-2">
                      Book Your Demo Call
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
    </>
  );
};

export default Automations;
