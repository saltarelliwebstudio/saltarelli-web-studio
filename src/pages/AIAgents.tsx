import React from "react";
import { ArrowRight, Bot, Phone, MessageSquare, FileText, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedLink } from "@/components/TrackedLink";

const AIAgents = () => {
  const features = [
    {
      icon: Phone,
      title: "Never Miss a Call",
      description: "Your AI agent answers calls 24/7, capturing leads and answering questions even when you're busy or offline.",
    },
    {
      icon: MessageSquare,
      title: "Text & Call Support",
      description: "Handle both voice calls and text messages with intelligent responses tailored to your business.",
    },
    {
      icon: FileText,
      title: "Smart Logging",
      description: "Every interaction is logged automatically to Google Sheets, keeping you informed of all customer touchpoints.",
    },
    {
      icon: Bot,
      title: "Your Knowledge Base",
      description: "Train your agent with your exact business knowledge so customers get accurate, on-brand answers every time.",
    },
  ];

  const benefits = [
    "Capture leads you'd otherwise miss",
    "Answer customer questions instantly",
    "Free up your time for important work",
    "Professional voice experience",
    "Seamless Google Sheets integration",
    "Continuously monitored and optimized",
  ];

  return (
    <>
      <SEO
        canonical="/ai-agents"
        title="AI Agents for Small Business"
        description="AI-powered chat widgets, voice agents & text agents for Ontario small businesses. Capture leads 24/7, answer customer questions automatically."
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
            {/* Robot Icon */}
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
                  <Bot className="w-16 h-16 md:w-20 md:h-20 text-white" />
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
              Your Business, <span className="text-primary glow-text">Always On</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-4"
            >
              AI-powered voice and text agents that answer calls, capture leads, and respond to customers 24/7 — professionally managed and continuously improved.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Button variant="hero" size="lg" asChild className="text-base">
                <TrackedLink to="/get-started" trackingLabel="ai_agents_hero_book_call" className="gap-2">
                  Book a Discovery Call
                  <ArrowRight size={18} />
                </TrackedLink>
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
              Missing Calls Means <span className="text-primary">Missing Revenue</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Every missed call is a potential customer going to your competitor. Whether you're with another client, after hours, or just can't get to the phone — an AI agent ensures you never lose that opportunity again.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              How It <span className="text-accent">Works</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Intelligent automation powered by your knowledge
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="glass group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 h-full border-accent/20 hover:border-accent/50">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon
                        className="text-accent mb-4"
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
                  Ready to Never Miss Another Lead?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
                  Let's discuss how a managed AI agent can handle your customer calls around the clock
                </p>
                <Button
                  size="lg"
                  asChild
                  className="bg-background text-foreground hover:bg-background/90 font-semibold shadow-lg"
                >
                  <TrackedLink to="/get-started" trackingLabel="ai_agents_cta_book_call" className="gap-2">
                    Book Your Discovery Call
                    <ArrowRight size={18} />
                  </TrackedLink>
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

export default AIAgents;
