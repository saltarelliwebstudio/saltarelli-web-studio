import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { trackButtonClick } from "@/lib/analytics";

interface TrackedLinkProps extends LinkProps {
  trackingLabel: string;
  children: React.ReactNode;
}

/**
 * A wrapper around React Router's Link that fires a GA tracking event on click
 */
export const TrackedLink: React.FC<TrackedLinkProps> = ({
  trackingLabel,
  children,
  to,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Extract text content from children for tracking
    const buttonText = typeof children === "string" 
      ? children 
      : (e.currentTarget.textContent || "");
    
    trackButtonClick(trackingLabel, buttonText, String(to));
    
    // Call original onClick if provided
    onClick?.(e);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
