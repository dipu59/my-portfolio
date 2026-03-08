"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LuArrowUpRight, LuDownload } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985, y: 0 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-stone-200/10 bg-[linear-gradient(135deg,rgba(245,236,217,0.12),rgba(9,9,11,0.96)_58%)] px-2 py-2 text-xs font-semibold text-stone-100 shadow-[0_14px_40px_rgba(0,0,0,0.52)] backdrop-blur-xl transition-colors duration-300 hover:border-stone-200/30 hover:bg-[linear-gradient(135deg,rgba(245,236,217,0.18),rgba(20,20,24,0.98)_58%)]"
            >
              <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-amber-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-full border border-white/0 transition-colors duration-300 group-hover:border-white/8" />
              <motion.span
                className="relative z-10 pl-3 text-stone-100 transition-colors duration-300 group-hover:text-white"
                whileHover={{ x: 1.5 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                View selected work
              </motion.span>
              <motion.span
                className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-300/12 bg-stone-50/10 text-stone-300 transition-colors duration-300 group-hover:border-amber-100/35 group-hover:bg-amber-50 group-hover:text-zinc-950"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <LuArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </motion.span>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-zinc-700/80 bg-zinc-950/75 px-5 py-2 text-xs font-semibold text-zinc-100 shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-300 hover:border-sky-400/50 hover:bg-zinc-900/90 hover:text-sky-50"
            >
              <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/8 to-sky-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-full border border-white/0 transition-colors duration-300 group-hover:border-white/8" />

              <span className="relative z-10">Download resume</span>
              <span className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-300 transition-colors duration-300 group-hover:border-sky-400/40 group-hover:text-sky-200">
                <LuDownload className="h-3.5 w-3.5" />
              </span>
            </motion.a>
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
                  Developer
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
