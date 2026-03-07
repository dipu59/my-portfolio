"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Centralized projects data so it’s easy to update or extend later
const projects = [
  {
    name: "Resturent Feedback System",
    description:
      "A feedback system for resturents to collect feedback from their customers.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/dipu59/stay-scout",
    liveUrl: "https://stay-scout.vercel.app/",
    role: "Full‑stack development, dashboard UX, API design",
    highlight:
      "Reduced decision-making time for teams by surfacing the right metrics with clear visual hierarchy.",
    thumbnail: "/projects/restrurent.webp",
  },
  {
    name: "My Pay",
    description:
      "High-performance e‑commerce storefront focused on speed, SEO, and conversion, with optimized checkout flows.",
    techStack: ["Next.js", "React", "Stripe", "Prisma", "PlanetScale"],
    githubUrl: "https://github.com/dipu59/MyPay",
    liveUrl: "https://my-pay-59.vercel.app/",
    role: "Frontend architecture, performance optimization, payment integration",
    highlight:
      "Achieved sub‑1s LCP on key pages and improved checkout completion by optimizing micro‑interactions.",
    thumbnail: "/projects/mypay.png",
  },
  {
    name: "Chill-Bay",
    description:
      "Collaboration hub for developers with real-time rooms, task boards, and integrated code snippet sharing.",
    techStack: ["React", "Next.js", "Socket.io", "Redis", "Tailwind CSS"],
    githubUrl: "https://github.com/dipu59/Chills-Bay",
    liveUrl: "https://chills-bay-delta.vercel.app/",
    role: "Real‑time features, state management, backend APIs",
    highlight:
      "Built low‑latency collaboration features with resilient real‑time sync and graceful fallback states.",
    thumbnail: "/projects/chillbay.png",
  },
  {
    name: "Disester IO",
    description:
      "This very portfolio — a motion‑first, dark UI experience to showcase selected work and engineering standards.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/dipu59/Disasters-io",
    liveUrl: "https://disastersio-dipu59.vercel.app/",
    role: "Design, implementation, animations, accessibility",
    highlight:
      "Crafted a balanced mix of motion and clarity while keeping the experience lightweight and performant.",
    thumbnail: "/projects/disesters.png",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative mx-auto mt-12 md:mt-32 w-full max-w-5xl px-4 pb-24 sm:px-6 md:px-0"
    >
      {/* Section header */}
      <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/80">
            Selected work
          </p>
          <h2
            id="projects-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
          >
            Projects I&apos;m proud of
          </h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            A curated set of projects where I focused on real-world performance,
            clean architecture, and thoughtful interfaces.
          </p>
        </div>

        <p className="max-w-xs text-[11px] text-zinc-500">
          Each project is built with production-ready patterns, clear separation
          of concerns, and attention to DX so features stay maintainable as they
          grow.
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.8,
              delay: 0.05 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-linear-to-br from-sky-500/10 via-zinc-950/80 to-transparent shadow-[0_18px_45px_rgba(0,0,0,0.85)] backdrop-blur-xl   transition-all duration-300 hover:border-sky-500/40 hover:from-sky-500/20 hover:via-zinc-950/90 hover:to-transparent">
              {/* Subtle hover border edge */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-sky-500/20 transition-all duration-300" />

              {/* Thumbnail banner */}
              <div className="relative z-10 h-52 w-full overflow-hidden rounded-t-[17px] border-b border-zinc-800/70 bg-zinc-900/80">
                <div className="absolute inset-0">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.name} thumbnail`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                {/* Dark overlay that strengthens on hover */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent opacity-90 group-hover:from-black/85 group-hover:via-black/20 group-hover:to-transparent transition-opacity duration-500" />
              </div>

              <div className="relative z-10 space-y-3 p-4 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-50">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                      {project.role}
                    </p>
                  </div>

                  {/* Small tag to emphasize live nature */}
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    Case study
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                {/* Tech stack chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Extra highlight for quick scanning */}
                {/* <p className="mt-2 text-[11px] text-zinc-500">
    {project.highlight}
  </p> */}
              </div>

              {/* Links row */}
              <div className="relative z-10 mt-2 flex items-center justify-between gap-3 px-4 pb-4 text-[11px]">
                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-zinc-800/80 bg-zinc-900/70 px-3 py-1 text-[11px] font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
                  >
                    <span>GitHub</span>
                    <span className="text-[10px] text-zinc-400">↗</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-zinc-50 px-3 py-1 text-[11px] font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                  >
                    <span>Live demo</span>
                    <span className="text-[10px]">●</span>
                  </a>
                </div>

                <span className="hidden text-[10px] text-zinc-500 sm:inline">
                  Built with a focus on DX & performance
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
