"use client";

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
      className="relative w-full text-white py-20 md:py-28"
      style={{ backgroundColor: "#030407", borderTop: "1px solid #1a2235" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#1558C9" }} />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#64748b" }}>
              03 // Overview
            </p>
          </div>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Engineering scalable web systems{" "}
            <span style={{ color: "#1558C9" }}>with deliberate design.</span>
          </h2>
        </div>

        {/* ── 2-Column Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Primary statement */}
            <div
              className="pl-6 space-y-4"
              style={{ borderLeft: "2px solid #1558C9" }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-white">
                I am a full-stack engineer dedicated to building high-performance,
                production-grade web applications where code clarity and user experience
                reinforce each other.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                Rather than treating frontend and backend as detached silos, I bridge the full
                lifecycle: from architecting type-safe data schemas and resilient REST/real-time
                services to choreographing 60&nbsp;FPS compositor-driven user interfaces.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                {
                  code: "// Frontend Precision",
                  title: "React 19 & Next.js App Router",
                  desc: "Mastery of SSR, Server Components, client-side caching, fluid layout motion, and strict Lighthouse performance metrics (sub-second LCP).",
                },
                {
                  code: "// Backend & Data",
                  title: "Node.js & PostgreSQL",
                  desc: "RESTful API modeling, Prisma ORM workflows, relational query optimization, session security, and low-latency WebSocket collaboration rooms.",
                },
                {
                  code: "// Architecture",
                  title: "Clean Modular Structure",
                  desc: "Separation of concerns across UI, business logic, and database access layers—keeping codebases refactor-friendly as features expand.",
                },
                {
                  code: "// Type Safety",
                  title: "TypeScript Everywhere",
                  desc: "Strict typing from database entities to API contracts and React component props, eliminating whole categories of runtime errors.",
                },
              ].map(({ code, title, desc }) => (
                <div
                  key={title}
                  className="space-y-2 pt-4"
                  style={{ borderTop: "1px solid #1a2235" }}
                >
                  <h3 className="font-mono text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>
                    {code}
                  </h3>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Read more link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="transform-gpu will-change-transform inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200 group"
                style={{ color: "#D4FF24" }}
              >
                <span className="underline underline-offset-4" style={{ textDecorationColor: "rgba(212,255,36,0.4)" }}>
                  Read full professional journey &amp; background
                </span>
                <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col w-full"
          >
            {/* Profile image */}
            <div
              className="group relative w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 overflow-hidden rounded-xl mb-6 transform-gpu will-change-transform"
              style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
            >
              <Image
                src="/dipubiswas.jpg"
                alt="Portrait of Dipu Biswas — Full-Stack Developer"
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                priority
                className="object-cover object-center  contrast-115 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
              />
              {/* grayscale */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                style={{ background: "linear-gradient(to top, rgba(21,88,201,0.35), transparent)" }}
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-white drop-shadow-sm">Dipu Biswas</span>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded backdrop-blur-xs"
                  style={{
                    color: "#D4FF24",
                    backgroundColor: "rgba(3,4,7,0.80)",
                    border: "1px solid rgba(212,255,36,0.25)",
                  }}
                >
                  DEV // FULL-STACK
                </span>
              </div>
            </div>

            {/* Metadata stack */}
            <div
              className="flex flex-col divide-y divide-[#1a2235]"
              style={{ borderTop: "1px solid #1a2235", borderBottom: "1px solid #1a2235" }}
            >
              {/* Location */}
              <div className="py-3.5 space-y-1" style={{ borderBottom: "1px solid #1a2235" }}>
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#64748b" }}>Location</p>
                <p className="text-sm font-medium text-white">Balagarh, West Bengal, India</p>
                <p className="text-xs" style={{ color: "#64748b" }}>Standard Time (UTC +05:30)</p>
              </div>

              {/* Availability */}
              <div className="py-3.5 space-y-1" style={{ borderBottom: "1px solid #1a2235" }}>
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#64748b" }}>Availability</p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#D4FF24" }} />
                  <p className="text-sm font-medium text-white">Open for opportunities</p>
                </div>
                <p className="text-xs" style={{ color: "#64748b" }}>Full-time remote roles &amp; high-impact contracts</p>
              </div>

              {/* Core Stack */}
              <div className="py-3.5 space-y-2" style={{ borderBottom: "1px solid #1a2235" }}>
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#64748b" }}>Core Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma", "Docker"].map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] px-2 py-0.5 rounded"
                      style={{ color: "#94a3b8", backgroundColor: "#0f1420", border: "1px solid #1a2235" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub */}
              <div className="py-3.5 space-y-2" style={{ borderBottom: "1px solid #1a2235" }}>
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#64748b" }}>Version Control &amp; Code</p>
                <a
                  href="https://github.com/dipu59"
                  target="_blank"
                  rel="noreferrer"
                  className="transform-gpu will-change-transform group flex items-center justify-between p-3 rounded-lg transition-all duration-200"
                  style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1558C9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a2235";
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <SiGithub className="h-4 w-4" style={{ color: "#64748b" }} />
                    <span className="font-mono text-xs text-white">github.com/dipu59</span>
                  </div>
                  <LuArrowUpRight className="h-4 w-4" style={{ color: "#64748b" }} />
                </a>
              </div>

              {/* Email */}
              <div className="py-3.5 space-y-1">
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#64748b" }}>Direct Communication</p>
                <a
                  href="mailto:12biswasdipu@gmail.com"
                  className="font-mono text-xs underline underline-offset-4 transition-colors"
                  style={{ color: "#D4FF24", textDecorationColor: "rgba(212,255,36,0.35)" }}
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
