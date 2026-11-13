"use client";

import { useEffect, useState } from "react";

export function BlogReaderProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      const scrollProgress = (totalScroll / windowHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(212,255,36,0.8)]"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #1558C9 0%, #3b82f6 50%, #D4FF24 100%)",
        }}
      />
    </div>
  );
}
