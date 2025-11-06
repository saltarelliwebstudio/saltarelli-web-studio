import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 hover:shadow-card hover:-translate-y-2 ${
        popular ? "border-primary scale-105 animate-scale-in" : "animate-fade-in"
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-heading">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="text-primary mt-1" size={16} />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={popular ? "hero" : "outline"}
          className="w-full"
          asChild
        >
          <Link to="/get-started">Choose {title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};