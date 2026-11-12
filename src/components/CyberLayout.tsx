"use client";

import { type ReactNode } from "react";

interface CyberLayoutProps {
  children: ReactNode;
}

export function CyberLayout({ children }: CyberLayoutProps) {
  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "#030407", color: "#ffffff" }}
    >
      <div className="relative w-full px-4 sm:px-6 lg:max-w-4xl lg:mx-auto lg:px-8 lg:border-l lg:border-r"
        style={{ borderColor: "#1a2235" }}
      >
        {/* Animated brand-blue pulse line — left border */}
        <span
          aria-hidden="true"
          className="hidden lg:block cyber-pulse-line -left-px"
        />
        {/* Animated lime pulse line — right border */}
        <span
          aria-hidden="true"
          className="hidden lg:block cyber-pulse-line cyber-pulse-line--delayed -right-px"
        />

        <main className="relative w-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
