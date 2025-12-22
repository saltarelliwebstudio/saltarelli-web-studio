import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  business: string;
  rating?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  business,
  rating = 5,
}) => {
  return (
    <Card className="glass-strong hover:shadow-glow transition-all duration-500">
      <CardContent className="pt-8 pb-8 px-6 md:px-8">
        <Quote className="text-primary/30 mb-4" size={40} />
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={
                i < rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground/30"
              }
            />
          ))}
        </div>
        <blockquote className="text-lg md:text-xl mb-6 leading-relaxed text-foreground/90">
          "{quote}"
        </blockquote>
        <div>
          <p className="font-semibold font-heading text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{business}</p>
        </div>
      </CardContent>
    </Card>
  );
};
