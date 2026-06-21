import React, { useState } from "react";
import { Filter, LayoutGrid, ArrowUpRight, Apple } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortfolioCard } from "@/components/PortfolioCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";

type FeaturedStudy = {
  title: string;
  logo: string;
  badges: string[];
  status?: string;
  blurb: string;
  result: string;
  links: { label: string; href: string; icon?: "apple" | "external" }[];
};

const featured: FeaturedStudy[] = [
  {
    title: "Genius Fitness & MMA",
    logo: "/logos/genius-fitness.webp",
    badges: ["Website", "Automation", "App"],
    blurb:
      "A full digital system for UFC Contender Series fighter Anthony Romero's Niagara combat-sports gym: a custom website, automated member operations, and a native iOS app.",
    result:
      "Website plus member portal, automated check-ins and notifications, and a published iOS app members carry in their pocket.",
    links: [
      { label: "Download on the App Store", href: "https://apps.apple.com/app/id6760596680", icon: "apple" },
      { label: "Visit site", href: "https://www.geniusfitnessandmma.com", icon: "external" },
    ],
  },
  {
    title: "Melnyk Concrete",
    logo: "/logos/melnyk-concrete.png",
    badges: ["Automation"],
    blurb:
      "Zach was losing evenings to quoting and paperwork. We automated his estimate and service-agreement workflow with Claude and Retell AI.",
    result:
      "Estimates and signed service agreements now generate themselves, so the admin runs in the background instead of after hours.",
    links: [{ label: "Visit site", href: "https://www.melnykconcrete.com", icon: "external" }],
  },
  {
    title: "Luxury Details",
    logo: "/logos/luxury-details.png",
    badges: ["AI Voice Agent"],
    status: "Under construction",
    blurb:
      "We're building an AI voice agent to handle Luke's inbound calls and bookings, so every lead gets answered and scheduled without him touching the phone.",
    result:
      "In progress. The goal: no missed calls, no manual booking, and more detailing jobs on the calendar.",
    links: [{ label: "Visit site", href: "https://luxurydetails.ca", icon: "external" }],
  },
];

