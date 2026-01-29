import React, { useState } from "react";
import { Filter, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortfolioCard } from "@/components/PortfolioCard";
import { FadeIn } from "@/components/motion";
import { SEO } from "@/components/SEO";
import { TrackedLink } from "@/components/TrackedLink";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const portfolioItems = [
    {
      title: "Genius Fitness & MMA",
      description: "Modern fitness studio website with class scheduling, member portal, and integrated booking system. Built to drive memberships and streamline operations.",
      category: "Fitness & Wellness",
      imageUrl: "/lovable-uploads/f85c8a0e-5816-4475-b06f-7f5e11fea28d.png",
      liveUrl: "https://www.geniusfitnessandmma.com",
    },
    {
      title: "Mary N Mae's Tack N Feed",
      description: "E-commerce solution for equestrian supplies and feed store. Features product catalog, online ordering, and inventory management integration.",
      category: "Retail & E-commerce",
      imageUrl: "/lovable-uploads/mary-n-maes.png",
      liveUrl: "http://www.marynmaetacknfeed.com",
    },
    {
      title: "The Carrot Effect",
      description: "Professional consulting firm website with resource library, blog, and client portal. Designed to establish authority and generate leads.",
      category: "Business Services",
      imageUrl: "/lovable-uploads/4a288da7-0dfe-401d-8145-ae4a58e5ac0b.png",
      liveUrl: "https://thecarroteffect.ca",
    },
    {
      title: "Mom Duke's Authentic Jamaican Cuisine",
      description: "Restaurant website with online ordering, catering services, and menu management. Increased takeout orders by 40% in first month.",
      category: "Food & Restaurant",
      imageUrl: "/lovable-uploads/52f46296-b829-46d0-8c4f-2729a1d3cf97.png",
      liveUrl: "https://www.momdukes2020.com",
    },
    {
      title: "Molon's Orthodontics",
      description: "Concept website design for a modern orthodontic practice. Showcases patient portal, appointment booking, and treatment information layouts.",
      category: "Healthcare",
      imageUrl: "/lovable-uploads/12bf1319-8fb6-4f87-ab56-02eaf20e2767.png",
      liveUrl: "https://molonsorthodontics.crd.co",
    },
    {
      title: "Keeda's Home Bakery",
      description: "Artisan home bakery website with order forms, gallery of custom designs, and seasonal menu updates. Built for easy self-management.",
      category: "Food & Restaurant",
      imageUrl: "/lovable-uploads/fd861861-5f48-4fcd-ae23-704a9648c388.png",
      liveUrl: "https://sites.google.com/view/keedas-home-bakery/home?authuser=1",
    },
    {
      title: "CDS Lawn Care Services",
      description: "Professional lawn care service website with service packages, online quotes, and seasonal maintenance scheduling.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/2f0cdffd-2fae-4ffa-85d7-d2d01a0cc1d5.png",
      liveUrl: "https://sites.google.com/view/cds-lawn-care-services/home?authuser=1",
    },
    {
      title: "Pop's Landscaping",
      description: "Full-service landscaping company website with project gallery, service offerings, and quote request functionality.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/pops-landscaping.png",
      liveUrl: "https://popslandscaping.ca/",
    },
    {
      title: "G&D Landscaping",
      description: "Professional landscaping website featuring lawn care, garden maintenance, and snow removal services. Clean design with easy quote requests.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/gd-landscaping.png",
      liveUrl: "https://gdlandscaping.ca/",
    },
    {
      title: "Bluewater Stone Hardscaping",
      description: "Premium hardscaping company website showcasing custom stonework, retaining walls, and outdoor living spaces. Features gallery and free quote system.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/bluewater-stone.png",
      liveUrl: "https://bluewaterstone.ca/",
    },
    {
      title: "Cassar Electric",
      description: "Industrial and commercial electrical services website for the Niagara region. Professional design with service information and contact functionality.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/cassar-electric.png",
      liveUrl: "https://cassarelectric.ca/",
    },
    {
      title: "Tree and Stump Removal",
      description: "Professional tree and stump removal services website for Port Colborne and the Niagara region. Features service information, gallery, and quote request functionality.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/tree-stump-removal.png",
      liveUrl: "https://treeandstumpremoval.ca/",
    },
    {
      title: "Claude's Roofing",
      description: "Professional roofing services website for Brantford and Southern Ontario. Features shingle roofing, repairs, skylights, and snow removal with 30+ years of experience.",
      category: "Home Services",
      imageUrl: "/lovable-uploads/claudes-roofing.png",
      liveUrl: "https://claudesroofing.ca/",
    },
  ];

  const categories = [
    "all",
    ...new Set(portfolioItems.map((item) => item.category)),
  ];

  const filteredItems =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  return (
    <>
      <SEO
        canonical="/portfolio"
        title="Web Design Portfolio — Real Projects for Real Businesses"
        description="Browse our portfolio of custom websites for Ontario businesses. Fitness studios, restaurants, landscaping, and more. See what's possible for your business."
      />
    <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
      <Starfield />
      
      {/* Mesh gradient overlay */}
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
      
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50svh] flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          {/* Folder Icon */}
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
                <FolderOpen className="w-14 h-14 md:w-18 md:h-18 text-white" />
              </div>
            </motion.div>
          </motion.div>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              My Portfolio
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-xl text-muted-foreground">
              Real websites for real businesses. See what's possible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-8 flex-wrap justify-center">
            <Filter className="text-muted-foreground" size={20} />
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "hero" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="capitalize"
              >
                {category === "all" ? "All Projects" : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredItems.map((item, index) => (
              <PortfolioCard key={index} {...item} />
            ))}
          </div>

          {/* Case Study Note */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">
              Want to See More Details?
            </h2>
            <p className="text-muted-foreground mb-6">
              Each project includes before/after comparisons, strategy insights, 
              and measurable results. Contact me to discuss how we achieved these outcomes.
            </p>
            <Button variant="hero" asChild>
              <TrackedLink to="/get-started" trackingLabel="portfolio_book_call">
                Book a Discovery Call
              </TrackedLink>
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
