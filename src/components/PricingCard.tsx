import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackedLink } from "@/components/TrackedLink";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
}) => {
  // Create a tracking label from the title
  const trackingLabel = `pricing_choose_${title.toLowerCase().replace(/\s+/g, '_')}`;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card
        className={`relative overflow-hidden h-full transition-all duration-500 ${
          popular
            ? "glass-strong border-primary/50 shadow-glow"
            : "glass"
        }`}
      >
        {popular && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 text-xs font-bold rounded-bl-xl">
            MOST POPULAR
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-heading">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
          {price && (
            <div className="mt-4">
              <span className="text-4xl font-bold text-primary">{price}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="text-primary" size={12} />
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            variant={popular ? "hero" : "outline"}
            className="w-full"
            asChild
          >
            <TrackedLink to="/get-started" trackingLabel={trackingLabel}>Choose {title}</TrackedLink>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
