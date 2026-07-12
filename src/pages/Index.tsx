import React, { useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TrustedBy } from "@/components/TrustedBy";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedLink } from "@/components/TrackedLink";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/sws-logo.png";
import { supabase } from "@/integrations/supabase/client";

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
    a: "If you're not satisfied with what I've delivered after 60 days, you get a full refund. Every dollar back, no awkward conversation, no fine print. That's the Clean Hands Guarantee.",
  },
  {
    q: "What kind of businesses is this for?",
    a: "Local businesses that live and die by Google and word of mouth. Trades, gyms, service businesses, restaurants, professional services. If your customers find you by searching, this is for you.",
  },
  {
    q: "Can you actually get me to the top of Google?",
    a: "I took a 24/7 gym in Port Colborne to number one on Google in the Niagara region in 60 days. Every market is different, which is exactly why there's a money-back guarantee. If I don't deliver, you don't pay.",
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
        title="Saltarelli Web Studio | Get Found on Google, Win More Customers"
        description="I build and manage websites, Google review engines, and local SEO that get local businesses found on Google and winning more customers. Backed by a 60-day guarantee. Serving Niagara and Ontario."
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Saltarelli Web Studio",
          url: "https://saltarelliwebstudio.ca",
          logo: "https://saltarelliwebstudio.ca/sws-logo.png",
          description:
            "Managed websites, Google review engines, and local SEO that get local businesses ranking at the top of Google in 60 days. Guaranteed, or you don't pay.",
          telephone: "+12895135284",
          email: "saltarelliwebstudio@gmail.com",
          areaServed: [
            {
              "@type": "State",
              name: "Ontario",
              containedInPlace: { "@type": "Country", name: "Canada" },
            },
          ],
          founder: { "@type": "Person", name: "Adam Saltarelli" },
          serviceType: [
            "Local SEO",
            "Web Design",
            "Website Management",
            "Google Business Profile Optimization",
            "Review Management",
          ],
          priceRange: "$$",
          knowsLanguage: "en",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "20",
          },
          review: [
            {
              "@type": "Review",
              author: { "@type": "Person", name: "Anthony, Genius Fitness & MMA" },
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              reviewBody:
                "Adam built our full member portal and automated our check-ins. Runs like clockwork. I barely touch it.",
            },
            {
              "@type": "Review",
              author: { "@type": "Person", name: "Owner, Pop's Landscaping" },
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              reviewBody:
                "Adam did an amazing job designing our website from start to finish. Professional, easy to communicate with, and delivered on time.",
            },
            {
              "@type": "Review",
              author: {
                "@type": "Person",
                name: "Owner, Mom Duke's Authentic Jamaican Cuisine",
              },
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              reviewBody:
                "I would highly recommend Adam if you are looking to refresh your website. He did a fantastic job for us.",
            },
            {
              "@type": "Review",
              author: { "@type": "Person", name: "Claude Chaisson" },
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              reviewBody:
                "I'm glad I found Adam to do this website for me. He made it easy and I appreciate it working with him and I. Thank you",
            },
          ],
        }}
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        {/* ──────────── HERO ──────────── */}
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
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-heading font-bold mb-6 leading-[1.1] max-w-5xl mx-auto text-balance"
              >
                I took a Port Colborne gym to{" "}
                <span className="text-primary glow-text whitespace-nowrap">
                  #1 on Google
                </span>{" "}
                in{" "}
                <span className="text-primary glow-text whitespace-nowrap">
                  60 days
                </span>
                .
                <br className="hidden md:inline" /> Let's get more customers finding you.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-4"
              >
                I build and manage your website and Google review engine to get more local customers finding you on Google. If it's not working in 60 days, you don't pay a cent.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              >
                <Button variant="hero" size="lg" asChild className="text-base">
                  <a
                    href="#apply"
                    className="gap-2 inline-flex items-center justify-center"
                  >
                    <Sparkles size={18} />
                    See If You Qualify
                  </a>
                </Button>
                <Button
                  variant="cosmic"
                  size="lg"
                  asChild
                  className="text-base"
                >
                  <a
                    href="#smart-stack"
                    className="gap-2 inline-flex items-center justify-center"
                  >
                    See What's Included
                    <ArrowRight size={18} />
                  </a>
                </Button>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 flex flex-col items-center gap-2"
              >
                <a
                  href="#reviews"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm transition-colors hover:border-primary/50"
                >
                  <span className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-foreground">5.0</span>
                  <span className="text-sm text-muted-foreground">· 20 Google reviews</span>
                </a>
                <p className="text-sm text-muted-foreground">
                  Backed by our Clean Hands Guarantee
                </p>
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

        {/* ──────────── GOOGLE REVIEW BOMB ──────────── */}
        <section id="reviews" className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-12">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Real Clients. Real Results.
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                What Niagara Business Owners Are Saying
              </h2>
              <p className="text-sm text-muted-foreground">All reviews verified on Google.</p>
            </FadeIn>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
              {/* CARD 1 — Zachary Melnyk (featured) */}
              <ScaleIn>
                <div className="break-inside-avoid glass-strong rounded-2xl p-6 border border-primary/30 shadow-glow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">Z</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Zachary Melnyk</p>
                      <p className="text-xs text-muted-foreground">Melnyk Concrete, Automations Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">1 month ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Adam has been a huge help to the business. He built out multiple automations to streamline our admin processes and took a lot of repetitive work off our plate. What stood out most was how responsive and thorough he was throughout the entire process. Anytime I needed adjustments, variations, or wanted to fine-tune how the automation worked, he handled it quickly and made sure everything was dialed in properly with our company's operating procedures. He's knowledgeable, easy to communicate with, and clearly cares about doing things the right way, not just rushing to 'get it done.' We'll definitely be continuing to work with Adam moving forward and I'd recommend him to anyone looking to improve their systems and automate tasks the right way."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD 6 — Joseph Ruscica (NEW) */}
              <ScaleIn delay={0.05}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">J</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Joseph Ruscica</p>
                      <p className="text-xs text-muted-foreground">Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                    <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">NEW</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Easy to work with, amazing pricing, and even better workmanship. Adam really goes above and beyond any big name web designers and at a fraction of the price. Will be referring him to anybody in need of a quality website from now on."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD 2 — 360 Property Maintenance */}
              <ScaleIn delay={0.1}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">360 Property Maintenance</p>
                      <p className="text-xs text-muted-foreground">Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">1 month ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "I can't say enough good things about working with Adam Saltarelli Web Studio. From the first call, everything was organized and professional. He listened to what I wanted, gave great suggestions, and created a website that looks modern, clean, and is very easy to navigate (even added a FAQs section that I hadn't thought of which by the way is brilliant). The site works perfectly on mobile or Desktop loads quickly. I've already received compliments and new inquiries since launching. Highly recommend!"
                  </p>
                </div>
              </ScaleIn>

              {/* CARD 7 — Arlene Austin (NEW) */}
              <ScaleIn delay={0.15}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">A</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Arlene Austin</p>
                      <p className="text-xs text-muted-foreground">Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 weeks ago</span>
                    <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">NEW</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Working with Adam was definitely a 100/10 experience He is knowledgeable, forward thinking, readily accessible and willing to suggest ways to set-up your platform. I would highly recommend Adam to anyone looking for a talented web designer, to show case your business."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD 3 — Pop's Landscaping */}
              <ScaleIn delay={0.2}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-lime-700 flex items-center justify-center text-white font-bold text-sm">P</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Pop's Landscaping</p>
                      <p className="text-xs text-muted-foreground">Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 months ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Adam did an amazing job designing our website from start to finish. He was professional, easy to communicate with, and really took the time to understand what I wanted. The final site looks great, runs smoothly, and was delivered on time. I'd highly recommend Adam to anyone looking for a reliable and talented website designer."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD 4 — Brandon Cassar */}
              <ScaleIn delay={0.25}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm">B</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Brandon Cassar</p>
                      <p className="text-xs text-muted-foreground">Cassar Electric, Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 months ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Adam is fantastic! We used SWS for the design and creation for our website and we couldn't be happier with his services. We will continue use SWS in the future for website content and branding needs!"
                  </p>
                </div>
              </ScaleIn>

              {/* CARD 5 — Joe Eddleston */}
              <ScaleIn delay={0.3}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-stone-600 flex items-center justify-center text-white font-bold text-sm">J</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Joe Eddleston</p>
                      <p className="text-xs text-muted-foreground">Bluewater Stone, Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 months ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "We had an amazing experience working with our web designer on the Bluewater Stone website. From start to finish, the process was smooth, professional, and efficient. They truly understood our brand and translated our vision into a clean, modern site that represents our hardscaping work perfectly. Communication was excellent, turnaround times were fast, and the final product exceeded our expectations. I would highly recommend them to any business looking for top-quality web design."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD — Anthony Romero */}
              <ScaleIn delay={0.35}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">A</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Anthony Romero</p>
                      <p className="text-xs text-muted-foreground">Genius Fitness & MMA, Website & Portal Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 months ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Adam does a fantastic job putting together your dream website. Definitely recommend to any business."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD — Joseph Ballouz */}
              <ScaleIn delay={0.4}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold text-sm">J</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Joseph Ballouz</p>
                      <p className="text-xs text-muted-foreground">Streetball.ai, Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 months ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Amazing product and service! Adam is very nice and professional, he listens carefully to your needs and delivers exactly that. For my landing page streetball.ai, I described via text what I wanted, then Adam did a free prototype, then we refined it together. Highly recommend!"
                  </p>
                </div>
              </ScaleIn>

              {/* CARD — Olivier Michel */}
              <ScaleIn delay={0.45}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">O</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Olivier Michel</p>
                      <p className="text-xs text-muted-foreground">Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">2 months ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Saltarelli web studio delivers high quality and timely websites. I highly recommend Adam because he's amazing to work with."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD — Colton Saliba */}
              <ScaleIn delay={0.5}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-700 flex items-center justify-center text-white font-bold text-sm">C</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Colton Saliba</p>
                      <p className="text-xs text-muted-foreground">Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">1 month ago</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "Thank Adam for making such a great website, it surpassed my expectations by far. For anyone looking for a website for their business I 100% recommend Adam."
                  </p>
                </div>
              </ScaleIn>

              {/* CARD — Claude Chaisson */}
              <ScaleIn delay={0.55}>
                <div className="break-inside-avoid glass rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-700 flex items-center justify-center text-white font-bold text-sm">C</div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Claude Chaisson</p>
                      <p className="text-xs text-muted-foreground">Website Client</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}</div>
                    <span className="text-xs text-muted-foreground">1 month ago</span>
                    <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">NEW</span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    "I'm glad I found Adam to do this website for me. He made it easy and I appreciate it working with him and I. Thank you"
                  </p>
                </div>
              </ScaleIn>
            </div>

            <FadeIn className="text-center mt-8">
              <p className="text-sm text-muted-foreground">All reviews posted on Google · Niagara Region, Ontario</p>
            </FadeIn>
          </div>
        </section>

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
                  className="gap-2 inline-flex items-center justify-center"
                >
                  See If You Qualify
                  <ArrowRight size={18} />
                </a>
              </Button>
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
                  desc: "Tell me about your business in a quick form or call. I look at your Google presence and whether I can get you to the top. I only take 5 clients a month.",
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
                    If you're not getting more customers from Google within 60
                    days, I'll refund every dollar you paid. No awkward
                    conversation. No fine print.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    I don't promise #1. That's up to your market. I promise more
                    customers, or your money back.
                  </p>
                </div>
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
        <section id="apply" className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-2xl">
            <FadeIn className="text-center mb-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                See If You Qualify
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Tell me about your business
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Drop your details and I'll personally review your business and
                get back to you. Ready right now? Book a call on the spot.
              </p>
            </FadeIn>
            <FadeIn>
              <ApplyForm />
            </FadeIn>
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
                    Ready to Get to the{" "}
                    <span className="text-primary">Top of Google</span>?
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
                    Apply for one of 5 spots this month. I'll review your business and
                    show you exactly how we get you ranking at the top of Google in 60 days.
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="bg-background text-foreground hover:bg-background/90 font-semibold shadow-lg"
                  >
                    <a
                      href="#apply"
                      className="gap-2 inline-flex items-center justify-center"
                    >
                      <Sparkles size={18} />
                      See If You Qualify
                    </a>
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
  const CALENDLY =
    "https://calendly.com/saltarelliwebstudio/free-15-minute-online-presence-review";
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
            href={CALENDLY}
            trackingLabel="apply_success_book_now"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2 inline-flex items-center justify-center"
          >
            Book a Call Now
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
            placeholder="Phone (optional)"
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
            href={CALENDLY}
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
