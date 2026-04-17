import React, { useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedLink } from "@/components/TrackedLink";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { AfterHoursAudit } from "@/components/AfterHoursAudit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/sws-logo.png";

const smartStackCards = [
  {
    emoji: "🌐",
    name: "Managed Website",
    tagline: "Your 24/7 digital storefront",
    detail:
      "Custom-designed, mobile-optimized site with hosting, SSL, updates, and ongoing SEO. All included.",
  },
  {
    emoji: "🤖",
    name: "AI Chat Widget",
    tagline: "Answers questions while you sleep",
    detail:
      "Trained on your business. Qualifies leads, answers FAQs, and books appointments, even at 2 AM.",
  },
  {
    emoji: "📞",
    name: "AI Phone Agent",
    tagline: "Never miss a call again",
    detail:
      "An AI receptionist that picks up, qualifies callers, and routes hot leads to your phone instantly.",
  },
  {
    emoji: "⚡",
    name: "Lead Automations",
    tagline: "Capture → Notify → Follow up",
    detail:
      "New lead comes in? You get a text. They get a reply. The CRM gets updated. Zero manual work.",
  },
  {
    emoji: "⭐",
    name: "Review Engine",
    tagline: "5-star reviews on autopilot",
    detail:
      "Automated post-job review requests via SMS. More reviews = higher Google ranking = more calls.",
  },
  {
    emoji: "📊",
    name: "CRM Dashboard",
    tagline: "See every lead in one place",
    detail:
      "Track leads, follow-ups, and revenue. No spreadsheets. Built for small business, not enterprise.",
  },
  {
    emoji: "📋",
    name: "Online Estimates",
    tagline: "Quote faster, close sooner",
    detail:
      "Customers request quotes from your site. You review and send. Branded, professional, fast.",
  },
  {
    emoji: "🛡️",
    name: "Ongoing Management",
    tagline: "We handle the tech, you handle the work",
    detail:
      "Hosting, security, updates, monitoring, and priority support. All bundled in your monthly plan.",
  },
];

const faqItems = [
  {
    q: "What kind of businesses is the Smart Stack Pack for?",
    a: "It's built for small and mid-size businesses that rely on phone calls, quotes, and local reputation. Service businesses, fitness studios, retail, professional services, and similar.",
  },
  {
    q: "Do I need to buy each piece separately?",
    a: "No. We figure out which pieces fit your business and build around what you already have. If your website is solid, we won't redo it. We just plug in the AI, automations, and systems that are missing. You only pay for what makes sense.",
  },
  {
    q: "How long does setup take?",
    a: "Most clients are fully live within 2 to 3 weeks. We handle everything. You just show up for a discovery call and approve the final setup.",
  },
  {
    q: "What if it doesn't work for my business?",
    a: "That's what the Clean Hands Guarantee is for. If the systems aren't outperforming your current setup after 30 days, you get a full refund. No awkward conversation.",
  },
  {
    q: "Do I need to be tech-savvy?",
    a: "Not at all. We manage everything. You'll get a simple dashboard to see leads and reviews, but you never have to touch code, hosting, or settings.",
  },
  {
    q: "Can I keep my current website?",
    a: "Yes. We can integrate the AI agent, automations, and review engine with your existing site. But most clients choose the full stack because a managed site is included at no extra cost.",
  },
];

const tickerItems = [
  "CALLS ANSWERED",
  "LEADS CAPTURED",
  "ESTIMATES AUTOMATED",
  "REVIEWS COLLECTED",
  "ZERO MANUAL WORK",
];

