import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
const About = () => {
  return <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-center">About Me</h1>
          <p className="text-xl text-center text-muted-foreground">Web Designer • Runner • Martial Artist</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="aspect-square rounded-2xl bg-gradient-cosmic flex items-center justify-center">
                <span className="text-white/50">Photo Coming Soon</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">
                Hi, I'm Adam
              </h2>
              <p className="text-lg text-muted-foreground mb-4">I'm a web designer from Ontario who builds clean, engaging websites that help businesses thrive. I combine practical design with quality workmanship — raised to believe if you won't do your best, don't bother.</p>
              <p className="text-lg text-muted-foreground mb-4">
                Outside of design I train for marathons and practice MMA; that focus 
                shows up in my attention to detail. Every project gets my full effort 
                because your success matters to me.
              </p>
              <p className="text-lg text-muted-foreground">
                I believe in keeping things simple and effective. No unnecessary 
                complexity, no inflated costs — just honest work that delivers results.
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
                  <strong>Fast Turnaround:</strong> I can have a fully customized website up and running within a few days. I respect your time and deadlines.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <div>
                  <strong>Upfront Value:</strong> I'll build you a complete homepage demo to give you an idea for what our project can look like before you even spend a penny.
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
                <Link to="/get-started">
                  Start Your Project <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="cosmic" size="lg" asChild>
                <Link to="/portfolio">View My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;