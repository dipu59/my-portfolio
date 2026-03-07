"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type SectionId = "home" | "projects" | "about" | "skills" | "contact";

const navLinks: { label: string; href: string; section: SectionId }[] = [
  { label: "Home", href: "/", section: "home" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 4);
    if (latest < 120) {
      setActiveSection("home");
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ids: SectionId[] = ["projects", "about", "skills", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );

        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId;
          setActiveSection(id);
        }
      },
      {
        root: null,
        threshold: 0.4,
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCloseMenu = () => setIsMenuOpen(false);

  const scrollToSection = (section: SectionId) => {
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(section);
    if (!el) return;

    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center"
    >
      <motion.nav
        className="pointer-events-auto relative mt-4 mx-2 lg:mx-0 flex w-full max-w-5xl items-center justify-between rounded-full border border-zinc-800/80 px-4 py-2 text-sm text-zinc-200"
        animate={{
          backgroundColor: scrolled
            ? "rgba(15,15,17,0.85)"
            : "rgba(6,6,10,0.65)",
          backdropFilter: scrolled ? "blur(22px)" : "blur(14px)",
          borderColor: scrolled ? "rgba(63,63,70,0.9)" : "rgba(39,39,42,0.9)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Link href="/" className="flex items-center gap-2">
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
          <div className="flex flex-col leading-tight">
            <span className="text-white text-sm font-bold tracking-[0.09em]">
              Dipu Biswas
            </span>
            <span className="text-[11px] text-zinc-500">
              Software Developer
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.section);
                  }}
                  className="relative text-xs font-medium"
                >
                  <motion.span
                    whileHover={{ y: -2, opacity: 1 }}
                    className={`relative transition-colors ${
                      isActive
                        ? "text-zinc-100"
                        : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {link.label}
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-1 h-px origin-left bg-linear-to-r from-sky-400/0 via-sky-400/90 to-violet-500/0"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </motion.span>
                </Link>
              );
            })}
          </div>

          <motion.a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97, y: 0 }}
            className="hidden relative items-center gap-1 overflow-hidden rounded-full border border-sky-500/60 bg-linear-to-r from-sky-500/20 via-cyan-400/15 to-violet-500/25 px-3 py-1 text-[11px] font-semibold text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.25)] md:inline-flex"
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

          <motion.button
            type="button"
            aria-label="Toggle navigation menu"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/80 bg-black/40 text-zinc-100 md:hidden"
          >
            <motion.span
              className="relative block h-3 w-4"
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-full rounded-full bg-zinc-100"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 5 },
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-0 top-1.5 h-0.5 w-3/4 rounded-full bg-zinc-400"
                variants={{
                  closed: { opacity: 1, x: 0 },
                  open: { opacity: 0, x: -6 },
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-0 bottom-0 h-0.5 w-full rounded-full bg-zinc-100"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -5 },
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.span>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-2 right-2 top-full mt-2 origin-top rounded-2xl border border-zinc-800/80 bg-black/90 p-3 shadow-lg backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.section;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.section);
                        handleCloseMenu();
                      }}
                      className="rounded-lg"
                    >
                      <motion.span
                        whileHover={{ x: 4 }}
                        className={`block px-2 py-2 text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-zinc-800/80 text-zinc-50"
                            : "text-zinc-300 hover:bg-zinc-800/60 hover:text-zinc-50"
                        }`}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  );
                })}

                <Link
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                    handleCloseMenu();
                  }}
                  className="mt-2 inline-flex w-full items-center justify-center"
                >
                  <motion.span
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    className="inline-flex w-full items-center justify-center gap-1 overflow-hidden rounded-full border border-sky-500/60 bg-linear-to-r from-sky-500/20 via-cyan-400/15 to-violet-500/25 px-3 py-1.5 text-[11px] font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)]"
                  >
                    <span className="relative z-10">Let&apos;s talk</span>
                    <motion.span
                      className="relative z-10 text-xs text-sky-200"
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ↗
                    </motion.span>
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
