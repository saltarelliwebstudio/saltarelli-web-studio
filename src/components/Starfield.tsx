import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const Starfield = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Generate stars
    const starCount = 100;
    const newStars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
      });
    }
    
    setStars(newStars);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="starfield fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-hero"></div>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};