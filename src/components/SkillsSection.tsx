"use client";

/**
 * SkillsSection — Minimal Production Dashboard Layout
 * ──────────────────────────────────────────────────────────
 * Architectural Specifications:
 * • Dark Mode Locked: Pure black base (`#000000`) with high-contrast white text.
 * • Clean Layout: Removed all proficiency level badges/labels ("Primary", "Strong", "Familiar").
 * • Focus on Application: Each technology is framed in a minimal grid cell paired with its
 *   verified production trace ("Applied in: ...").
 * • Category Neon Accents:
 *   - Frontend: Vibrant Cyan / Blue (`#06B6D4` → `#3B82F6`)
 *   - Backend: Hyper Green / Emerald (`#10B981` → `#22C55E`)
 *   - Architecture: Bright Violet / Purple (`#8B5CF6` → `#EC4899`)
 *   - Tooling: Electric Amber / Orange (`#F59E0B` → `#EF4444`)
 * • Mouse Spotlight Glow: Hardware-accelerated radial spotlight dynamically reflecting
 *   the category's neon color gradient across borders and backdrop on hover (60 FPS).
 */

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiReactquery,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiGithub,
  SiVercel,
  SiEslint,
  SiDocker,
} from "react-icons/si";
import { TbBrandSocketIo } from "react-icons/tb";
import {
  LuDatabase,
  LuShieldCheck,
  LuGauge,
  LuLayers,
  LuWorkflow,
  LuBoxes,
  LuNetwork,
  LuCircleCheck,
  LuTerminal,
} from "react-icons/lu";

interface TechItem {
  name: string;
  appliedIn: string;
  icon: IconType;
}

interface DomainBlock {
  id: string;
  title: string;
  code: string;
  summary: string;
  skills: TechItem[];
  theme: {
    gradient: string;
    dotBg: string;
    borderGlow1: string;
    borderGlow2: string;
    backdropGlow: string;
    iconHover: string;
    codeColor: string;
  };
}

