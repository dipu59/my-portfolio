"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type SectionId = "home" | "projects" | "blog" | "about" | "gallery" | "skills" | "contact";

const navLinks: { label: string; href: string; section: SectionId }[] = [
  { label: "Home",     href: "/",         section: "home"    },
  { label: "Projects", href: "/#projects", section: "projects"},
  { label: "Blog",     href: "/blog",      section: "blog"    },
  { label: "About",    href: "/about",     section: "about"   },
  { label: "Gallery",  href: "/gallery",   section: "gallery" },
  { label: "Skills",   href: "/#skills",   section: "skills"  },
  { label: "Contact",  href: "/#contact",  section: "contact" },
];

export function Navbar() {
  const pathname        = usePathname();
  const [scrolled, setScrolled]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 4);
    if (latest < 120) setActiveSection("home");
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const ids: SectionId[] = ["projects", "about", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { root: null, threshold: 0.4 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const handleCloseMenu = () => setIsMenuOpen(false);
  const currentSection: SectionId =
    pathname === "/"
      ? activeSection
      : pathname === "/about"
      ? "about"
      : pathname === "/gallery"
      ? "gallery"
      : pathname.startsWith("/blog")
      ? "blog"
      : "home";

  const scrollToSection = (section: SectionId) => {
    if (section === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(section);
    if (!el) return;
    const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    section: SectionId
  ) => {
    if (href === "/about" || href === "/gallery" || href.startsWith("/blog")) {
      handleCloseMenu();
      return;
    }
    if (pathname !== "/") {
      handleCloseMenu();
      return;
    }
    event.preventDefault();
    scrollToSection(section);
    handleCloseMenu();
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <motion.nav
        className="pointer-events-auto relative mt-3 mx-3 lg:mx-0 flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-2.5 text-sm backdrop-blur-md"
        animate={{
          backgroundColor: scrolled
            ? "rgba(3, 4, 7, 0.88)"
            : "rgba(3, 4, 7, 0.55)",
          borderColor: scrolled
            ? "rgba(21, 88, 201, 0.35)"
            : "rgba(26, 34, 53, 0.60)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.70), 0 0 0 1px rgba(21,88,201,0.08)"
            : "0 4px 16px rgba(0,0,0,0.40)",
        }}
        style={{ willChange: "background-color, box-shadow" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* ── Logo ───────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5">
          <motion.div
            className="relative flex h-7 w-7 items-center justify-center rounded-full overflow-hidden"
            style={{ border: "1px solid rgba(21,88,201,0.5)" }}
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
            <span className="text-sm font-bold tracking-[0.09em] text-white">
              Dipu Biswas
            </span>
            <span className="text-[11px]" style={{ color: "#64748b" }}>
              Software Developer
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => {
              const isActive = currentSection === link.section;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.section)}
                  className="relative text-xs font-medium"
                >
                  <motion.span
                    whileHover={{ y: -2, opacity: 1 }}
                    className="relative transition-colors"
                    style={{
                      color: isActive ? "#ffffff" : "#64748b",
                    }}
                  >
                    {link.label}
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-1 h-px origin-left"
                      style={{
                        background: "linear-gradient(90deg, transparent, #1558C9, #D4FF24, transparent)",
                      }}
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </motion.span>
                </Link>
              );
            })}
          </div>

          {/* ── CTA Button ───────────────────────────────────────────────── */}
          <motion.a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact", "contact")}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97, y: 0 }}
            className="hidden relative items-center gap-1 overflow-hidden rounded-full px-3 py-1 text-[11px] font-semibold md:inline-flex"
            style={{
              border: "1px solid rgba(212, 255, 36, 0.40)",
              background: "linear-gradient(135deg, rgba(21,88,201,0.20), rgba(212,255,36,0.12))",
              color: "#D4FF24",
            }}
          >
            <span className="relative z-10">Let&apos;s talk</span>
            <motion.span
              className="relative z-10 text-xs"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ↗
            </motion.span>
          </motion.a>

          {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
          <motion.button
            type="button"
            aria-label="Toggle navigation menu"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full md:hidden"
            style={{ border: "1px solid #1a2235", backgroundColor: "rgba(3,4,7,0.6)" }}
          >
            <motion.span
              className="relative block h-3 w-4"
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-full rounded-full bg-white"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 5 } }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-0 top-1.5 h-0.5 w-3/4 rounded-full"
                style={{ backgroundColor: "#94a3b8" }}
                variants={{ closed: { opacity: 1, x: 0 }, open: { opacity: 0, x: -6 } }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
              <motion.span
                className="absolute left-0 bottom-0 h-0.5 w-full rounded-full bg-white"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -5 } }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.span>
          </motion.button>
        </div>

        {/* ── Mobile Dropdown Menu ──────────────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-2 right-2 top-full mt-2 origin-top rounded-2xl p-3 shadow-lg backdrop-blur-xl md:hidden"
              style={{
                border: "1px solid #1a2235",
                backgroundColor: "rgba(3,4,7,0.95)",
              }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = currentSection === link.section;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.section)}
                      className="rounded-lg"
                    >
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="block px-2 py-2 text-xs font-medium transition-colors rounded-lg"
                        style={{
                          backgroundColor: isActive ? "rgba(21,88,201,0.15)" : "transparent",
                          color: isActive ? "#ffffff" : "#94a3b8",
                        }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  );
                })}

                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact", "contact")}
                  className="mt-2 inline-flex w-full items-center justify-center"
                >
                  <motion.span
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    className="inline-flex w-full items-center justify-center gap-1 overflow-hidden rounded-full px-3 py-1.5 text-[11px] font-semibold"
                    style={{
                      border: "1px solid rgba(212,255,36,0.35)",
                      background: "linear-gradient(135deg, rgba(21,88,201,0.2), rgba(212,255,36,0.1))",
                      color: "#D4FF24",
                    }}
                  >
                    <span>Let&apos;s talk</span>
                    <motion.span
                      className="text-xs"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
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
