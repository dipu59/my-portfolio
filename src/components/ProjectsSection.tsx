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
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": FaNodeJs,
  "Framer Motion": SiFramer,
  Prisma: SiPrisma,
  Stripe: SiStripe,
  PlanetScale: LuDatabase,
  "Socket.io": TbBrandSocketIo,
  PostgreSQL: LuDatabase,
  Redis: LuServerCog,
};

const projects = [
  {
    index: "01",
    name: "Resturent Feedback System",
    category: "Full-Stack SaaS",
    description:
      "A specialized feedback intelligence system for restaurants to capture real-time customer sentiment, aggregate kitchen ratings, and streamline operations with an actionable manager dashboard.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
    ],
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
    >
      {/* ── Section Header (Within Central Bounds) ────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 mb-12 lg:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                02 // Selected Works
              </p>
            </div>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
            >
              Crafted with purpose.
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A curated lineup of full-stack systems focusing on architectural
              integrity, measured performance, and refined interaction design.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-neutral-500 dark:text-neutral-500">
            <span className="hidden sm:inline">ARCHITECTURE // PERFORMANCE</span>
            <span className="inline-block h-2 w-2 rounded-full border border-neutral-300 dark:border-neutral-700" />
            <span>4 PROJECTS SHIPPED</span>
          </div>
        </div>
      </div>

      {/* ── Structured Symmetric List Container ─────────────────────────── */}
      {/*
       * Mobile: Full width 1-column list with horizontal dividers.
       * Large screens (lg): Strict vertical bounded lines (lg:border-l lg:border-r)
       * that anchor seamlessly to the site's Cyber-Column aesthetic.
       */}
      <div className="mx-auto w-full max-w-5xl lg:border-l lg:border-r border-neutral-200 dark:border-neutral-800">
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800/90 border-t border-b border-neutral-200 dark:border-neutral-800/90">
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
              className="group relative transform-gpu will-change-transform bg-transparent transition-colors duration-300 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/30"
            >
              <div className="px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* Left Column: Project Narrative & Meta (7 cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Top Meta Header */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-wider text-violet-600 dark:text-violet-400">
                        {project.index}
                      </span>
                      <span className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                        {project.category}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-500">
                        {project.role}
                      </span>
                    </div>

                    {/* Project Title */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <span>{project.name}</span>
                          <LuArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-violet-600 dark:text-violet-400" />
                        </a>
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {project.description}
                    </p>

                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                      <span className="font-medium text-[11px] tracking-wide">
                        {project.highlight}
                      </span>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.techStack.map((tech) => {
                        const Icon = techIcons[tech] ?? LuArrowUpRight;
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2.5 py-1 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs"
                          >
                            <Icon className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
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
                        className="transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full bg-neutral-950 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-neutral-950 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                      >
                        <span>Live demo</span>
                        <LuCirclePlay className="h-3.5 w-3.5" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                      >
                        <SiGithub className="h-3.5 w-3.5" />
                        <span>Source code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Hardware-Accelerated Interactive Visual (5 cols) */}
                  <div className="lg:col-span-5">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open live demo of ${project.name}`}
                      className="group/preview block relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-950 shadow-md transform-gpu will-change-transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)]"
                    >
                      {/* Window Mockup Chrome */}
                      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 px-3.5 py-2 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 truncate max-w-[150px]">
                          {project.liveUrl.replace("https://", "")}
                        </span>
                        <LuArrowUpRight className="h-3 w-3 text-neutral-400 group-hover/preview:text-violet-500 transition-colors" />
                      </div>

                      {/* Image Thumbnail Container */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.name} preview thumbnail`}
                          fill
                          sizes="(min-width: 1024px) 380px, 100vw"
                          className="object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-105"
                        />
                        {/* Subtle theme overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100" />
                      </div>
                    </a>
                  </div>

                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ── Bottom Section Annotation ──────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-500">
        <p>Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion</p>
        <Link
          href="https://github.com/dipu59"
          target="_blank"
          className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
        >
          <span>Explore all repositories on GitHub</span>
          <LuArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