const DOMAINS: DomainBlock[] = [
  {
    id: "frontend",
    title: "Frontend",
    code: "DOM-01 // CLIENT INTERFACES",
    summary: "Server-driven rendering, predictable reactive state, and 60 FPS motion fidelity.",
    theme: {
      gradient: "from-[#06B6D4] to-[#3B82F6]",
      dotBg: "bg-[#06B6D4]",
      borderGlow1: "rgba(6, 182, 212, 0.75)",
      borderGlow2: "rgba(59, 130, 246, 0.45)",
      backdropGlow: "rgba(6, 182, 212, 0.08)",
      iconHover: "group-hover/cell:text-cyan-400",
      codeColor: "text-cyan-400",
    },
    skills: [
      {
        name: "Next.js (App Router)",
        appliedIn: "My Pay, Disester IO, Stay Scout",
        icon: SiNextdotjs,
      },
      {
        name: "React 19 & Suspense",
        appliedIn: "Chill-Bay, Resturent Feedback",
        icon: SiReact,
      },
      {
        name: "TypeScript",
        appliedIn: "All Shipped Repositories",
        icon: SiTypescript,
      },
      {
        name: "Tailwind CSS",
        appliedIn: "Design Tokens, Cyber-Column System",
        icon: SiTailwindcss,
      },
      {
        name: "Framer Motion",
        appliedIn: "Disester IO, Interactive Cards",
        icon: SiFramer,
      },
      {
        name: "React Query & Zustand",
        appliedIn: "Chill-Bay State, Checkout Flows",
        icon: SiReactquery,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    code: "DOM-02 // SERVICES & RUNTIMES",
    summary: "High-throughput asynchronous runtimes, relational schemas, and WebSocket sync.",
    theme: {
      gradient: "from-[#10B981] to-[#22C55E]",
      dotBg: "bg-[#10B981]",
      borderGlow1: "rgba(16, 185, 129, 0.75)",
      borderGlow2: "rgba(34, 197, 94, 0.45)",
      backdropGlow: "rgba(16, 185, 129, 0.08)",
      iconHover: "group-hover/cell:text-emerald-400",
      codeColor: "text-emerald-400",
    },
    skills: [
      {
        name: "Node.js (Async I/O)",
        appliedIn: "Resturent Feedback, Custom APIs",
        icon: SiNodedotjs,
      },
      {
        name: "RESTful API Architecture",
        appliedIn: "Stay Scout, My Pay Checkout",
        icon: LuNetwork,
      },
      {
        name: "PostgreSQL",
        appliedIn: "Resturent Feedback System",
        icon: SiPostgresql,
      },
      {
        name: "Prisma ORM",
        appliedIn: "Relational Modeling & Migrations",
        icon: SiPrisma,
      },
      {
        name: "Socket.io",
        appliedIn: "Chill-Bay Real-Time Rooms",
        icon: TbBrandSocketIo,
      },
      {
        name: "Redis",
        appliedIn: "Transient Sessions & Rate Limits",
        icon: SiRedis,
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Reliability",
    code: "DOM-03 // SYSTEM INTEGRITY",
    summary: "Modular domain boundaries, strict input verification, and sub-second Web Vitals.",
    theme: {
      gradient: "from-[#8B5CF6] to-[#EC4899]",
      dotBg: "bg-[#8B5CF6]",
      borderGlow1: "rgba(139, 92, 246, 0.75)",
      borderGlow2: "rgba(236, 72, 153, 0.45)",
      backdropGlow: "rgba(139, 92, 246, 0.08)",
      iconHover: "group-hover/cell:text-purple-400",
      codeColor: "text-purple-400",
    },
    skills: [
      {
        name: "Modular Architecture",
        appliedIn: "Full-Stack Project Structuring",
        icon: LuLayers,
      },
      {
        name: "Auth & RBAC Guards",
        appliedIn: "Resturent Feedback, User Portals",
        icon: LuShieldCheck,
      },
      {
        name: "Relational Data Modeling",
        appliedIn: "Database Schema Normalization",
        icon: LuDatabase,
      },
      {
        name: "Validation & Error Handlers",
        appliedIn: "Zod Schemas, API Route Safeguards",
        icon: LuCircleCheck,
      },
      {
        name: "Web Performance Profiling",
        appliedIn: "Sub-1s LCP & CLS Optimization",
        icon: LuGauge,
      },
      {
        name: "State Orchestration",
        appliedIn: "Real-Time Sync Fallback States",
        icon: LuBoxes,
      },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & Workflow",
    code: "DOM-04 // DEVOPS & CADENCE",
    summary: "Deterministic build steps, automated code inspection, and atomic delivery cycles.",
    theme: {
      gradient: "from-[#F59E0B] to-[#EF4444]",
      dotBg: "bg-[#F59E0B]",
      borderGlow1: "rgba(245, 158, 11, 0.75)",
      borderGlow2: "rgba(239, 68, 68, 0.45)",
      backdropGlow: "rgba(245, 158, 11, 0.08)",
      iconHover: "group-hover/cell:text-amber-400",
      codeColor: "text-amber-400",
    },
    skills: [
      {
        name: "Git & GitHub Workflow",
        appliedIn: "Atomic PRs, Branch Hygiene",
        icon: SiGithub,
      },
      {
        name: "Vercel Platform",
        appliedIn: "Edge Deployments, Preview URLs",
        icon: SiVercel,
      },
      {
        name: "ESLint & Prettier",
        appliedIn: "Static Analysis, CI Verification",
        icon: SiEslint,
      },
      {
        name: "Docker (Containers)",
        appliedIn: "Development Environment Parity",
        icon: SiDocker,
      },
      {
        name: "CI/CD Pipelines",
        appliedIn: "Automated Build Verification",
        icon: LuWorkflow,
      },
      {
        name: "Terminal & HTTP Tooling",
        appliedIn: "CLI Automation, API Verification",
        icon: LuTerminal,
      },
    ],
  },
];

function SpotlightDashboardCard({
  domain,
  index,
}: {
  domain: DomainBlock;
  index: number;
}) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-500);
    mouseY.set(-500);
  }

  // Hardware-accelerated radial spotlight gradients for border and inner backdrop
  const borderSpotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${domain.theme.borderGlow1}, ${domain.theme.borderGlow2}, transparent 70%)`;
  const backdropSpotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, ${domain.theme.backdropGlow}, transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-xl p-px overflow-hidden bg-neutral-900/90 transform-gpu will-change-transform"
    >
      {/* ── Dynamic Category Neon Border Glow ─────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: borderSpotlight }}
      />

      {/* ── Inner Dashboard Surface ───────────────────────────────────── */}
      <div className="relative rounded-[11px] bg-[#000000] p-5 sm:p-6 h-full flex flex-col justify-between overflow-hidden border border-neutral-900/90 group-hover:border-transparent transition-colors duration-300">
        
        {/* Dynamic Category Backdrop Glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: backdropSpotlight }}
        />

        {/* Content Body */}
        <div className="relative z-10">
          
          {/* Block Header */}
          <div className="pb-4 border-b border-neutral-900/90">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${domain.theme.dotBg} shadow-xs`} />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {domain.title}
                </h3>
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-widest ${domain.theme.codeColor}`}>
                {domain.code}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {domain.summary}
            </p>
          </div>

          {/* Minimal Grid Cells (No level labels/badges) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
            {domain.skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="group/cell flex items-start gap-2.5 p-2.5 rounded-lg border border-neutral-900/90 bg-neutral-950/70 hover:border-neutral-800 hover:bg-neutral-900/40 transition-all duration-150"
                >
                  <Icon
                    className={`h-4 w-4 text-neutral-400 ${domain.theme.iconHover} transition-colors shrink-0 mt-0.5`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate">
                      {skill.name}
                    </p>
                    <p className="font-mono text-[10px] sm:text-[11px] text-neutral-500 truncate mt-0.5">
                      Applied in: {skill.appliedIn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Block Footer Indicator */}
        <div className="relative z-10 pt-4 mt-4 border-t border-neutral-900/90 flex items-center justify-between font-mono text-[10px] text-neutral-500">
          <span>STATUS // VERIFIED IN PROD</span>
          <span className={domain.theme.codeColor}>6 TECHNOLOGIES</span>
        </div>

      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative w-full bg-[#000000] text-white py-20 md:py-28 border-t border-neutral-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">
        
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-900 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                04 // Technical Arsenal
              </p>
            </div>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            >
              Engineered for scale &amp; reliability.
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-neutral-400 leading-relaxed">
              Production capabilities evaluated through delivered projects—emphasizing
              clean architecture, end-to-end type safety, and real-world system constraints.
            </p>
          </div>

          {/* Recruiter / Engineer Verification Badge */}
          <div className="flex items-center gap-4 font-mono text-xs border border-neutral-800 bg-neutral-950 px-4 py-2.5 rounded-lg text-neutral-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-medium">4 DOMAINS</span>
            </div>
            <span className="h-3 w-px bg-neutral-800" />
            <span>24 TECHNOLOGIES</span>
          </div>
        </div>

        {/* ── 4-Domain Dashboard Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {DOMAINS.map((domain, index) => (
            <SpotlightDashboardCard
              key={domain.id}
              domain={domain}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
