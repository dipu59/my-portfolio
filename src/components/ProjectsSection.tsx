"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuCirclePlay,
  LuDatabase,
  LuServerCog,
} from "react-icons/lu";
import {
  SiFramer,
  SiGithub,
  SiNextdotjs,
  SiPrisma,
  SiReact,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { TbBrandSocketIo } from "react-icons/tb";

const techIcons: Record<string, IconType> = {
  "Next.js":       SiNextdotjs,
  React:           SiReact,
  TypeScript:      SiTypescript,
  "Tailwind CSS":  SiTailwindcss,
  "Node.js":       FaNodeJs,
  "Framer Motion": SiFramer,
  Prisma:          SiPrisma,
  Stripe:          SiStripe,
  PlanetScale:     LuDatabase,
  "Socket.io":     TbBrandSocketIo,
  PostgreSQL:      LuDatabase,
  Redis:           LuServerCog,
};

const projects = [
  {
    index: "01",
    name: "Resturent Feedback System",
    category: "Full-Stack SaaS",
    description:
      "A specialized feedback intelligence system for restaurants to capture real-time customer sentiment, aggregate kitchen ratings, and streamline operations with an actionable manager dashboard.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/dipu59/stay-scout",
    liveUrl: "https://stay-scout.vercel.app/",
    role: "Architecture, Dashboard UX & REST APIs",
    highlight: "Real-time analytics dashboard with sub-second data aggregation.",
    thumbnail: "/projects/restrurent.webp",
  },
  {
    index: "02",
    name: "My Pay",
    category: "E-Commerce & Fintech",
    description:
      "High-conversion digital storefront engineered for speed, top-tier SEO rankings, and effortless transactions, backed by resilient serverless workflows and Stripe payment primitives.",
    techStack: ["Next.js", "React", "Stripe", "Prisma", "PlanetScale"],
    githubUrl: "https://github.com/dipu59/MyPay",
    liveUrl: "https://my-pay-59.vercel.app/",
    role: "Frontend Engineering & Stripe Integration",
    highlight: "Sub-1s LCP metrics and streamlined one-tap checkout flow.",
    thumbnail: "/projects/mypay.png",
  },
  {
    index: "03",
    name: "Chill-Bay",
    category: "Real-Time Collaboration",
    description:
      "A developer collaboration hub featuring low-latency sync rooms, interactive kanban task boards, and syntax-highlighted code snippet exchange for distributed dev squads.",
    techStack: ["React", "Next.js", "Socket.io", "Redis", "Tailwind CSS"],
    githubUrl: "https://github.com/dipu59/Chills-Bay",
    liveUrl: "https://chills-bay-delta.vercel.app/",
    role: "Real-Time Infrastructure & State Management",
    highlight: "Resilient WebSocket sync with automated Redis fallback state.",
    thumbnail: "/projects/chillbay.png",
  },
  {
    index: "04",
    name: "Disester IO",
    category: "Motion & Design System",
    description:
      "An engineering showcase and design portfolio crafted with a motion-first architectural philosophy, custom cyber-column symmetry, and dual-palette zero-lag theme transitions.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/dipu59/Disasters-io",
    liveUrl: "https://disastersio-dipu59.vercel.app/",
    role: "Design System, Motion Choreography & Performance",
    highlight: "Hardware-accelerated animations running locked at 60 FPS.",
    thumbnail: "/projects/disesters.png",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative w-full py-20 md:py-28"
      style={{ backgroundColor: "#030407" }}
    >
      {/* ── Section Header ────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 mb-12 lg:mb-16">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8"
          style={{ borderBottom: "1px solid #1a2235" }}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#1558C9" }} />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#64748b" }}>
                02 // Selected Works
              </p>
            </div>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            >
              Crafted with{" "}
              <span style={{ color: "#D4FF24" }}>purpose.</span>
            </h2>
            <p className="max-w-xl text-sm sm:text-[16px] leading-relaxed" style={{ color: "#94a3b8" }}>
              A curated lineup of full-stack systems focusing on architectural
              integrity, measured performance, and refined interaction design.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs" style={{ color: "#64748b" }}>
            <span className="hidden sm:inline">ARCHITECTURE // PERFORMANCE</span>
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ border: "1px solid #1a2235" }}
            />
            <span>4 PROJECTS SHIPPED</span>
          </div>
        </div>
      </div>

      {/* ── Project List ──────────────────────────────────────────────────── */}
      <div
        className="mx-auto w-full max-w-5xl"
        style={{ borderLeft: "1px solid #1a2235", borderRight: "1px solid #1a2235" }}
      >
        <div style={{ borderTop: "1px solid #1a2235", borderBottom: "1px solid #1a2235" }}>
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative transform-gpu will-change-transform transition-colors duration-300"
              style={{
                borderBottom: index < projects.length - 1 ? "1px solid #1a2235" : "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(21,88,201,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <div className="px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                  {/* Left: Narrative */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Meta */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-wider" style={{ color: "#1558C9" }}>
                        {project.index}
                      </span>
                      <span className="h-3 w-px" style={{ backgroundColor: "#1a2235" }} />
                      <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#64748b" }}>
                        {project.category}
                      </span>
                      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#1a2235" }} />
                      <span className="text-[11px]" style={{ color: "#64748b" }}>
                        {project.role}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-white transition-colors duration-200"
                        style={{}}
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 group/title"
                        >
                          <span className="group-hover/title:text-[#D4FF24] transition-colors duration-200">
                            {project.name}
                          </span>
                          <LuArrowUpRight
                            className="h-5 w-5 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0"
                            style={{ color: "#D4FF24" }}
                          />
                        </a>
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: "#94a3b8" }}>
                      {project.description}
                    </p>

                    {/* Highlight Badge */}
                    <div
                      className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs"
                      style={{
                        border: "1px solid rgba(212,255,36,0.20)",
                        backgroundColor: "rgba(212,255,36,0.06)",
                        color: "#D4FF24",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#D4FF24" }}
                      />
                      <span className="font-medium text-[11px] tracking-wide">{project.highlight}</span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.techStack.map((tech) => {
                        const Icon = techIcons[tech] ?? LuArrowUpRight;
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
                            style={{
                              border: "1px solid #1a2235",
                              backgroundColor: "#0a0d14",
                              color: "#94a3b8",
                            }}
                          >
                            <Icon className="h-3.5 w-3.5" style={{ color: "#64748b" }} />
                            <span>{tech}</span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          backgroundColor: "#1558C9",
                          color: "#ffffff",
                          boxShadow: "0 0 16px rgba(21,88,201,0.35)",
                        }}
                      >
                        <span>Live demo</span>
                        <LuCirclePlay className="h-3.5 w-3.5" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          border: "1px solid #1a2235",
                          backgroundColor: "transparent",
                          color: "#94a3b8",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "#243050";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a2235";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8";
                        }}
                      >
                        <SiGithub className="h-3.5 w-3.5" />
                        <span>Source code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right: Preview */}
                  <div className="lg:col-span-5">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open live demo of ${project.name}`}
                      className="group/preview block relative overflow-hidden rounded-xl transform-gpu will-change-transform transition-all duration-300 hover:-translate-y-1.5"
                      style={{
                        border: "1px solid #1a2235",
                        backgroundColor: "#0a0d14",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(21,88,201,0.45)";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(21,88,201,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a2235";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Window chrome */}
                      <div
                        className="flex items-center justify-between px-3.5 py-2 backdrop-blur-sm"
                        style={{
                          borderBottom: "1px solid #1a2235",
                          backgroundColor: "rgba(10,13,20,0.80)",
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#1a2235" }} />
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#1a2235" }} />
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#1a2235" }} />
                        </div>
                        <span className="font-mono text-[10px] truncate max-w-[150px]" style={{ color: "#64748b" }}>
                          {project.liveUrl.replace("https://", "")}
                        </span>
                        <LuArrowUpRight
                          className="h-3 w-3 group-hover/preview:text-[#D4FF24] transition-colors"
                          style={{ color: "#64748b" }}
                        />
                      </div>

                      {/* Thumbnail */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.name} preview thumbnail`}
                          fill
                          sizes="(min-width: 1024px) 380px, 100vw"
                          className="object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-105"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100"
                          style={{ background: "linear-gradient(to top, rgba(21,88,201,0.35), transparent)" }}
                        />
                      </div>
                    </a>
                  </div>

                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Bottom annotation */}
      <div
        className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs"
        style={{ color: "#64748b" }}
      >
        <p>Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion</p>
        <Link
          href="https://github.com/dipu59"
          target="_blank"
          className="inline-flex items-center gap-1 transition-colors hover:text-white"
        >
          <span>Explore all repositories on GitHub</span>
          <LuArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
