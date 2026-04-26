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

const workingStyle = [
  "Fast, responsive layouts that stay clean across screen sizes",
  "Backend flows that are practical to maintain as features grow",
  "Visual polish used with restraint so the interface stays calm",
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
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl text-nowrap">
                I am your <span className="text-[#09a9c5]">Personalize</span>{" "}
                <br />
                Developer.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                I&apos;m Dipu Biswas, a full-stack developer from West Bengal,
                India. I build modern websites and web apps with Next.js, React,
                TypeScript, and Node.js, with a strong focus on performance,
                clean interfaces, and practical product thinking.
              </p>
            </div>

            <div className="grid gap-6 border-t border-slate-200/80 pt-6 sm:grid-cols-3">
              {quickFacts.map((fact, index) => {
                const Icon = fact.icon;

                return (
                  <motion.div
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
                    className="space-y-3 border-l border-slate-200 pl-4 first:border-l-0 first:pl-0"
                  >
                    <div className="inline-flex rounded-full bg-sky-100/80 p-2 text-sky-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {fact.label}
                    </p>
                    <p className="text-sm leading-6 text-slate-700">
                      {fact.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45 }}
              className="grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  How I work
                </p>
                <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600 sm:text-[15px]">
                  I enjoy projects where thoughtful design and dependable code
                  need to move together, not compete with each other.
                </p>
              </div>
              <div className="space-y-4">
                {workingStyle.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 border-b border-slate-200/80 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                    <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
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
            <div className="border-l border-slate-200 pl-0 md:pl-8">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#eef4f9]">
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

              <div className="mt-6 space-y-5">
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
                    className="flex items-center gap-3 border-b border-slate-200 pb-3 transition-colors hover:text-sky-700"
                  >
                    <LuMail className="h-4 w-4 text-sky-700" />
                    12biswasdipu@gmail.com
                  </a>
                  <a
                    href="tel:+919239005171"
                    className="flex items-center gap-3 border-b border-slate-200 pb-3 transition-colors hover:text-sky-700"
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
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-sky-200 hover:text-sky-700"
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
        <div className="mx-auto max-w-6xl border-t border-slate-200 pt-8">
          <motion.div
            {...fadeUp}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                What I care about
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
                <p>
                  I like clean layouts, meaningful detail, and products that
                  feel calm to use. My work usually balances visual polish with
                  solid frontend structure and backend reliability.
                </p>
                <p>
                  The goal is usually the same: make the experience clear,
                  trustworthy, and easy for real people to use.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Core stack
              </p>
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
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
                    className="text-sm text-slate-700 after:ml-3 after:text-slate-300 after:content-['/'] last:after:content-none"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
