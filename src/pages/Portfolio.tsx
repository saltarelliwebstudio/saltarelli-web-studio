import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortfolioCard } from "@/components/PortfolioCard";

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
      description: "Concept design for modern orthodontic practice. Features patient portal, appointment booking, and treatment information.",
      category: "Healthcare",
      imageUrl: "/lovable-uploads/12bf1319-8fb6-4f87-ab56-02eaf20e2767.png",
      liveUrl: "https://molonsorthodontics.crd.co",
    },
    {
      title: "Sophia's Sweets & Café",
      description: "Bakery and café website with online ordering for custom cakes, daily specials, and catering menu. Instagram integration for showcasing creations.",
      category: "Food & Restaurant",
      imageUrl: "/lovable-uploads/5b3b4050-2ba2-4f7d-a116-3fb2422da4e5.png",
      liveUrl: "https://sites.google.com/view/sophiassweetscafe/home?authuser=1",
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
    <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            My Portfolio
          </h1>
          <p className="text-xl text-muted-foreground">
            Real websites for real businesses. See what's possible.
          </p>
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
              <Link to="/get-started">
                Book a Discovery Call
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;