import React, { useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PortfolioCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  liveUrl?: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  category,
  imageUrl,
  liveUrl,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group overflow-hidden hover:shadow-card transition-all duration-300">
      <div className="aspect-video relative overflow-hidden bg-gradient-cosmic">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/50 text-sm">Preview Coming Soon</span>
          </div>
        )}
        {liveUrl && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="cosmic" size="sm" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                View Live <ArrowUpRight size={16} />
              </a>
            </Button>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-xs text-primary mt-1">{category}</p>
          </div>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`Visit ${title}`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};