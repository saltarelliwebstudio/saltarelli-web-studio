import React from "react";
import { Star } from "lucide-react";
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
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-500 hover:-translate-y-1 animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground/30"
              }
            />
          ))}
        </div>
        <blockquote className="text-lg mb-4 italic">"{quote}"</blockquote>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{business}</p>
        </div>
      </CardContent>
    </Card>
  );
};