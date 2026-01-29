import React, { useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";

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
  
  // Create a tracking label from the title
  const trackingLabel = `portfolio_view_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group overflow-hidden glass hover:shadow-glow transition-all duration-500 h-full">
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Preview Coming Soon</span>
            </div>
          )}
          {liveUrl && (
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
              <Button variant="hero" size="sm" asChild>
                <TrackedExternalLink 
                  href={liveUrl} 
                  trackingLabel={trackingLabel}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="gap-2"
                >
                  View Live <ArrowUpRight size={16} />
                </TrackedExternalLink>
              </Button>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-heading">{title}</CardTitle>
              <p className="text-xs text-primary mt-1 font-medium">{category}</p>
            </div>
            {liveUrl && (
              <TrackedExternalLink
                href={liveUrl}
                trackingLabel={trackingLabel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Visit ${title}`}
              >
                <ExternalLink size={18} />
              </TrackedExternalLink>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
