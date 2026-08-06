import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/motion";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { CALENDLY_URL } from "@/components/CalendlyEmbed";
import { cityServiceSchema, breadcrumbSchema, CITY_PAGES } from "@/lib/schema";

interface CityPageLayoutProps {
  city: string;
  slug: string;
  /** Under 60 chars once " | Saltarelli Web Studio" is appended. */
  title: string;
  /** Under 155 chars. */
  description: string;
  /** One-line promise shown under the h1. */
  intro: string;
  children: React.ReactNode;
}

/**
 * Shared chrome for the city landing pages: SEO + Service/Breadcrumb schema,
 * hero, cross-links to the other cities, and the closing CTA.
 *
 * Layout is shared; the copy is not. Each page writes its own body sections,
 * because three pages saying the same thing with the city name swapped is a
 * near-duplicate content problem, not a local SEO strategy.
 */
export const CityPageLayout = ({
  city,
  slug,
  title,
  description,
  intro,
  children,
}: CityPageLayoutProps) => {
  const others = CITY_PAGES.filter((c) => c.slug !== slug);

  return (
    <>
      <SEO
        canonical={`/${slug}`}
        title={title}
        description={description}
        schema={[
          cityServiceSchema(city, slug, description),
          breadcrumbSchema(`Web Design in ${city}`, slug),
        ]}
      />

      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        {/* ── HERO ── */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-4xl text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-4">
                <MapPin size={16} />
                Niagara Region, Ontario
              </span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Web Design in {city}, Ontario
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {intro}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex justify-center">
                <Button variant="hero" size="lg" asChild>
                  <TrackedExternalLink
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    trackingLabel={`${slug}_hero_book_call`}
                  >
                    Book a Call <ArrowRight className="ml-2" size={20} />
                  </TrackedExternalLink>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PAGE-SPECIFIC BODY ── */}
        {children}

        {/* ── NEARBY CITIES ── */}
        <section className="py-16 md:py-20 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-4xl text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                I also work across Niagara
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {others.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/${c.slug}`}
                    className="glass rounded-full px-6 py-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    Web design in {c.city}
                  </Link>
                ))}
                <Link
                  to="/"
                  className="glass rounded-full px-6 py-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  Saltarelli Web Studio home
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
          <div className="container mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Let's talk about your {city} business
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fifteen minutes, no pitch. I'll tell you honestly where you stand
                on Google and what I'd do about it. If it's not working in 60
                days, you don't pay a cent.
              </p>
              <Button variant="hero" size="lg" asChild>
                <TrackedExternalLink
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  trackingLabel={`${slug}_footer_book_call`}
                >
                  Book a Call <ArrowRight className="ml-2" size={20} />
                </TrackedExternalLink>
              </Button>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

/** Standard prose section used by the city pages. */
export const CitySection = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => (
  <section className="py-12 md:py-16 px-4 md:px-6 relative z-10">
    <div className="container mx-auto max-w-3xl">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-5">
          {heading}
        </h2>
        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          {children}
        </div>
      </FadeIn>
    </div>
  </section>
);
