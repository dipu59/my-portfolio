"use client";

/**
 * CyberLayout — Responsive Dark Layout Wrapper
 * ─────────────────────────────────────────────
 * Specifications:
 * • Dark Mode Locked: `#000000` base with white text.
 * • Mobile/Tablet: 100% fluid and visible (`w-full px-4 sm:px-6`). Zero side borders.
 * • Large Screens (lg+): Anchors into structured bounds with `lg:max-w-4xl lg:mx-auto lg:px-8 lg:border-l lg:border-r border-neutral-800`.
 * • Compositor-only neon pulse animations along vertical borders on desktop.
 */

import { type ReactNode } from "react";

interface CyberLayoutProps {
  children: ReactNode;
}

export function CyberLayout({ children }: CyberLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/*
       * Main structural container:
       * - Fluid on mobile/tablet: `w-full px-4 sm:px-6`
       * - Centered with bounded lines on large screens: `lg:max-w-4xl lg:mx-auto lg:px-8 lg:border-l lg:border-r`
       */}
      <div className="relative w-full px-4 sm:px-6 lg:max-w-4xl lg:mx-auto lg:px-8 lg:border-l lg:border-r border-neutral-800">
        {/* Animated neon pulse lines along the desktop vertical borders */}
        <span
          aria-hidden="true"
          className="hidden lg:block cyber-pulse-line -left-px opacity-100"
        />
        <span
          aria-hidden="true"
          className="hidden lg:block cyber-pulse-line cyber-pulse-line--delayed -right-px opacity-100"
        />

        {/* Central main content */}
        <main className="relative w-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
