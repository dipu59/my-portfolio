"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  LuArrowUpRight,
  LuBriefcaseBusiness,
  LuCode,
  LuDownload,
  LuMail,
  LuMapPin,
  LuPhone,
  LuSparkles,
} from "react-icons/lu";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/dipu59",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/in/dipu-biswas-b0b06a381",
    icon: FaLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/dipu00059",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/its__dipu59/",
    icon: FaInstagram,
  },
];

const quickFacts = [
  {
    label: "Based in",
    value: "Balagarh, Hooghly, West Bengal, India",
    icon: LuMapPin,
  },
  {
    label: "Specialty",
    value: "Full-stack websites with clean UI and reliable backend flows",
    icon: LuCode,
  },
  {
    label: "Availability",
    value: "Open to remote roles and select freelance projects",
    icon: LuBriefcaseBusiness,
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",
  "Prisma",
  "PostgreSQL",
  "MongoDB",
  "Vercel",
];

export function AboutPageContent() {
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = shouldReduceMotion
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <div className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-x-hidden bg-[#f8fafc] text-slate-900">
      <section className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 md:pt-36">
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.4))]" />

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] md:items-center">
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
            }
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.98 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-[0_8px_20px_rgba(148,163,184,0.08)]"
            >
              <motion.span
                animate={
                  shouldReduceMotion ? undefined : { rotate: [0, -8, 8, 0] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 1.4, repeat: 1, ease: "easeInOut" }
                }
                className="inline-flex"
              >
                <LuSparkles className="h-3.5 w-3.5" />
              </motion.span>
              About Me
            </motion.div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                I am your <span className="text-[#09a9c5]">Personalize</span>{" "}
                Developer.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                I&apos;m Dipu Biswas, a full-stack developer from West Bengal,
                India. I build modern websites and web apps with Next.js, React,
                TypeScript, and Node.js, with a strong focus on performance,
                clean interfaces, and practical product thinking.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {quickFacts.map((fact, index) => {
                const Icon = fact.icon;

                return (
                  <motion.article
                    key={fact.label}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.14 + index * 0.08,
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_14px_28px_rgba(15,23,42,0.05)]"
                  >
                    <div className="mb-3 inline-flex rounded-2xl bg-sky-50 p-2.5 text-sky-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {fact.value}
                    </p>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45 }}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                A little more about my work
              </p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
                <p>
                  I enjoy working on projects where design quality and code
                  quality both matter. That usually means responsive layouts,
                  clean component structure, strong user experience, and backend
                  logic that stays maintainable as features grow.
                </p>
                <p>
                  My favorite builds are portfolio websites, product landing
                  pages, business sites, dashboards, and full-stack apps where
                  speed, clarity, and trust really shape the final experience.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 18 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.12,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-[#f3f7fb]">
                <Image
                  src="/dipubiswas.jpg"
                  alt="Portrait of Dipu Biswas"
                  width={900}
                  height={1100}
                  priority
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-[26rem] w-full object-cover sm:h-[30rem]"
                />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">
                    Dipu Biswas
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Full-stack developer building elegant web experiences with
                    React, Next.js, TypeScript, and Node.js.
                  </p>
                </div>

                <div className="grid gap-3 text-sm text-slate-700">
                  <a
                    href="mailto:12biswasdipu@gmail.com"
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition-colors hover:border-sky-200 hover:bg-sky-50"
                  >
                    <LuMail className="h-4 w-4 text-sky-700" />
                    12biswasdipu@gmail.com
                  </a>
                  <a
                    href="tel:+919239005171"
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition-colors hover:border-sky-200 hover:bg-sky-50"
                  >
                    <LuPhone className="h-4 w-4 text-sky-700" />
                    +91 92390 05171
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/resume.pdf"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Download resume
                    <LuDownload className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-sky-200 hover:text-sky-700"
                  >
                    Contact me
                    <LuArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-sky-200 hover:text-sky-700"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="px-4 pb-18 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <motion.div
            {...fadeUp}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              What I care about
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
              <p>
                I like clean layouts, meaningful detail, and products that feel
                calm to use. My work usually combines visual polish with solid
                frontend structure and backend reliability.
              </p>
              <p>
                I try to keep things simple: clear communication, maintainable
                code, responsive design, and just enough animation to make the
                experience feel friendly instead of noisy.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.06, duration: 0.45 }}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Core stack
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {stack.map((item, index) => (
                <motion.span
                  key={item}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.02,
                    duration: 0.25,
                  }}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