const Index = () => {
  return (
    <>
      <SEO
        canonical="/"
        title="Saltarelli Web Studio | AI Admin Systems for Small Business"
        description="We build AI admin systems for businesses that save 10+ hours a week, delivered in 14 days. Websites, AI agents, and automations in one managed plan. Take the free Leaky Bucket Audit."
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Saltarelli Web Studio",
          url: "https://saltarelliwebstudio.ca",
          logo: "https://saltarelliwebstudio.ca/sws-logo.png",
          description:
            "AI admin systems for businesses that save 10+ hours a week, delivered in 14 days. Websites, AI, and automations in one managed stack.",
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
            "Web Design",
            "AI Chat Widgets",
            "AI Voice Agents",
            "Business Automation",
            "CRM",
            "Review Management",
          ],
          priceRange: "$$",
          knowsLanguage: "en",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "12",
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
                We build AI admin systems
                <br className="hidden md:inline" /> for businesses that save{" "}
                <span className="text-primary glow-text whitespace-nowrap">
                  10+ hours a week
                </span>
                ,
                <br className="hidden md:inline" /> delivered in{" "}
                <span className="text-primary glow-text whitespace-nowrap">
                  14 days
                </span>
                .
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-4"
              >
                Most businesses are losing jobs to competitors with smarter systems. We fix that.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              >
                <Button variant="hero" size="lg" asChild className="text-base">
                  <a href="#audit" className="gap-2">
                    <Sparkles size={18} />
                    Take the Free Audit →
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm text-muted-foreground mt-4"
              >
                Backed by our Clean Hands Guarantee
              </motion.p>
            </div>
          </div>
        </section>

        {/* ──────────── SCROLLING TICKER BAR ──────────── */}
        <div className="relative z-10 overflow-hidden bg-primary py-3">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="inline-block whitespace-nowrap text-white font-bold text-sm tracking-widest mx-8"
              >
                {item}
              </span>
            ))}
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`dup-${i}`}
                className="inline-block whitespace-nowrap text-white font-bold text-sm tracking-widest mx-8"
              >
                {item}
              </span>
            ))}
          </div>
          <style>{`
            .ticker-track {
              display: flex;
              width: max-content;
              animation: ticker 30s linear infinite;
            }
            @keyframes ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

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

        {/* ──────────── GOOGLE REVIEW BOMB ──────────── */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
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

        {/* ──────────── AFTER-HOURS AUDIT ──────────── */}
        <section
          id="audit"
          className="py-20 md:py-28 px-4 md:px-6 relative z-10"
        >
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Free Audit (less than one minute)
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
                Find Out What's Leaking
              </h2>
            </FadeIn>
            <AfterHoursAudit />
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
                Everything above is bundled into one simple monthly plan. No
                contracts. Cancel anytime.
              </p>
              <Button variant="hero" size="lg" asChild>
                <TrackedExternalLink
                  href="https://calendly.com/saltarelliwebstudio/30min"
                  trackingLabel="smart_stack_book_call"
                  className="gap-2 inline-flex items-center justify-center"
                >
                  Book a Discovery Call
                  <ArrowRight size={18} />
                </TrackedExternalLink>
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
                  title: "Discovery Call",
                  desc: "We hop on a 30-minute call to map out your current setup, pain points, and goals. No pitch. Just clarity.",
                },
                {
                  num: 2,
                  title: "Build & Setup",
                  desc: "We design your site, train your AI agents, and wire up your automations. You approve everything before it goes live.",
                },
                {
                  num: 3,
                  title: "It Runs. You Work.",
                  desc: "Your stack goes live. Leads get answered, reviews get collected, and you get back to the work that actually makes you money.",
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
                    If our systems aren't working harder than your newest hire
                    after 30 days, we'll refund every dollar you paid. No
                    awkward conversation. No fine print.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    We only win when your business runs better.
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
                    Ready to Get Your Systems{" "}
                    <span className="text-primary">Handled</span>?
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
                    20 minutes on your schedule. We'll map out how the Smart
                    Stack Pack can run your business while you focus on the
                    work.
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="bg-background text-foreground hover:bg-background/90 font-semibold shadow-lg"
                  >
                    <TrackedLink
                      to="/get-started"
                      trackingLabel="homepage_cta_book_call"
                      className="gap-2"
                    >
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

export default Index;
