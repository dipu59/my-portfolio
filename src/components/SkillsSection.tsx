"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaCircleCheck,
  FaCubes,
  FaDatabase,
  FaGaugeHigh,
  FaPlug,
  FaShieldHalved,
} from "react-icons/fa6";
import { LuBox, LuBoxes, LuCloudCog } from "react-icons/lu";
import {
  SiDocker,
  SiEslint,
  SiExpress,
  SiFramer,
  SiGithub,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiStorybook,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type SkillLevel = "primary" | "strong" | "working";

type Skill = {
  name: string;
  level: SkillLevel;
  icon: IconType;
  tooltip: string;
};

type SkillGroup = {
  label: string;
  icon: string;
  focusLabel: "Primary stack" | "Strong area" | "Supporting";
  tagline: string;
  appliedIn: string;
  primarySkills: Skill[];
  supportingSkills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "Frontend engineering",
    icon: "interface",
    focusLabel: "Primary stack",
    tagline:
      "Shipping fast, accessible interfaces with predictable state and smooth motion.",
    appliedIn: "My Pay, Chill‑Bay, Disester IO",
    primarySkills: [
      {
        name: "Next.js",
        level: "primary",
        icon: SiNextdotjs,
        tooltip: "SSR/SSG, routing, API routes, image optimization, metadata.",
      },
      {
        name: "React",
        level: "primary",
        icon: SiReact,
        tooltip:
          "Component architecture, hooks, context, performance profiling and memoization.",
      },
      {
        name: "TypeScript",
        level: "primary",
        icon: SiTypescript,
        tooltip:
          "Typed props/hooks, API types, safer refactors and DX improvements.",
      },
      {
        name: "Tailwind CSS",
        level: "strong",
        icon: SiTailwindcss,
        tooltip:
          "Responsive layouts, dark themes, design systems and tokenized spacing.",
      },
    ],
    supportingSkills: [
      {
        name: "Framer Motion",
        level: "strong",
        icon: SiFramer,
        tooltip:
          "Micro‑interactions, entrance animations, scroll‑based motion and layout transitions.",
      },
      {
        name: "React Query",
        level: "working",
        icon: SiReactquery,
        tooltip:
          "Server state management, caching, background refetch and loading states.",
      },
      {
        name: "Zustand",
        level: "working",
        icon: LuBoxes,
        tooltip: "Lightweight global state for UI and feature flags.",
      },
    ],
  },
  {
    label: "Backend & APIs",
    icon: "server",
    focusLabel: "Primary stack",
    tagline:
      "Designing clear APIs with validation, auth and database‑backed workflows.",
    appliedIn: "Restaurant Feedback, My Pay",
    primarySkills: [
      {
        name: "Node.js",
        level: "primary",
        icon: SiNodedotjs,
        tooltip:
          "REST APIs, async flows, background tasks and integration with external services.",
      },
      {
        name: "RESTful API design",
        level: "primary",
        icon: FaPlug,
        tooltip:
          "Resource design, pagination, filtering, error handling and version‑friendly endpoints.",
      },
      {
        name: "PostgreSQL",
        level: "strong",
        icon: SiPostgresql,
        tooltip:
          "Relational modeling, indexing for reads, basic query optimization.",
      },
      {
        name: "Prisma",
        level: "strong",
        icon: SiPrisma,
        tooltip:
          "Schema modeling, migrations, type‑safe queries and relation handling.",
      },
    ],
    supportingSkills: [
      {
        name: "Express.js",
        level: "working",
        icon: SiExpress,
        tooltip:
          "Routing, middleware, request validation and error handling patterns.",
      },
      {
        name: "Next.js API Routes",
        level: "working",
        icon: SiNextdotjs,
        tooltip:
          "Co‑locating backend logic with UI, auth checks and simple webhooks.",
      },
      {
        name: "MongoDB",
        level: "working",
        icon: SiMongodb,
        tooltip:
          "Document modeling and basic aggregations for content‑style data.",
      },
    ],
  },
  {
    label: "Architecture & reliability",
    icon: "architecture",
    focusLabel: "Strong area",
    tagline:
      "Keeping features understandable as they grow, based on real project constraints.",
    appliedIn: "Restaurant Feedback, Chill‑Bay",
    primarySkills: [
      {
        name: "Authentication & authorization",
        level: "strong",
        icon: FaShieldHalved,
        tooltip:
          "Session‑based auth, protected routes, role checks and guard components.",
      },
      {
        name: "Database‑backed workflows",
        level: "strong",
        icon: FaDatabase,
        tooltip:
          "Designing tables and relations around real user flows and constraints.",
      },
      {
        name: "Validation & error handling",
        level: "strong",
        icon: FaCircleCheck,
        tooltip:
          "Input validation, safe fallbacks, user‑facing errors and logging points.",
      },
    ],
    supportingSkills: [
      {
        name: "Caching strategies",
        level: "working",
        icon: LuBox,
        tooltip:
          "Client‑side caching, incremental revalidation and avoiding duplicate work.",
      },
      {
        name: "Performance profiling",
        level: "working",
        icon: FaGaugeHigh,
        tooltip:
          "Measuring LCP/FID, spotting slow components and tightening network usage.",
      },
      {
        name: "Modular feature design",
        level: "working",
        icon: FaCubes,
        tooltip:
          "Separating UI, domain logic and data access for safer changes.",
      },
    ],
  },
  {
    label: "Tooling & workflow",
    icon: "tooling",
    focusLabel: "Supporting",
    tagline:
      "Short feedback loops and deploys that are boring on purpose (in a good way).",
    appliedIn: "Most personal & freelance projects",
    primarySkills: [
      {
        name: "Git & GitHub",
        level: "strong",
        icon: SiGithub,
        tooltip:
          "Branching, code reviews, PR hygiene and conflict‑safe workflows.",
      },
      {
        name: "Vercel",
        level: "strong",
        icon: SiVercel,
        tooltip:
          "Preview environments, environment variables and rollouts for Next.js apps.",
      },
      {
        name: "ESLint & Prettier",
        level: "strong",
        icon: SiEslint,
        tooltip:
          "Consistent style, catching bugs early and keeping diffs readable.",
      },
    ],
    supportingSkills: [
      {
        name: "CI/CD pipelines",
        level: "working",
        icon: LuCloudCog,
        tooltip:
          "Automated builds, basic checks and deploys on merge to main branches.",
      },
      {
        name: "Docker (basics)",
        level: "working",
        icon: SiDocker,
        tooltip:
          "Containerizing dev environments and simple services for local parity.",
      },
      {
        name: "Storybook",
        level: "working",
        icon: SiStorybook,
        tooltip:
          "Documenting reusable components and visual regression‑friendly UIs.",
      },
    ],
  },
];

