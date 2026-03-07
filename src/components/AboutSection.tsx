"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative mx-auto mt-20 w-full max-w-5xl px-4 pb-10 sm:px-6 md:mt-28 md:px-0"
      aria-labelledby="about-heading"
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-400/80">
              About
            </p>
            <h2
              id="about-heading"
              className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
            >
              Developer focused on real results
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
            I&apos;m{" "}
            <span className="font-semibold text-zinc-50">Dipu Biswas</span>, a
            developer from Balagarh, Hooghly, West Bengal, India, focused on
            building fast, reliable web experiences with{" "}
            <span className="font-medium text-sky-400">
              Next.js, React, TypeScript, and Node.js
            </span>
            . I care about clean architecture, performance, and small UI details
            that make products feel premium.
          </p>

          <p className="text-sm leading-relaxed text-zinc-400">
            Most of my work lives in full‑stack projects where I handle both
            frontend and backend — from designing data models and APIs, to
            crafting responsive interfaces, animations, and meaningful
            micro‑interactions. I like working closely with founders,
            designers, and engineers to ship features that solve real
            problems, not just look good in screenshots.
          </p>

          <div className="grid gap-4 text-xs text-zinc-200 sm:grid-cols-2">
            <div className="space-y-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                For clients &amp; founders
              </p>
              <ul className="mt-2 space-y-1.5 text-[13px] text-zinc-300">
                <li>• Landing pages and marketing sites that actually convert.</li>
                <li>• Product dashboards, admin panels, and internal tools.</li>
                <li>• End‑to‑end web apps with auth, payments, and data.</li>
                <li>• Performance, SEO, and UX improvements to existing apps.</li>
              </ul>
            </div>
            <div className="space-y-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                How I like to work
              </p>
              <ul className="mt-2 space-y-1.5 text-[13px] text-zinc-300">
                <li>• Clear scope, honest estimates, and frequent check‑ins.</li>
                <li>• GitHub‑driven workflow with meaningful PRs.</li>
                <li>• Attention to edge cases, error states, and empty states.</li>
                <li>• Written updates so you always know what&apos;s shipped.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Tech focus
              </p>
              <p className="mt-1 text-[13px] text-zinc-200">
                Next.js · React · TypeScript · Node.js · Tailwind CSS · PostgreSQL
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Availability
              </p>
              <p className="mt-1 text-[13px] text-zinc-200">
                Open to remote roles &amp; select freelance work.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-xs rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.95)]">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-900/80">
              <Image
                src="/og-image.webp"
                alt="Photo of Dipu Biswas"
                width={420}
                height={460}
                className="h-[260px] w-full object-cover sm:h-[300px]"
                priority
              />
            </div>
            <div className="mt-3 space-y-1 text-xs text-zinc-300">
              <p className="text-sm font-semibold text-zinc-50">
                Dipu Biswas
              </p>
              <p className="text-[12px] text-zinc-400">
                Full‑stack developer · Next.js &amp; React
              </p>
              <p className="text-[11px] text-zinc-500">
                Based in Balagarh, Hooghly, West Bengal, India · Working
                remotely with teams worldwide.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