const portfolioItems = [
  // ── Featured-type work (App / Automation / AI Voice Agent) ──
  {
    title: "Genius Fitness App",
    description: "Native iOS app for Genius Fitness & MMA members, built alongside their website and automations.",
    category: "Fitness & Wellness",
    type: "App",
    imageUrl: "/lovable-uploads/f85c8a0e-5816-4475-b06f-7f5e11fea28d.webp",
    liveUrl: "https://apps.apple.com/app/id6760596680",
  },
  {
    title: "Melnyk Concrete — Automations",
    description: "Automated estimate and service-agreement workflow powered by Claude and Retell AI, built to take the admin off Zach's plate.",
    category: "Local Services",
    type: "Automation",
    imageUrl: "/lovable-uploads/melnyk-concrete.webp",
    liveUrl: "https://www.melnykconcrete.com",
  },
  {
    title: "Luxury Details — AI Voice Agent",
    description: "An AI voice agent in development to answer Luke's inbound calls and book detailing jobs automatically.",
    category: "Local Services",
    type: "AI Voice Agent",
    status: "Under Construction",
    imageUrl: "/lovable-uploads/luxury-details-site.webp",
    liveUrl: "https://luxurydetails.ca",
  },
  // ── Websites ──
  {
    title: "Simon \"Showtime\" Romero",
    description: "Real estate site for Simon \"Showtime\" Romero of Olympia Realty, built to win listings and capture buyer and seller leads across the Niagara Region.",
    category: "Real Estate",
    type: "Website",
    imageUrl: "/lovable-uploads/simon-real-estate.webp",
    liveUrl: "https://showtimesellshomes.ca",
  },
  {
    title: "WS Construction",
    description: "Home renovation company website for Fort Erie's experts. Showcases bathrooms, kitchens, windows, and more with a premium, modern design.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/ws-construction.webp",
    liveUrl: "https://ws-construction.ca",
  },
  {
    title: "Genius Fitness & MMA",
    description: "Modern fitness studio website with class scheduling, member portal, and integrated booking system. Built to drive memberships and streamline operations.",
    category: "Fitness & Wellness",
    type: "Website",
    imageUrl: "/lovable-uploads/f85c8a0e-5816-4475-b06f-7f5e11fea28d.webp",
    liveUrl: "https://www.geniusfitnessandmma.com",
  },
  {
    title: "Mary N Mae's Tack N Feed",
    description: "E-commerce solution for equestrian supplies and feed store. Features product catalog, online ordering, and inventory management integration.",
    category: "Retail & E-commerce",
    type: "Website",
    imageUrl: "/lovable-uploads/mary-n-maes.webp",
    liveUrl: "http://www.marynmaetacknfeed.com",
  },
  {
    title: "The Carrot Effect",
    description: "Equine wellness brand website with a clean, professional design built to establish authority and generate leads.",
    category: "Business Services",
    type: "Website",
    imageUrl: "/lovable-uploads/4a288da7-0dfe-401d-8145-ae4a58e5ac0b.webp",
    liveUrl: "https://thecarroteffect.ca",
  },
  {
    title: "Mom Duke's Authentic Jamaican Cuisine",
    description: "Restaurant website with online ordering, catering services, and menu management. Increased takeout orders by 40% in first month.",
    category: "Food & Restaurant",
    type: "Website",
    imageUrl: "/lovable-uploads/52f46296-b829-46d0-8c4f-2729a1d3cf97.webp",
    liveUrl: "https://www.momdukes2020.com",
  },
  {
    title: "Molon's Orthodontics",
    description: "Concept website design for a modern orthodontic practice. Showcases patient portal, appointment booking, and treatment information layouts.",
    category: "Healthcare",
    type: "Website",
    imageUrl: "/lovable-uploads/12bf1319-8fb6-4f87-ab56-02eaf20e2767.webp",
    liveUrl: "https://molonsorthodontics.crd.co",
  },
  {
    title: "Keeda's Home Bakery",
    description: "Artisan home bakery website with order forms, gallery of custom designs, and seasonal menu updates. Built for easy self-management.",
    category: "Food & Restaurant",
    type: "Website",
    imageUrl: "/lovable-uploads/fd861861-5f48-4fcd-ae23-704a9648c388.webp",
    liveUrl: "https://sites.google.com/view/keedas-home-bakery/home?authuser=1",
  },
  {
    title: "CDS Lawn Care Services",
    description: "Professional lawn care service website with service packages, online quotes, and seasonal maintenance scheduling.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/2f0cdffd-2fae-4ffa-85d7-d2d01a0cc1d5.webp",
    liveUrl: "https://sites.google.com/view/cds-lawn-care-services/home?authuser=1",
  },
  {
    title: "Pop's Landscaping",
    description: "Full-service landscaping company website with project gallery, service offerings, and quote request functionality.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/pops-landscaping.webp",
    liveUrl: "https://popslandscaping.ca/",
  },
  {
    title: "G&D Landscaping",
    description: "Professional landscaping website featuring lawn care, garden maintenance, and snow removal services. Clean design with easy quote requests.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/gd-landscaping.webp",
    liveUrl: "https://gdlandscaping.ca/",
  },
  {
    title: "Bluewater Stone Hardscaping",
    description: "Premium hardscaping company website showcasing custom stonework, retaining walls, and outdoor living spaces. Features gallery and free quote system.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/bluewater-stone.webp",
    liveUrl: "https://bluewaterstone.ca/",
  },
  {
    title: "Cassar Electric",
    description: "Industrial and commercial electrical services website for the Niagara region. Professional design with service information and contact functionality.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/cassar-electric.webp",
    liveUrl: "https://cassarelectric.ca/",
  },
  {
    title: "Tree and Stump Removal",
    description: "Professional tree and stump removal services website for Port Colborne and the Niagara region. Features service information, gallery, and quote request functionality.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/tree-stump-removal.webp",
    liveUrl: "https://treeandstumpremoval.ca/",
  },
  {
    title: "Claude's Roofing",
    description: "Professional roofing services website for Brantford and Southern Ontario. Features shingle roofing, repairs, skylights, and snow removal with 30+ years of experience.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/claudes-roofing.webp",
    liveUrl: "https://claudesroofing.ca/",
  },
  {
    title: "Luke's Luxury Details",
    description: "Auto-detailing website featuring ceramic coating, paint correction, window tint, and detailing packages with a premium, conversion-focused design.",
    category: "Automotive",
    type: "Website",
    imageUrl: "/lovable-uploads/luxury-details-site.webp",
    liveUrl: "https://luxurydetails.ca",
  },
  {
    title: "Mohawk Electric",
    description: "Electrical contractor website built to win residential and commercial work across the region, with clear services and easy contact.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/mohawk-electric-site.webp",
    liveUrl: "https://mohawkelectric.ca",
  },
  {
    title: "MBV Specialty Services",
    description: "Electrical services website covering residential, commercial, and industrial work across Ontario, with a bold, modern design.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/mbv-site.webp",
    liveUrl: "https://mbvinc.ca",
  },
  {
    title: "360 Property Maintenance",
    description: "Property maintenance company website covering year-round property care, with clear service offerings and quote requests.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/360-property-site.webp",
    liveUrl: "https://360propertymaintenance.com",
  },
  {
    title: "Landscape One",
    description: "Landscaping and outdoor-living website built to turn yards into showpieces, with a project gallery and quote flow.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/landscape-one-site.webp",
    liveUrl: "https://landscapeone.ca",
  },
  {
    title: "Skunk Removal Services Niagara",
    description: "Wildlife removal website built to capture urgent local service calls, with fast contact and clear service areas.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/skunk-removal-site.webp",
    liveUrl: "https://skunkremovalservicesniagara.ca",
  },
  {
    title: "Mark Windows and Doors",
    description: "Windows and doors company website showcasing products and installations with a strong, trustworthy local presence.",
    category: "Local Services",
    type: "Website",
    imageUrl: "/lovable-uploads/mark-windows-site.webp",
    liveUrl: "https://windowsanddoorsbymark.com",
  },
  {
    title: "Santoro Pizza",
    description: "Restaurant website for Santoro Pizza in Port Colborne, featuring their menu, story, and ordering details.",
    category: "Food & Restaurant",
    type: "Website",
    imageUrl: "/lovable-uploads/santoro-site.webp",
    liveUrl: "https://santoropizza.ca",
  },
  {
    title: "Niagara Antique Power Association",
    description: "Heritage organization website showcasing NAPA's annual antique power show, origins, Ford feature, and events.",
    category: "Community",
    type: "Website",
    imageUrl: "/lovable-uploads/napa-site.webp",
    liveUrl: "https://www.niagaraantiquepower.org",
  },
];

