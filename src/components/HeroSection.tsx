"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/dipu59" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/dipu-biswas-b0b06a381/",
  },
  { label: "Dribbble", href: "https://dribbble.com/your-username" },
  { label: "Resume", href: "#resume" },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-32 sm:px-8 md:pt-40"
    >
      <motion.div
        style={{ y: yParallax }}
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:gap-12 md:grid-cols-2"
      >
        <div className="space-y-8">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-zinc-400 backdrop-blur-xl"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            Available for premium collaborations
          </motion.p>

          <div className="space-y-4">
            <motion.h1
              className="text-4xl font-bold tracking-tight  sm:text-5xl md:text-[55px] lg:min-w-[700px] w-full"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 2.4,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Trust me, I'm a
              <span className="text-[#06B6D4] "> software developer.</span>
            </motion.h1>
            <motion.p
              className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 2.5,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              I build fast, scalable, SEO-friendly web apps that don’t just work
              — they perform. Using React, Next.js, Node.js, and modern web
              tech, I turn ideas into smooth, high-impact digital experiences
              people actually enjoy using.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 2.6,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97, y: 0 }}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-sky-500 via-cyan-400 to-violet-500 px-5 py-2 text-xs font-semibold text-zinc-950 shadow-[0_14px_45px_rgba(8,47,73,0.8)]"
            >
              <span className="relative z-10">View selected work</span>
              <motion.span
                className="relative z-10 text-sm"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✦
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-zinc-100/30 via-sky-200/40 to-transparent opacity-0"
                whileHover={{ opacity: 0.35 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400/90"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 2.8,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {socials.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ y: -1, opacity: 1 }}
                className="group flex items-center gap-1 rounded-full border border-zinc-800/70 bg-zinc-950/40 px-3 py-1 backdrop-blur-xl transition-colors hover:border-sky-500/70 hover:bg-zinc-900/80"
              >
                <span className="text-[11px] text-zinc-300 group-hover:text-sky-200">
                  {item.label}
                </span>
                <span className="text-[10px] text-zinc-500 group-hover:text-sky-300">
                  ↗
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Image section */}
        <motion.div
          className="relative flex items-center md:justify-end justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.32, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{ scale: glowScale, opacity: glowOpacity }}
            className="pointer-events-none absolute -inset-16 rounded-[36px] "
          />

          <motion.div
            initial={{ x: 23, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 3.1,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex flex-col items-center gap-4 rounded-[32px] border border-zinc-800/80 bg-zinc-950/80 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-[2px] rounded-[26px] bg-linear-to-tr from-sky-500 via-cyan-400 to-violet-500 opacity-60 blur"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative rounded-[24px] border border-zinc-700/60 bg-zinc-900/80 p-1">
                <div className="overflow-hidden rounded-[22px] bg-linear-to-b from-zinc-900 via-zinc-950 to-black">
                  <Image
                    src="/og-image.webp"
                    alt="Profile"
                    width={360}
                    height={420}
                    priority
                    className="h-[300px] w-[300px] rounded-[22px] object-cover sm:h-[320px] sm:w-[320px] "
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  ...
                </span>
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-6 rounded-full bg-sky-400/80" />
                  <span className="h-1.5 w-4 rounded-full bg-sky-500/60" />
                  <span className="h-1.5 w-2 rounded-full bg-zinc-700" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3.5 justify-center text-[16px] text-zinc-400">
                <Link
                  href={"https://github.com/dipu59"}
                  target="_blank"
                  className="hover:text-[#00b6d8]  transition-all duration-300 "
                >
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
                <Link href={"https://x.com/dipu00059"} target="_blank">
                  <FontAwesomeIcon
                    className="hover:text-[#00b6d8]  transition-all duration-300 "
                    icon={faTwitter}
                  />
                </Link>
                <Link
                  target="_blank"
                  href={"in.linkedin.com/in/dipu-biswas-b0b06a381"}
                  className="hover:text-[#00b6d8] transition-all duration-300 "
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.instagram.com/its__dipu59/"}
                >
                  <FontAwesomeIcon
                    className="hover:text-[#00b6d8] transition-all duration-300 "
                    icon={faInstagram}
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black via-black/70 to-transparent"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
