"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowUpRight, LuDownload } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { NeonSnakeGame } from "./NeonSnakeGame";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/dipu59", icon: faGithub },
  { label: "Twitter", href: "https://x.com/dipu_biswas_dev", icon: faTwitter },
  { label: "LinkedIn", href: "https://in.linkedin.com/in/dipu-biswas-b0b06a381", icon: faLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/dipubiswas_official_/", icon: faInstagram },
] as const;

export function HeroSection() {
  const [isGameActive, setIsGameActive] = useState(false);

  return (
    <section
      aria-label="Hero Introduction"
      className="relative w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 lg:pt-36 lg:pb-24"
      style={{ backgroundColor: "#030407" }}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">

        {/* ── Left Column ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:col-span-7 flex flex-col items-start gap-6 sm:gap-7"
        >
          {/* Status Pill & Game Toggle Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white"
              style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute inline-flex h-full w-full rounded-full opacity-70"
                  style={{ backgroundColor: "#D4FF24", animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#D4FF24", boxShadow: "0 0 8px rgba(212,255,36,0.7)" }}
                />
              </span>
              <span>Available for premium collaborations</span>
            </div>

            <button
              onClick={() => setIsGameActive((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono font-medium border transition-all cursor-pointer select-none active:scale-95"
              style={{
                borderColor: isGameActive ? "#1558C9" : "rgba(212,255,36,0.35)",
                backgroundColor: isGameActive ? "rgba(21,88,201,0.15)" : "rgba(212,255,36,0.08)",
                color: isGameActive ? "#60a5fa" : "#D4FF24",
                boxShadow: isGameActive
                  ? "0 0 15px rgba(21,88,201,0.3)"
                  : "0 0 15px rgba(212,255,36,0.2)",
              }}
            >
              <span>🎮</span>
              <span>{isGameActive ? "View Profile" : "Play Cyber Snake"}</span>
            </button>
          </div>

          {/* Headline */}
          <h1 className="w-full text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            Trust me, I&apos;m a{" "}
            <span
              className="relative inline-block"
              style={{ color: "#D4FF24" }}
            >
              software developer.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="w-full max-w-xl text-sm sm:text-[16px] leading-relaxed" style={{ color: "#94a3b8" }}>
            I build fast, scalable, production-ready web apps using{" "}
            <span className="font-semibold text-white">React, Next.js, and Node.js</span>
            —turning ideas into smooth, high-impact digital experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3.5 pt-2 w-full sm:w-auto">
            {/* Primary */}
            <a
              href="#projects"
              className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 w-auto"
              style={{
                backgroundColor: "#1558C9",
                color: "#ffffff",
                boxShadow: "0 0 24px rgba(21,88,201,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 32px rgba(21,88,201,0.65)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(21,88,201,0.4)";
              }}
            >
              <span>View Selected Work</span>
              <LuArrowUpRight className="h-4 w-4" />
            </a>

            {/* Secondary */}
            <a
              href="/resume.pdf"
              download
              className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 w-auto"
              style={{
                border: "1px solid rgba(212,255,36,0.35)",
                backgroundColor: "transparent",
                color: "#D4FF24",
              }}
            >
              <span>Resume</span>
              <LuDownload className="h-4 w-4" />
            </a>
          </div>

          {/* Social Row */}
          <div
            className="flex flex-wrap items-center gap-5 pt-3 w-full text-xs"
            style={{ borderTop: "1px solid #1a2235" }}
          >
            <div className="flex items-center gap-3.5">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-[16px] p-1 transition-colors duration-200"
                  style={{ color: "#64748b" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#D4FF24";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#64748b";
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </Link>
              ))}
            </div>

            <span className="hidden md:inline-block h-3 w-px" style={{ backgroundColor: "#1a2235" }} />
          </div>
        </motion.div>

        {/* ── Right Column: Profile Card OR Neon Snake Arcade Console ─────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:col-span-5 flex justify-center md:justify-end"
        >
          <AnimatePresence mode="wait">
            {isGameActive ? (
              <motion.div
                key="snake-arcade"
                initial={{ opacity: 0, scale: 0.92, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <NeonSnakeGame onClose={() => setIsGameActive(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="profile-card"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-sm sm:max-w-md md:max-w-none rounded-2xl sm:rounded-3xl p-4 sm:p-5 group relative"
                style={{
                  border: "1px solid #1a2235",
                  backgroundColor: "#0a0d14",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.70)",
                }}
              >
                {/* Floating Game Trigger Pill On Top of Image */}
                <button
                  onClick={() => setIsGameActive(true)}
                  className="absolute top-7 right-7 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#030407]/80 backdrop-blur-md border border-[#D4FF24]/50 text-[#D4FF24] shadow-[0_0_15px_rgba(212,255,36,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-ping" />
                  <span>🎮 Play Snake</span>
                </button>

                {/* Image */}
                <div
                  className="relative aspect-4/5 sm:aspect-square md:aspect-4/5 w-full overflow-hidden rounded-xl sm:rounded-2xl"
                  style={{ border: "1px solid #1a2235", backgroundColor: "#0f1420" }}
                >
                  <Image
                    src="/og-image.webp"
                    alt="Dipu Biswas — Software Developer"
                    fill
                    priority
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                  {/* Blue gradient overlay at bottom */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                    style={{ background: "linear-gradient(to top, rgba(21,88,201,0.25), transparent)" }}
                  />
                </div>

                {/* Card Info */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-[16px] font-bold text-white">Dipu Biswas</p>
                    <p className="text-xs" style={{ color: "#64748b" }}>
                      Full-stack Developer · Next.js &amp; React
                    </p>
                  </div>

                  <div
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-medium"
                    style={{
                      border: "1px solid rgba(212,255,36,0.25)",
                      backgroundColor: "rgba(212,255,36,0.08)",
                      color: "#D4FF24",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#D4FF24" }}
                    />
                    <span>ONLINE</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