const chipVariants = {
  initial: { opacity: 0, y: 10, scale: 0.96 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.04 * index,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const levelLabelClasses: Record<SkillLevel, string> = {
  primary:
    "bg-emerald-500/15 text-emerald-300 border-emerald-400/40 group-hover:bg-emerald-400/20",
  strong:
    "bg-sky-500/10 text-sky-300 border-sky-400/40 group-hover:bg-sky-500/15",
  working:
    "bg-zinc-900 text-zinc-300 border-zinc-700 group-hover:bg-zinc-800/90",
};

const levelText: Record<SkillLevel, string> = {
  primary: "Primary",
  strong: "Strong",
  working: "Familiar",
};

const skillIconClasses: Record<SkillLevel, string> = {
  primary: "text-emerald-300",
  strong: "text-sky-300",
  working: "text-zinc-300",
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative mx-auto mt-16 w-full max-w-5xl px-4 pb-24 sm:px-6 md:mt-28 md:px-0"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.16),transparent_60%)]" />

      {/* Header + quick metrics */}
      <div className="mb-6 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/80">
            Skill set
          </p>
          <h2
            id="skills-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
          >
            Full‑stack, production‑oriented.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Primary focus on React/Next.js + TypeScript with real database,
            auth, validation and performance work applied in shipped projects.
          </p>

          {/* Highlighted core stack */}
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            {[
              { label: "Next.js", metric: "4+ projects", emphasis: true },
              { label: "React", metric: "4+ projects", emphasis: true },
              { label: "TypeScript", metric: "3+ projects", emphasis: true },
            ].map((core) => (
              <div
                key={core.label}
                className="group inline-flex items-center gap-1.5 rounded-full border border-sky-500/40 bg-linear-to-r from-sky-500/25 via-cyan-400/20 to-transparent px-3 py-1 text-[11px] text-sky-50 shadow-[0_0_24px_rgba(56,189,248,0.45)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                <span className="font-medium">{core.label}</span>
                <span className="text-[10px] text-sky-100/80">
                  {core.metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick metrics row for recruiters */}
        <div className="space-y-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-3 text-[11px] text-zinc-300 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Overview
            </span>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-100">
                4+ shipped projects
              </span>
              <span className="text-[10px] text-zinc-500">
                Next.js, Node.js, PostgreSQL, Prisma.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-100">
                Full‑stack focus
              </span>
              <span className="text-[10px] text-zinc-500">
                Auth, DB design, validation, performance and DX.
              </span>
            </div>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-1 text-[10px] font-medium text-sky-300 hover:text-sky-200"
          >
            <span>View applied skills in projects</span>
            <span className="text-[9px]">↗</span>
          </a>
        </div>
      </div>

      {/* Skill groups */}
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, groupIndex) => (
          <motion.article
            key={group.label}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.7,
              delay: 0.06 * groupIndex,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-linear-to-br from-sky-500/10 via-zinc-950/90 to-transparent shadow-[0_18px_45px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {/* Animated edge highlight */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-2xl border border-sky-500/0"
              whileHover={{ borderColor: "rgba(56,189,248,0.45)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            <div className="relative z-10 p-4 pb-4 sm:p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70 px-2.5 py-1 text-[10px] text-zinc-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                    <span className="uppercase tracking-[0.18em] text-zinc-500">
                      {group.icon}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
                    {group.label}
                  </h3>
                  <p className="text-[11px] text-zinc-400">{group.tagline}</p>
                </div>

                {/* Focus indicator with explicit level */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    Level
                  </span>
                  <div className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-100">
                    {group.focusLabel}
                  </div>
                  <div className="mt-1 text-[10px] text-zinc-500">
                    Applied in real projects
                  </div>
                </div>
              </div>

              {/* Primary vs supporting split with micro‑interactions */}
              <div className="mt-2 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500">
                    <span>Primary stack</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                      Applied in: {group.appliedIn}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.primarySkills.map((skill, index) => (
                      <motion.button
                        type="button"
                        key={skill.name}
                        custom={index}
                        variants={chipVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.6 }}
                        title={skill.tooltip}
                        className="group/button relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-zinc-800/80 bg-zinc-950/90 px-3 py-1 text-[11px] text-zinc-100 outline-none transition-all duration-200 hover:border-sky-500/70 hover:bg-sky-500/10"
                      >
                        <skill.icon
                          aria-hidden="true"
                          className={`relative z-10 h-3.5 w-3.5 shrink-0 ${skillIconClasses[skill.level]}`}
                        />
                        <span className="relative z-10">{skill.name}</span>
                        <span
                          className={`relative z-10 inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] ${levelLabelClasses[skill.level]}`}
                        >
                          <span>{levelText[skill.level]}</span>
                        </span>
                        {/* Subtle hover ring */}
                        <span className="pointer-events-none absolute inset-0 rounded-full border border-sky-500/0 transition-colors duration-200 group-hover/button:border-sky-500/30" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500">
                    <span>Supporting tools</span>
                    <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-400">
                      Complements primary stack
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.supportingSkills.map((skill, index) => (
                      <motion.button
                        type="button"
                        key={skill.name}
                        custom={index + group.primarySkills.length}
                        variants={chipVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.6 }}
                        title={skill.tooltip}
                        className="group/button relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-zinc-800/80 bg-zinc-950/80 px-3 py-1 text-[11px] text-zinc-200 outline-none transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900"
                      >
                        <skill.icon
                          aria-hidden="true"
                          className={`relative z-10 h-3.5 w-3.5 shrink-0 ${skillIconClasses[skill.level]}`}
                        />
                        <span className="relative z-10">{skill.name}</span>
                        <span
                          className={`relative z-10 inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] ${levelLabelClasses[skill.level]}`}
                        >
                          <span>{levelText[skill.level]}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-0 rounded-full border border-zinc-500/0 transition-colors duration-200 group-hover/button:border-zinc-500/30" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related projects / credibility */}
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-zinc-800/70 pt-2 text-[10px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  <span>Applied in: {group.appliedIn}</span>
                </div>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-900/70 px-2 py-0.5 text-[10px] font-medium text-sky-300 hover:border-sky-500/60 hover:bg-zinc-900"
                >
                  <span>See related projects</span>
                  <span className="text-[9px]">↗</span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
