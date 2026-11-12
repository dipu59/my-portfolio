"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFramer,
  SiReactquery, SiNodedotjs, SiPostgresql, SiPrisma, SiRedis,
  SiGithub, SiVercel, SiEslint, SiDocker,
} from "react-icons/si";
import { TbBrandSocketIo } from "react-icons/tb";
import {
  LuDatabase, LuShieldCheck, LuGauge, LuLayers,
  LuWorkflow, LuBoxes, LuNetwork, LuCircleCheck, LuTerminal,
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
    accent: string;
    accentDim: string;
    borderGlow: string;
    backdropGlow: string;
  };
}

const DOMAINS: DomainBlock[] = [
  {
    id: "frontend",
    title: "Frontend",
    code: "DOM-01 // CLIENT INTERFACES",
    summary: "Server-driven rendering, predictable reactive state, and 60 FPS motion fidelity.",
    theme: {
      accent: "#1558C9",
      accentDim: "rgba(21, 88, 201, 0.12)",
      borderGlow: "rgba(21, 88, 201, 0.70)",
      backdropGlow: "rgba(21, 88, 201, 0.07)",
    },
    skills: [
      { name: "Next.js (App Router)",   appliedIn: "My Pay, Disester IO, Stay Scout",        icon: SiNextdotjs  },
      { name: "React 19 & Suspense",    appliedIn: "Chill-Bay, Resturent Feedback",           icon: SiReact      },
      { name: "TypeScript",             appliedIn: "All Shipped Repositories",                icon: SiTypescript },
      { name: "Tailwind CSS",           appliedIn: "Design Tokens, Cyber-Column System",      icon: SiTailwindcss},
      { name: "Framer Motion",          appliedIn: "Disester IO, Interactive Cards",          icon: SiFramer     },
      { name: "React Query & Zustand",  appliedIn: "Chill-Bay State, Checkout Flows",         icon: SiReactquery },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    code: "DOM-02 // SERVICES & RUNTIMES",
    summary: "High-throughput asynchronous runtimes, relational schemas, and WebSocket sync.",
    theme: {
      accent: "#D4FF24",
      accentDim: "rgba(212, 255, 36, 0.10)",
      borderGlow: "rgba(212, 255, 36, 0.60)",
      backdropGlow: "rgba(212, 255, 36, 0.05)",
    },
    skills: [
      { name: "Node.js (Async I/O)",       appliedIn: "Resturent Feedback, Custom APIs",   icon: SiNodedotjs      },
      { name: "RESTful API Architecture",  appliedIn: "Stay Scout, My Pay Checkout",        icon: LuNetwork        },
      { name: "PostgreSQL",                appliedIn: "Resturent Feedback System",           icon: SiPostgresql     },
      { name: "Prisma ORM",               appliedIn: "Relational Modeling & Migrations",    icon: SiPrisma         },
      { name: "Socket.io",                appliedIn: "Chill-Bay Real-Time Rooms",           icon: TbBrandSocketIo  },
      { name: "Redis",                    appliedIn: "Transient Sessions & Rate Limits",    icon: SiRedis          },
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Reliability",
    code: "DOM-03 // SYSTEM INTEGRITY",
    summary: "Modular domain boundaries, strict input verification, and sub-second Web Vitals.",
    theme: {
      accent: "#1558C9",
      accentDim: "rgba(21, 88, 201, 0.12)",
      borderGlow: "rgba(21, 88, 201, 0.65)",
      backdropGlow: "rgba(21, 88, 201, 0.06)",
    },
    skills: [
      { name: "Modular Architecture",        appliedIn: "Full-Stack Project Structuring",        icon: LuLayers      },
      { name: "Auth & RBAC Guards",          appliedIn: "Resturent Feedback, User Portals",       icon: LuShieldCheck },
      { name: "Relational Data Modeling",    appliedIn: "Database Schema Normalization",          icon: LuDatabase    },
      { name: "Validation & Error Handlers", appliedIn: "Zod Schemas, API Route Safeguards",      icon: LuCircleCheck },
      { name: "Web Performance Profiling",   appliedIn: "Sub-1s LCP & CLS Optimization",          icon: LuGauge       },
      { name: "State Orchestration",         appliedIn: "Real-Time Sync Fallback States",         icon: LuBoxes       },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & Workflow",
    code: "DOM-04 // DEVOPS & CADENCE",
    summary: "Deterministic build steps, automated code inspection, and atomic delivery cycles.",
    theme: {
      accent: "#D4FF24",
      accentDim: "rgba(212, 255, 36, 0.10)",
      borderGlow: "rgba(212, 255, 36, 0.55)",
      backdropGlow: "rgba(212, 255, 36, 0.05)",
    },
    skills: [
      { name: "Git & GitHub Workflow",     appliedIn: "Atomic PRs, Branch Hygiene",             icon: SiGithub  },
      { name: "Vercel Platform",           appliedIn: "Edge Deployments, Preview URLs",          icon: SiVercel  },
      { name: "ESLint & Prettier",         appliedIn: "Static Analysis, CI Verification",        icon: SiEslint  },
      { name: "Docker (Containers)",       appliedIn: "Development Environment Parity",          icon: SiDocker  },
      { name: "CI/CD Pipelines",          appliedIn: "Automated Build Verification",             icon: LuWorkflow},
      { name: "Terminal & HTTP Tooling",  appliedIn: "CLI Automation, API Verification",         icon: LuTerminal},
    ],
  },
];

function SpotlightDashboardCard({ domain, index }: { domain: DomainBlock; index: number }) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-500);
    mouseY.set(-500);
  }

  const borderSpotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${domain.theme.borderGlow}, transparent 70%)`;
  const backdropSpotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, ${domain.theme.backdropGlow}, transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-xl p-px overflow-hidden transform-gpu will-change-transform"
      style={{ backgroundColor: "#0a0d14" }}
    >
      {/* Neon border glow on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: borderSpotlight }}
      />

      {/* Inner surface */}
      <div
        className="relative rounded-[11px] p-5 sm:p-6 h-full flex flex-col justify-between overflow-hidden"
        style={{ backgroundColor: "#030407", border: "1px solid #1a2235" }}
      >
        {/* Backdrop glow on hover */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: backdropSpotlight }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="pb-4" style={{ borderBottom: "1px solid #1a2235" }}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: domain.theme.accent }}
                />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {domain.title}
                </h3>
              </div>
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: domain.theme.accent }}
              >
                {domain.code}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
              {domain.summary}
            </p>
          </div>

          {/* Tech grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
            {domain.skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="group/cell flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-150"
                  style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = domain.theme.accentDim.replace("0.12", "0.35");
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = domain.theme.accentDim;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#1a2235";
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "#0a0d14";
                  }}
                >
                  <Icon
                    className="h-4 w-4 shrink-0 mt-0.5 transition-colors"
                    style={{ color: "#64748b" }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate">
                      {skill.name}
                    </p>
                    <p className="font-mono text-[10px] sm:text-[11px] truncate mt-0.5" style={{ color: "#64748b" }}>
                      Applied in: {skill.appliedIn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className="relative z-10 pt-4 mt-4 flex items-center justify-between font-mono text-[10px]"
          style={{ borderTop: "1px solid #1a2235", color: "#64748b" }}
        >
          <span>STATUS // VERIFIED IN PROD</span>
          <span style={{ color: domain.theme.accent }}>6 TECHNOLOGIES</span>
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
      className="relative w-full text-white py-20 md:py-28"
      style={{ backgroundColor: "#030407", borderTop: "1px solid #1a2235" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-10"
          style={{ borderBottom: "1px solid #1a2235" }}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#D4FF24" }} />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#64748b" }}>
                04 // Technical Arsenal
              </p>
            </div>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            >
              Engineered for{" "}
              <span style={{ color: "#1558C9" }}>scale</span> &amp;{" "}
              <span style={{ color: "#D4FF24" }}>reliability.</span>
            </h2>
            <p className="max-w-xl text-sm sm:text-[16px] leading-relaxed" style={{ color: "#94a3b8" }}>
              Production capabilities evaluated through delivered projects—emphasizing
              clean architecture, end-to-end type safety, and real-world system constraints.
            </p>
          </div>

          {/* Badge */}
          <div
            className="flex items-center gap-4 font-mono text-xs px-4 py-2.5 rounded-lg shrink-0"
            style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14", color: "#64748b" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#D4FF24" }}
              />
              <span className="text-white font-medium">4 DOMAINS</span>
            </div>
            <span className="h-3 w-px" style={{ backgroundColor: "#1a2235" }} />
            <span>24 TECHNOLOGIES</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {DOMAINS.map((domain, index) => (
            <SpotlightDashboardCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
