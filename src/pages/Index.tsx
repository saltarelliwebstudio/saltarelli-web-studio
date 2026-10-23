import React, { useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Star, CheckCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TrustedBy } from "@/components/TrustedBy";
import { ReviewWall } from "@/components/ReviewWall";
import { ProofResults } from "@/components/ProofResults";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedLink } from "@/components/TrackedLink";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { CalendlyEmbed, CALENDLY_URL } from "@/components/CalendlyEmbed";
import { withAttribution } from "@/lib/attribution";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/sws-logo.png";
import adamsEyeMark from "@/assets/adams-eye-mark.svg";
import { supabase } from "@/integrations/supabase/client";
import { trackButtonClick, trackFormLead } from "@/lib/analytics";
import { businessSchema, personSchema, SERVICE_TYPES, faqSchema, CITY_PAGES } from "@/lib/schema";

// Booking is the primary conversion. Warm inbound should never have to fill out a
// form to reach Adam -- every prominent CTA points here, and the #apply section
// embeds the calendar inline so booking never leaves the page.
const CALENDLY = CALENDLY_URL;

const smartStackCards = [
  {
    emoji: "🌐",
    name: "Managed Website",
    tagline: "Built to rank and convert",
    detail:
      "We refine the entire front end and back end into a fast, mobile-first site built to rank on Google and turn visitors into calls. Hosting, updates, and edits all handled for you.",
  },
  {
    emoji: "⭐",
    name: "Google Review Engine",
    tagline: "More 5-star reviews, higher rankings",
    detail:
      "More reviews means a higher spot in Google's local results, which means more customers find you first. The more you stack up, the higher you climb.",
  },
  {
    emoji: "📈",
    name: "SEO + Systems",
    tagline: "The engine that gets you to the top",
    detail:
      "Local SEO, Google Business Profile optimization, and the automations that capture every lead and notify you the second one comes in, so nothing slips through the cracks.",
  },
];

const faqItems = [
  {
    q: "What exactly do I get?",
    a: "A managed website, a Google review engine, and the local SEO that gets you ranking. I build it, I manage it, and I keep you climbing Google. It's one simple monthly plan with everything included.",
  },
  {
    q: "How does the 60-day guarantee work?",
    a: "If you're not satisfied inside the first 60 days, you get a full refund. Every dollar back, no awkward conversation, no fine print, and no conditions tied to review counts or ranking positions. That's the Clean Hands Guarantee.",
  },
  {
    q: "What kind of businesses is this for?",
    a: "Local businesses that live and die by Google and word of mouth. Trades, gyms, service businesses, restaurants, professional services. If your customers find you by searching, this is for you.",
  },
  {
    q: "Can you guarantee I'll be #1 on Google?",
    a: "No one honestly can. Your market decides that. What I can show you: a 24/7 gym in Port Colborne went to number one on Google in the Niagara region in 60 days with the same site, review engine and local SEO I'd build for you. And if you're not satisfied in the first 60 days, you get your money back.",
  },
  {
    q: "What areas do you serve?",
    a: "All of the Niagara Region: Port Colborne, Welland, St. Catharines, Niagara Falls, Fort Erie, Crystal Beach, Ridgeway, Fonthill, Thorold, Grimsby and Niagara-on-the-Lake. I'm local, so you can meet me in person. I also work with businesses across Ontario and Canada over video.",
  },
  {
    q: "How much of my time does it take?",
    a: "About 15 minutes. You approve the direction and I handle the rest. No touching code, hosting, or settings.",
  },
  {
    q: "What does it cost?",
    a: "One simple monthly plan. The exact number depends on your market and how competitive your area is, so we go over it on a quick call once I've had a look at your business.",
  },
];

