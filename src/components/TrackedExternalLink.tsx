import React from "react";
import { trackButtonClick } from "@/lib/analytics";

interface TrackedExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  trackingLabel: string;
  children: React.ReactNode;
}

/**
 * A wrapper around standard anchor tags for external links that fires a GA tracking event on click
 */
export const TrackedExternalLink: React.FC<TrackedExternalLinkProps> = ({
  trackingLabel,
  children,
  href,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Extract text content from children for tracking
    const buttonText = typeof children === "string" 
      ? children 
      : (e.currentTarget.textContent || "");
    
    trackButtonClick(trackingLabel, buttonText, href || "");
    
    // Call original onClick if provided
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
