"use client";

/**
 * AboutSection — Minimal Editorial Engineering Overview
 * ───────────────────────────────────────────────────────
 * Specifications:
 * • Theme: Locked to deep dark mode (`bg-[#000000] text-white`).
 * • Typography: Crisp, authoritative headers without AI-cliché floating shapes.
 * • Layout: 2-column minimal grid (`lg:grid-cols-[2fr_1fr]`), collapsing cleanly on mobile (`w-full px-4 sm:px-6`).
 * • Left Column: Full-stack capabilities statement (React, Next.js, Node.js, Clean Architecture).
 * • Right Column: Integrated profile photograph with grayscale-to-color hover transition + structured metadata stack.
 * • Optimization: Flat DOM hierarchy, zero layout shift (CLS), hardware-accelerated (`transform-gpu`) hovers.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full bg-[#000000] text-white py-20 md:py-28 border-t border-neutral-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">

        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              03 // Overview
            </p>
          </div>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Engineering scalable web systems with deliberate design.
          </h2>
        </div>

        {/* ── 2-Column Minimal Architecture Grid ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">

          {/* ════════════════════════════════════════════════════════════════
              LEFT COLUMN — Core Capabilities & Philosophy (2fr)
              ════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Primary statement block */}
            <div className="border-l-2 border-neutral-800 pl-6 space-y-4">
              <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-neutral-200">
                I am a full-stack engineer dedicated to building high-performance,
                production-grade web applications where code clarity and user experience
                reinforce each other.
              </p>
              <p className="text-sm sm: leading-relaxed text-neutral-400">
                Rather than treating frontend and backend as detached silos, I bridge the full
                lifecycle: from architecting type-safe data schemas and resilient REST/real-time
                services to choreographing 60&nbsp;FPS compositor-driven user interfaces.
              </p>
            </div>

            {/* Core Capability Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Pillar 1 */}
              <div className="space-y-2 border-t border-neutral-900 pt-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  // Frontend Precision
                </h3>
                <p className="text-sm font-semibold text-white">
                  React 19 &amp; Next.js App Router
                </p>
                <p className="text-xs leading-relaxed text-neutral-400">
                  Mastery of SSR, Server Components, client-side caching, fluid layout
                  motion, and strict Lighthouse performance metrics (sub-second LCP).
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-2 border-t border-neutral-900 pt-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  // Backend &amp; Data
                </h3>
                <p className="text-sm font-semibold text-white">
                  Node.js &amp; PostgreSQL
                </p>
                <p className="text-xs leading-relaxed text-neutral-400">
                  RESTful API modeling, Prisma ORM workflows, relational query optimization,
                  session security, and low-latency WebSocket collaboration rooms.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-2 border-t border-neutral-900 pt-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  // Architecture
                </h3>
                <p className="text-sm font-semibold text-white">
                  Clean Modular Structure
                </p>
                <p className="text-xs leading-relaxed text-neutral-400">
                  Separation of concerns across UI, business logic, and database access
                  layers—keeping codebases refactor-friendly as features expand.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="space-y-2 border-t border-neutral-900 pt-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  // Type Safety
                </h3>
                <p className="text-sm font-semibold text-white">
                  TypeScript Everywhere
                </p>
                <p className="text-xs leading-relaxed text-neutral-400">
                  Strict typing from database entities to API contracts and React component
                  props, eliminating whole categories of runtime errors.
                </p>
              </div>
            </div>

            {/* Read more inline link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="transform-gpu will-change-transform inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-neutral-300 transition-colors duration-200 group"
              >
                <span className="underline underline-offset-4 decoration-neutral-700 group-hover:decoration-white">
                  Read full professional journey &amp; background
                </span>
                <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT COLUMN — Profile Image + Metadata Stack (1fr)
              ════════════════════════════════════════════════════════════════ */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col w-full"
          >
            {/* ── Profile Image Wrapper ───────────────────────────────── */}
            <div className="group relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 mb-6 transform-gpu will-change-transform">
              <Image
                src="/dipubiswas.jpg"
                alt="Portrait of Dipu Biswas — Full-Stack Developer"
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                priority
                className="object-cover object-center grayscale contrast-115 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
              />

              {/* Subtle dark gradient overlay at bottom edge */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* In-image caption footer */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-white drop-shadow-sm">
                  Dipu Biswas
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-xs">
                  DEV // FULL-STACK
                </span>
              </div>
            </div>

            {/* ── Structured Metadata Stack ───────────────────────────── */}
            <div className="flex flex-col divide-y divide-neutral-900 border-t border-b border-neutral-900">
              {/* Meta Row 1: Location */}
              <div className="py-3.5 space-y-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Location
                </p>
                <p className="text-sm font-medium text-white">
                  Balagarh, West Bengal, India
                </p>
                <p className="text-xs text-neutral-500">
                  Standard Time (UTC +05:30)
                </p>
              </div>

              {/* Meta Row 2: Availability */}
              <div className="py-3.5 space-y-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Availability
                </p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    Open for opportunities
                  </p>
                </div>
                <p className="text-xs text-neutral-500">
                  Full-time remote roles &amp; high-impact contracts
                </p>
              </div>

              {/* Meta Row 3: Primary Languages & Tools */}
              <div className="py-3.5 space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "TypeScript",
                    "Next.js",
                    "React",
                    "Node.js",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "Prisma",
                    "Docker",
                  ].map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] text-neutral-300 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Row 4: GitHub Linkage */}
              <div className="py-3.5 space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Version Control &amp; Code
                </p>
                <a
                  href="https://github.com/dipu59"
                  target="_blank"
                  rel="noreferrer"
                  className="transform-gpu will-change-transform group flex items-center justify-between border border-neutral-800 bg-neutral-950 p-3 rounded-lg hover:border-neutral-700 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <SiGithub className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
                    <span className="font-mono text-xs text-neutral-200 group-hover:text-white transition-colors">
                      github.com/dipu59
                    </span>
                  </div>
                  <LuArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Meta Row 5: Direct Contact */}
              <div className="py-3.5 space-y-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Direct Communication
                </p>
                <a
                  href="mailto:12biswasdipu@gmail.com"
                  className="font-mono text-xs text-white hover:text-neutral-300 underline underline-offset-4 decoration-neutral-800 transition-colors"
                >
                  12biswasdipu@gmail.com
                </a>
              </div>
            </div>
          </motion.aside>

        </div>
      </div>
    </section>
  );
}
