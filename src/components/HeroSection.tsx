"use client";

/**
 * HeroSection — Fully Responsive Dark Mode Hero Component
 * ────────────────────────────────────────────────────────
 * Specifications:
 * • Dark Mode Locked: Base `#000000` with high-contrast white text.
 * • Mobile/Tablet: 100% fluid, no clipped widths or restrictive fixed dimensions (`w-full`).
 * • Typography: Dynamic sizing (`text-3xl md:text-5xl lg:text-6xl`) with stark readability.
 * • Buttons: Contrast-inverted styling with GPU-accelerated hover physics.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight, LuDownload } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/dipu59", icon: faGithub },
  { label: "Twitter", href: "https://x.com/dipu_biswas_dev", icon: faTwitter },
  { label: "LinkedIn", href: "https://in.linkedin.com/in/dipu-biswas-b0b06a381", icon: faLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/dipubiswas_official_/", icon: faInstagram },
] as const;

export function HeroSection() {
  return (
    <section
      aria-label="Hero Introduction"
      className="relative w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* ── Main Responsive Grid ────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">

        {/* ── Left Column: Headline, Subtext, CTAs (7 Cols on desktop) ──── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:col-span-7 flex flex-col items-start gap-6 sm:gap-7"
        >
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-900/90 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full rounded-full animate-ping bg-emerald-500 opacity-70"
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span>Available for premium collaborations</span>
          </div>

          {/* Dynamic Headline */}
          <h1 className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Trust me, I&apos;m a{" "}
            <span className="text-white underline decoration-neutral-700 decoration-2 underline-offset-8">
              software developer.
            </span>
          </h1>

          {/* Sub-headline / Description */}
          <p className="w-full max-w-xl text-sm sm:text-[16px] text-neutral-200 leading-relaxed  ">
            I build fast, scalable, production-ready web apps using{" "}
            <span className="font-semibold text-white">
              React, Next.js, and Node.js
            </span>
            —turning ideas into smooth, high-impact digital experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
            {/* Primary Action */}
            <a
              href="#projects"
              className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 bg-white text-black hover:bg-neutral-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <span>View Selected Work</span>
              <LuArrowUpRight className="h-4 w-4" />
            </a>

            {/* Secondary Action */}
            <a
              href="/resume.pdf"
              download
              className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-transparent px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-neutral-900 hover:border-neutral-500 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <span>Download Resume</span>
              <LuDownload className="h-4 w-4" />
            </a>
          </div>

          {/* Social Row & Location */}
          <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-neutral-800/90 w-full text-xs">
            <div className="flex items-center gap-3.5">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-neutral-400 hover:text-white transition-colors text-[16px] p-1"
                >
                  <FontAwesomeIcon icon={icon} />
                </Link>
              ))}
            </div>

            <span className="hidden sm:inline-block h-3 w-px bg-neutral-700" />

            <p className="text-neutral-400 text-xs font-mono">
              BALAGARH, WEST BENGAL // OPEN TO REMOTE
            </p>
          </div>
        </motion.div>

        {/* ── Right Column: Profile Card (5 Cols on desktop) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:col-span-5 flex justify-center md:justify-end"
        >
          <div className="w-full max-w-sm sm:max-w-md md:max-w-none rounded-2xl sm:rounded-3xl border border-neutral-800 bg-[#000000] p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            {/* Image Container */}
            <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-800 bg-neutral-900">
              <Image
                src="/og-image.webp"
                alt="Dipu Biswas — Software Developer"
                fill
                priority
                sizes="(min-width: 1024px) 340px, (min-width: 768px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Card Information */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-[16px] font-bold text-white">
                  Dipu Biswas
                </p>
                <p className="text-xs text-neutral-400">
                  Full-stack Developer · Next.js &amp; React
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[10px] font-mono font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
