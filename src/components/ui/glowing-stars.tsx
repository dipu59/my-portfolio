"use client";

import { useEffect, useState } from 'react';

export function GlowingStars() {
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 30; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 5
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-80 animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: i % 2 ? '#a855f7' : '#4ade80',
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
