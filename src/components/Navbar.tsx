"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 4);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center"
    >
      <motion.nav
        className="pointer-events-auto mt-4 mx-2 lg:mx-0 flex w-full max-w-5xl items-center justify-between rounded-full border border-zinc-800/80 px-4 py-2 text-sm text-zinc-200"
        animate={{
          backgroundColor: scrolled
            ? "rgba(15,15,17,0.85)"
            : "rgba(6,6,10,0.65)",
          backdropFilter: scrolled ? "blur(22px)" : "blur(14px)",
          borderColor: scrolled ? "rgba(63,63,70,0.9)" : "rgba(39,39,42,0.9)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <a href="/" className="flex items-center gap-2">
          <motion.div
            className="relative flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-tr from-zinc-100 via-sky-400 to-violet-500 "
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
          >
            <Image
              src="/og-image.webp"
              className="rounded-full"
              alt="Logo"
              width={30}
              height={30}
            />
          </motion.div>
          <div className=" flex-col leading-tight flex">
            <span className="text-white text-sm font-bold tracking-[0.09em]  ">
              Dipu Biswas
            </span>
            <span className="text-[11px] text-zinc-500">
              Software Developer
            </span>
          </div>
        </a>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2, opacity: 1 }}
                className="relative text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-100"
              >
                <span>{link.label}</span>
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-1 h-px origin-left bg-linear-to-r from-sky-400/0 via-sky-400/80 to-violet-500/0"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97, y: 0 }}
            className="relative inline-flex items-center gap-1 overflow-hidden rounded-full border border-sky-500/60 bg-linear-to-r from-sky-500/20 via-cyan-400/15 to-violet-500/25 px-3 py-1 text-[11px] font-semibold text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.25)]"
          >
            <span className="relative z-10">Let&apos;s talk</span>
            <motion.span
              className="relative z-10 text-xs text-sky-200"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↗
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-sky-500 via-cyan-400 to-violet-500 opacity-0"
              whileHover={{ opacity: 0.18 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>
      </motion.nav>
    </motion.header>
  );
}