const Index = () => {
  return (
    <>
      <SEO
        canonical="/"
        title="Niagara Web Design & Local SEO | Saltarelli Web Studio"
        description="Niagara web design, Google reviews and local SEO for trades and local businesses in St. Catharines, Welland, Niagara Falls, Fort Erie and Port Colborne. 60-day money-back guarantee."
        schema={[{
          // Name, address, phone, socials and the 12-city service area all come
          // from src/lib/schema.ts so they can't drift from the footer or the
          // Google Business Profile. Only homepage-specific proof is added here.
          ...businessSchema,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Smart Stack Pack",
            itemListElement: SERVICE_TYPES.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: service },
            })),
          },
          // No aggregateRating / review markup here, deliberately.
          // Google's structured-data policy does not allow self-serving
          // reviews: an organization rating itself, on its own site, is not
          // eligible for review rich results, and marking it up anyway risks a
          // manual action that suppresses rich results for the WHOLE domain -
          // including the LocalBusiness markup above, which is valid.
          // The real Google reviews (count in src/data/googleReviews.ts) live on the Google Business Profile and
          // show in the map pack from there. The testimonials stay on the page
          // below for humans; only the machine-readable claim is gone.
        },
        // This page passes an explicit array, so it does not inherit SEO.tsx's
        // default — the Person node has to be listed here by hand.
        personSchema,
        // The six Q&As below are rendered visibly in the FAQ accordion, which
        // is what Google requires for FAQPage markup to be eligible.
        faqSchema(faqItems)]}
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        {/* ──────────── HERO ──────────── */}
        <section className="relative md:min-h-[100svh] flex items-center justify-center px-4 md:px-6 pt-28 md:pt-20 pb-16 md:pb-10">
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
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-150" />
                  <img
                    src={logo}
                    alt="Saltarelli Web Studio"
                    className="h-20 w-20 md:h-32 md:w-32 relative z-10 drop-shadow-2xl"
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
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-heading font-bold mb-5 leading-[1.1] max-w-5xl mx-auto text-balance"
              >
                We Build Websites That{" "}
                <span className="text-primary glow-text">
                  Get Your Phone Ringing
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[15px] sm:text-base md:text-lg text-foreground/75 mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4"
              >
                Most local businesses are stuck relying on word of mouth, referrals and paid lead sites. We replace all of that with one system that gets you found on Google, collects 5-star reviews and follows up on every lead, so more calls turn into booked jobs. Not satisfied in 60 days? You get your money back.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              >
                <Button variant="hero" size="lg" asChild className="text-base">
                  <TrackedExternalLink
                    href={withAttribution(CALENDLY)}
                    trackingLabel="hero_book_call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2 inline-flex items-center justify-center"
                  >
                    <Calendar size={18} />
                    Talk to an Expert
                  </TrackedExternalLink>
                </Button>
                <Button variant="cosmic" size="lg" asChild className="text-base">
                  <TrackedLink
                    to="/score?src=home-hero"
                    trackingLabel="hero_get_found_score"
                    className="gap-2 inline-flex items-center justify-center"
                  >
                    Get Your Free Get Found Score
                    <ArrowRight size={18} />
                  </TrackedLink>
                </Button>
              </motion.div>


            </div>
          </div>
        </section>

        {/* ──────────── TRUSTED BY (CLIENT LOGOS) ──────────── */}
        <TrustedBy />

        {/* ──────────── GENIUS FITNESS CASE STUDY ──────────── */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-12">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Featured Client
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                See Why UFC Contender Series Fighter{" "}
                <span className="text-primary">Anthony Romero</span> Uses the Stack
              </h2>
              <p className="text-sm text-muted-foreground">
                PFL World Champion · Owner, Genius Fitness & MMA, Port Colborne, Ontario
              </p>
            </FadeIn>

            {/* Video embed */}
            <FadeIn className="mb-6 max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-card/50">
                <video
                  src="/genius-fitness-case-study.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/genius-fitness-poster.jpg"
                  className="w-full aspect-video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </FadeIn>

            {/* Info strip */}
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              <StaggerItem>
                <div className="glass rounded-xl p-6 text-center h-full">
                  <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">
                    The Client
                  </p>
                  <p className="text-muted-foreground">
                    Genius Fitness & MMA, a Niagara combat sports gym with 80+ active members and growing.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="glass rounded-xl p-6 text-center h-full">
                  <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">
                    The Problem
                  </p>
                  <p className="text-muted-foreground">
                    Manual check-ins, missed leads, no online scheduling, and zero follow-up automation.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="glass rounded-xl p-6 text-center h-full">
                  <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">
                    The Result
                  </p>
                  <p className="text-muted-foreground">
                    Full member portal, kiosk check-in, automated notifications, and a coach who barely touches the tech.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ──────────── REAL RESULTS (All Yukon + quick wins) ──────────── */}
        <ProofResults />

        {/* ──────────── CLIENT SPOTLIGHT (Luke Ellis) ──────────── */}
        <section className="py-16 md:py-24 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <FadeIn className="text-center mb-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Client Spotlight
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
                "The value created for my business is{" "}
                <span className="text-primary">beyond measurable.</span>"
              </h2>
            </FadeIn>

            <ScaleIn>
              <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Shared publicly on Facebook</span>
                </div>

                <div className="space-y-4 text-foreground/90 text-base md:text-lg leading-relaxed">
                  <p>
                    "Been on the phone all morning with our new website developer Adam. He's 17 years old. This guy knows AI like nobody I've met.
                  </p>
                  <p>
                    I met him in a Tim Hortons at 10pm a couple months ago. I was in the bathroom when my phone rang, declined it 3 times, then finally picked up. It was Adam, saying he was outside staring at my company van, telling me he'd already built me a whole new website while I was in the bathroom, using AI.
                  </p>
                  <p>
                    Today we hopped on a call and within 2 hours he helped us streamline every aspect of the business. Automated booking, leads, AI phone calls. You name it, we touched on it. This kid is 17, and in 2 hours made more than most do in a day.
                  </p>
                  <p>
                    The value created for my business is beyond measurable. He should have charged us double or triple what he did. We signed up for a monthly subscription to integrate every new AI feature we can into the business.
                  </p>
                  <p className="text-foreground font-semibold">
                    The world is changing. Change with it or get left behind."
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="font-heading font-semibold text-foreground">Luke Ellis</p>
                  <p className="text-sm text-muted-foreground">Owner, Luxury Details</p>
                </div>
              </div>
            </ScaleIn>
          </div>
        </section>

        {/* ──────────── GOOGLE REVIEW WALL (data: src/data/googleReviews.ts) ──────────── */}
        <ReviewWall />

        {/* ──────────── SMART STACK PACK ──────────── */}
        <section
          id="smart-stack"
          className="py-20 md:py-28 px-4 md:px-6 relative z-10"
        >
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-12">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                The Offer
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                The Smart Stack Pack
              </h2>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 mb-8">
              {smartStackCards.map((card, i) => (
                <StaggerItem key={i}>
                  <SmartStackCard {...card} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn className="text-center">
              <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
                Everything above is bundled into one simple monthly plan.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a
                  href="#apply"
                  onClick={() => trackButtonClick("smartstack_qualify", "Talk to an Expert", "#apply")}
                  className="gap-2 inline-flex items-center justify-center"
                >
                  Talk to an Expert
                  <ArrowRight size={18} />
                </a>
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* ──────────── ADAM'S EYE (audit brand, links out) ──────────── */}
        <section className="py-12 md:py-16 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <FadeIn>
              <div className="rounded-2xl border border-border bg-card/60 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
                <img src={adamsEyeMark} alt="Adam's Eye logo" width={160} height={89} loading="lazy" className="w-32 md:w-40 h-auto shrink-0" />
                <div className="flex-1">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">
                    Not sure where to start?
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
                    Adam's Eye: AI operations audits
                  </h2>
                  <p className="text-muted-foreground mb-5">
                    I spend a day inside your business, find where time and money are leaking, and hand you a ranked fix list. Fix it yourself, or have us build it.
                  </p>
                  <Button variant="outline" size="lg" asChild>
                    <TrackedExternalLink
                      href="https://adamseye.ca"
                      trackingLabel="home_adams_eye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2 inline-flex items-center justify-center"
                    >
                      Book an Audit Day
                      <ArrowRight size={18} />
                    </TrackedExternalLink>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ──────────── HOW IT WORKS ──────────── */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <FadeIn className="text-center mb-12 md:mb-16">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                The Process
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Three Steps. Then It Just{" "}
                <span className="text-primary">Runs.</span>
              </h2>
            </FadeIn>

            <div className="max-w-2xl mx-auto">
              {[
                {
                  num: 1,
                  title: "Apply & Qualify",
                  desc: "Tell me about your business in a quick form or call. I look at your Google presence and tell you honestly whether I can help. I only take 5 clients a month.",
                },
                {
                  num: 2,
                  title: "Build & Rank",
                  desc: "I build your site, set up your review engine, and dial in your local SEO. You approve everything before it goes live.",
                },
                {
                  num: 3,
                  title: "You Climb. Jobs Come In.",
                  desc: "You start climbing Google, reviews roll in, and the calls follow. If you're not satisfied with what we've done in 60 days, you don't pay a cent.",
                },
              ].map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.15}>
                  <div className="relative flex gap-4 md:gap-6 group">
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow transition-shadow duration-300"
                      >
                        {step.num}
                      </motion.div>
                      {idx < 2 && (
                        <div className="w-0.5 h-full bg-border mt-3 group-hover:bg-primary/50 transition-colors duration-500" />
                      )}
                    </div>
                    <div className="flex-1 pb-10 md:pb-12">
                      <h3 className="font-heading font-semibold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── CLEAN HANDS GUARANTEE ──────────── */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-3xl">
            <FadeIn>
              <div className="relative rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-sm p-8 md:p-12 text-center shadow-glow overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="text-primary" size={32} />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Clean Hands Guarantee
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                    If you're not satisfied inside the first 60 days, I'll refund
                    every dollar you paid. No awkward conversation. No fine print.
                    No conditions tied to review counts or ranking positions.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    I don't promise #1. That's up to your market. I promise to do
                    the work right, or you don't pay for it.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ──────────── SERVICE AREA ──────────── */}
        {/* In-body links to the city pages. Google listed them as "Discovered,
            not indexed" with only footer links pointing at them. */}
        <section className="py-16 md:py-20 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-[760px] text-center">
            <FadeIn>
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Local to Niagara
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Web design and local SEO across the Niagara Region
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                I live and work in Niagara. Every town here is its own Google
                search, so your site and your Google profile should name the
                places you actually serve. Here is what that looks like where you are:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {CITY_PAGES.map((c) => (
                  <TrackedLink
                    key={c.slug}
                    to={`/${c.slug}`}
                    trackingLabel={`home_city_${c.slug}`}
                    className="glass rounded-full border border-white/10 px-4 py-2 text-sm font-semibold hover:border-primary/60 transition-colors"
                  >
                    Web design in {c.city}
                  </TrackedLink>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ──────────── FAQ ──────────── */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-[760px]">
            <FadeIn className="text-center mb-12">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Questions
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Common Questions
              </h2>
            </FadeIn>

            <FadeIn>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="glass rounded-xl border border-white/10 px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold text-base md:text-lg hover:no-underline py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>

        {/* ──────────── APPLY / QUALIFY FORM ──────────── */}
        {/* Calendly needs ~1000px to lay out details + calendar side by side.
            Narrower than that and it collapses to one column with an inner
            scrollbar, which buries the date picker. */}
        <section id="apply" className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-5xl">
            <FadeIn className="text-center mb-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Free Strategy Call
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Grab a time that works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                30 minutes on Google Meet, no pressure. I'll have looked at your
                site, your Google profile and your reviews before we talk, and
                I'll show you where the calls are leaking.
              </p>
            </FadeIn>

            <FadeIn>
              <CalendlyEmbed trackingLabel="apply_inline" />
            </FadeIn>

            <div className="max-w-2xl mx-auto">
              <FadeIn className="text-center mt-20 mb-10">
                <div className="flex items-center gap-4 mb-10">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Or
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Send me your details instead
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Not ready to pick a time? Drop your info and I'll personally
                  review your business and get back to you.
                </p>
              </FadeIn>
              <FadeIn>
                <ApplyForm />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ──────────── FINAL CTA ──────────── */}
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
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="inline-block mb-6"
                  >
                    <Sparkles className="text-white" size={48} />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                    Ready to Get{" "}
                    <span className="text-primary">Found on Google</span>?
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
                    I take 5 new Niagara businesses a month. Book a call and I'll show
                    you exactly where you stand on Google and what it takes to climb.
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="bg-background text-foreground hover:bg-background/90 font-semibold shadow-lg"
                  >
                    <a
                      href="#apply"
                      onClick={() => trackButtonClick("final_qualify", "Talk to an Expert", "#apply")}
                      className="gap-2 inline-flex items-center justify-center"
                    >
                      <Sparkles size={18} />
                      Talk to an Expert
                    </a>
                  </Button>
                  <p className="mt-5 text-sm text-white/80">
                    Not ready yet?{" "}
                    <TrackedLink
                      to="/score?src=home-final"
                      trackingLabel="final_get_found_score"
                      className="text-white font-medium underline underline-offset-4 hover:text-white/90"
                    >
                      See your Get Found Score first
                    </TrackedLink>
                  </p>
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

/* ── Smart Stack Card (inline) ── */
function SmartStackCard({
  emoji,
  name,
  tagline,
  detail,
}: {
  emoji: string;
  name: string;
  tagline: string;
  detail: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`glass rounded-xl p-5 h-full transition-all duration-300 border ${
        hovered ? "border-primary/60" : "border-white/10"
      }`}
    >
      <span className="text-3xl mb-3 block">{emoji}</span>
      <p className="font-heading font-bold text-base mb-1">{name}</p>
      <p className="text-sm text-muted-foreground">{tagline}</p>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: hovered ? "200px" : "0px",
          opacity: hovered ? 1 : 0,
        }}
      >
        <div className="border-t border-white/10 mt-3 pt-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Apply / Qualify Form ── */
function ApplyForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please add your name and email.");
      setStatus("error");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please add a phone number so I can reach you.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("qualify-submit", {
        body: form,
      });
      const payload = data as { error?: string } | null;
      if (error || payload?.error) {
        throw new Error(payload?.error || error?.message || "Something went wrong.");
      }
      trackFormLead("homepage_form");
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or book a call below."
      );
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none transition-colors";

  if (status === "success") {
    return (
      <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-8 md:p-10 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="text-primary" size={32} />
          </div>
        </div>
        <h3 className="text-2xl font-heading font-bold mb-3">
          Got it. I'll be in touch.
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          I'll personally review your business
          {form.website ? " and your website" : ""} and get back to you shortly.
          Want to skip the wait?
        </p>
        <Button variant="hero" size="lg" asChild>
          <TrackedExternalLink
            href={withAttribution(CALENDLY)}
            trackingLabel="apply_success_book_now"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2 inline-flex items-center justify-center"
          >
            Talk to an Expert
            <ArrowRight size={18} />
          </TrackedExternalLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name *"
            value={form.name}
            onChange={update("name")}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="tel"
            placeholder="Phone *"
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Your website (if you have one)"
            value={form.website}
            onChange={update("website")}
            className={inputClass}
          />
        </div>
        <textarea
          placeholder="Anything I should know? (optional)"
          value={form.message}
          onChange={update("message")}
          rows={3}
          className={`${inputClass} resize-none`}
        />

        {status === "error" && (
          <p className="text-sm text-red-400">{errorMsg}</p>
        )}

        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={status === "submitting"}
          className="w-full gap-2"
        >
          <Sparkles size={18} />
          {status === "submitting" ? "Sending..." : "See If I Can Help"}
        </Button>
        <p className="text-sm text-muted-foreground text-center pt-1">
          Or{" "}
          <TrackedExternalLink
            href={withAttribution(CALENDLY)}
            trackingLabel="apply_book_now"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            just book a time with me now
          </TrackedExternalLink>
          .
        </p>
        <p className="text-xs text-muted-foreground text-center">
          Only 5 spots a month. I'll personally review what you send.
        </p>
      </form>
    </div>
  );
}

export default Index;
