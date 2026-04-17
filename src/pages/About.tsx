import React from "react";
import { ArrowRight, Award, Target, Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedLink } from "@/components/TrackedLink";
import adamPhoto from "@/assets/adam-photo.png";

const About = () => {
  return (
    <>
      <SEO
        canonical="/about"
        title="About Adam Saltarelli | Ontario Web Designer"
        description="Meet Adam Saltarelli, founder of Saltarelli Web Studio. I build AI admin systems, custom websites, and automations for small businesses."
      />
    <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
      <Starfield />
      
      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          {/* User Icon */}
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
              <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-glow">
                <User className="w-14 h-14 md:w-18 md:h-18 text-white" />
              </div>
            </motion.div>
          </motion.div>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">About Me</h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-xl text-muted-foreground">Web Designer • Runner • Martial Artist</p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={adamPhoto} 
                  alt="Adam - Web Designer" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">
                Hi, I'm Adam
              </h2>
              <p className="text-lg text-muted-foreground mb-4">I'm a tech-savvy guy from Ontario who sets up and manages websites, AI agents, and business automations. Ongoing systems that keep your business running smoothly. I combine practical design with quality workmanship, raised to believe if you won't do your best, don't bother.</p>
              <p className="text-lg text-muted-foreground mb-4">
                Outside of design I train for marathons and practice MMA; that focus 
                shows up in my attention to detail. Every project gets my full effort 
                because your success matters to me.
              </p>
              <p className="text-lg text-muted-foreground">
                I believe in keeping things simple and effective. No unnecessary 
                complexity, no inflated costs. Just honest work that delivers results.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <Award className="mx-auto mb-4 text-primary" size={40} />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Quality First
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every website is crafted with care and attention to detail
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <Target className="mx-auto mb-4 text-primary" size={40} />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Results Focused
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your success is my priority, from start to finish
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <Heart className="mx-auto mb-4 text-primary" size={40} />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Personal Touch
                </h3>
                <p className="text-sm text-muted-foreground">
                  Direct communication and genuine care for your project
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Me */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Why Work With Me?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <strong>Fast Setup:</strong> I can have your system set up and running within a few days. Then I handle everything ongoing so you never have to think about it.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <strong>Upfront Value:</strong> I'll create a free concept website, AI agent demo, or automation walkthrough so you can see exactly what your managed system will look like before committing.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <strong>Clear Communication:</strong> No tech jargon or confusing processes. 
                  I explain everything in plain language.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <strong>Fair Pricing:</strong> Transparent costs with no hidden fees. 
                  You know exactly what you're paying for.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <strong>Personal Investment:</strong> I treat every project like it's my own, 
                  because your success reflects my work.
                </div>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create something amazing for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <TrackedLink to="/get-started" trackingLabel="about_book_call">
                  Book a Discovery Call <ArrowRight className="ml-2" size={20} />
                </TrackedLink>
              </Button>
              <Button variant="cosmic" size="lg" asChild>
                <TrackedLink to="/portfolio" trackingLabel="about_view_portfolio">View My Work</TrackedLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};
export default About;
