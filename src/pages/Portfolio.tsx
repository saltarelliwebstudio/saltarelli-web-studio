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
      liveUrl: "#",
    },
    {
      title: "Mary N Mae's Tack N Feed",
      description: "E-commerce solution for equestrian supplies and feed store. Features product catalog, online ordering, and inventory management integration.",
      category: "Retail & E-commerce",
      liveUrl: "#",
    },
    {
      title: "The Carrot Effect",
      description: "Professional consulting firm website with resource library, blog, and client portal. Designed to establish authority and generate leads.",
      category: "Business Services",
      liveUrl: "#",
    },
    {
      title: "Mom Duke's Authentic Jamaican Cuisine",
      description: "Restaurant website with online ordering, catering services, and menu management. Increased takeout orders by 40% in first month.",
      category: "Food & Restaurant",
      liveUrl: "#",
    },
    {
      title: "Molon's Orthodontics",
      description: "Concept design for modern orthodontic practice. Features patient portal, appointment booking, and treatment information.",
      category: "Healthcare",
      liveUrl: "#",
    },
    {
      title: "Sophia's Sweets & Café",
      description: "Bakery and café website with online ordering for custom cakes, daily specials, and catering menu. Instagram integration for showcasing creations.",
      category: "Food & Restaurant",
      liveUrl: "#",
    },
    {
      title: "Keeda's Home Bakery",
      description: "Artisan home bakery website with order forms, gallery of custom designs, and seasonal menu updates. Built for easy self-management.",
      category: "Food & Restaurant",
      liveUrl: "#",
    },
    {
      title: "CDS Lawn Care Services",
      description: "Professional lawn care service website with service packages, online quotes, and seasonal maintenance scheduling.",
      category: "Home Services",
      liveUrl: "#",
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
    <div className="min-h-screen bg-background text-foreground relative">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
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
      <section className="py-8 px-6 relative z-10">
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
      <section className="py-12 px-6 relative z-10">
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
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;