const FeaturedCard = ({ study }: { study: FeaturedStudy }) => (
  <div className="glass-strong flex h-full flex-col rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
    <div className="mb-4 flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
        <img src={study.logo} alt={study.title} className="max-h-full max-w-full object-contain" />
      </div>
      <h3 className="font-heading text-xl font-bold">{study.title}</h3>
    </div>
    <div className="mb-4 flex flex-wrap gap-2">
      {study.badges.map((b) => (
        <span key={b} className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
          {b}
        </span>
      ))}
      {study.status && (
        <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
          {study.status}
        </span>
      )}
    </div>
    <p className="mb-4 text-sm leading-relaxed text-foreground/90">{study.blurb}</p>
    <div className="mb-5 rounded-xl border border-white/10 bg-background/40 p-4">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">The Result</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{study.result}</p>
    </div>
    {study.links.length > 0 && (
      <div className="mt-auto flex flex-wrap gap-3">
        {study.links.map((l) => (
          <Button key={l.href} variant={l.icon === "apple" ? "hero" : "outline"} size="sm" asChild>
            <TrackedExternalLink
              href={l.href}
              trackingLabel={`portfolio_featured_${study.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              {l.icon === "apple" ? <Apple size={16} /> : <ArrowUpRight size={16} />}
              {l.label}
            </TrackedExternalLink>
          </Button>
        ))}
      </div>
    )}
  </div>
);

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const types = ["all", ...Array.from(new Set(portfolioItems.map((i) => i.type)))];
  const filteredItems =
    filter === "all" ? portfolioItems : portfolioItems.filter((i) => i.type === filter);

  return (
    <>
      <SEO
        canonical="/portfolio"
        title="Web Design Portfolio"
        description="See our work. Custom websites, AI automations, voice agents, and apps built for Ontario businesses. Real results for Genius Fitness, Melnyk Concrete, Pop's Landscaping, and more."
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        {/* Hero */}
        <section className="relative min-h-[42svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-8">
          <div className="container mx-auto max-w-4xl relative z-10 text-center">
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
                <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                  <LayoutGrid className="w-14 h-14 md:w-18 md:h-18 text-white" />
                </div>
              </motion.div>
            </motion.div>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">My Portfolio</h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-xl text-muted-foreground">
                Websites, AI automations, voice agents, and apps, built for real businesses across Ontario.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Featured Work */}
        <section className="py-12 md:py-16 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                Featured Work
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Not just websites. Full systems.
              </h2>
            </FadeIn>
            <StaggerContainer className="grid gap-6 md:grid-cols-3">
              {featured.map((s) => (
                <StaggerItem key={s.title}>
                  <FeaturedCard study={s} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="py-8 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">All Projects</h2>
            </FadeIn>
            <div className="flex items-center gap-2 mb-10 flex-wrap justify-center">
              <Filter className="text-muted-foreground" size={20} />
              {types.map((t) => (
                <Button
                  key={t}
                  variant={filter === t ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setFilter(t)}
                  className="capitalize"
                >
                  {t === "all" ? "All Projects" : t}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredItems.map((item, index) => (
                <PortfolioCard key={index} {...item} />
              ))}
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-heading font-bold mb-4">Want results like these?</h2>
              <p className="text-muted-foreground mb-6">
                Grab a free online audit and I'll map out exactly what a website, automation, or AI agent could do for your business.
              </p>
              <Button variant="hero" asChild>
                <TrackedExternalLink
                  href="https://calendly.com/saltarelliwebstudio/free-15-minute-online-presence-review"
                  trackingLabel="portfolio_book_call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Free Online Audit
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
