"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LuTerminal,
  LuCheck,
  LuFastForward,
  LuCpu,
  LuSparkles,
} from "react-icons/lu";

// Target text for the hacker / matrix decryption effect
const TARGET_IDENTITY = "IDENTITY: DIPU BISWAS // FULL-STACK DEVELOPER";
const CIPHER_CHARS = "01#$&*<>[]{}!%?+=_X/\\";

interface ConsoleLog {
  id: string;
  threshold: number; // Progress percentage to reveal this line
  timestamp: string;
  command: string;
  detail?: string;
  badge: string;
  badgeColor: string;
}

const CONSOLE_LOGS: ConsoleLog[] = [
  {
    id: "init",
    threshold: 8,
    timestamp: "0.08s",
    command: "system.init({ env: 'production', target: 'portfolio-v2' })",
    badge: "OK",
    badgeColor: "#D4FF24",
  },
  {
    id: "stack",
    threshold: 28,
    timestamp: "0.26s",
    command: "mount stack: React 19 • Next.js 16 • TypeScript • Tailwind",
    badge: "LOADED",
    badgeColor: "#60a5fa",
  },
  {
    id: "shaders",
    threshold: 50,
    timestamp: "0.52s",
    command: "compile visual pipeline & cyber pulse shaders",
    badge: "SYNCED",
    badgeColor: "#a78bfa",
  },
  {
    id: "telemetry",
    threshold: 88,
    timestamp: "1.15s",
    command: "optimize assets & establish real-time telemetry",
    badge: "READY",
    badgeColor: "#D4FF24",
  },
];

export function LoadingScreen() {
  const shouldReduceMotion = useReducedMotion();

  // Primary visibility state
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [decryptedText, setDecryptedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // References to keep animation clean & cancellable
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isFinishedRef = useRef(false);

  // Scroll locking helper
  const lockScroll = useCallback(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  // Complete and exit the loading screen cleanly
  const finishLoading = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    // Save session storage flag so subsequent visits in this tab don't re-trigger
    try {
      sessionStorage.setItem("dipu_portfolio_intro_seen", "true");
      document.documentElement.classList.add("intro-seen");
    } catch {
      // Ignore in private browsing mode restrictions
    }

    setProgress(100);
    setDecryptedText(TARGET_IDENTITY);
    setIsExiting(true);

    // Wait for the exit curtain transition to finish before unmounting
    const timer = setTimeout(() => {
      setIsVisible(false);
      unlockScroll();
    }, 600);

    return () => clearTimeout(timer);
  }, [unlockScroll]);

  // Instant skip on button click or Escape key
  const handleSkip = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    finishLoading();
  }, [finishLoading]);

  // Restart / Replay handler
  const handleReplay = useCallback(() => {
    isFinishedRef.current = false;
    setIsExiting(false);
    setProgress(0);
    setDecryptedText("");
    setIsVisible(true);
    lockScroll();

    try {
      sessionStorage.removeItem("dipu_portfolio_intro_seen");
      document.documentElement.classList.remove("intro-seen");
    } catch {
      // Ignore
    }

    startTimeRef.current = null;
  }, [lockScroll]);

  // Check initial session storage on mount
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("dipu_portfolio_intro_seen");
      if (hasSeen === "true") {
        setIsVisible(false);
        unlockScroll();
        return;
      }
    } catch {
      // Ignore
    }

    lockScroll();

    // Listen for custom replay event
    const onCustomReplay = () => handleReplay();
    window.addEventListener("replay-intro", onCustomReplay);

    // Listen for ESC key to skip
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // If user prefers reduced motion, finish immediately
    if (shouldReduceMotion) {
      finishLoading();
      return () => {
        window.removeEventListener("replay-intro", onCustomReplay);
        window.removeEventListener("keydown", onKeyDown);
        unlockScroll();
      };
    }

    // Main animation loop: smooth ~2.2s total duration with cyber deceleration
    const TOTAL_DURATION = 2200; // ms

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(1, elapsed / TOTAL_DURATION);

      // Non-linear easing for realistic tech boot feel:
      // Quick start -> momentary computation pauses -> fast launch finish
      let easedProgress = rawProgress;
      if (rawProgress < 0.4) {
        // Fast burst to 45%
        easedProgress = (rawProgress / 0.4) * 0.45;
      } else if (rawProgress < 0.7) {
        // Slight decryption pause around 45% to 75%
        const sub = (rawProgress - 0.4) / 0.3;
        easedProgress = 0.45 + sub * 0.3;
      } else {
        // Final surge from 75% to 100%
        const sub = (rawProgress - 0.7) / 0.3;
        easedProgress = 0.75 + sub * 0.25;
      }

      const currentPercent = Math.min(100, Math.floor(easedProgress * 100));
      setProgress(currentPercent);

      // Decryption matrix scramble logic between 35% and 85%
      if (currentPercent >= 35) {
        const decryptProgress = Math.min(1, (currentPercent - 35) / 50);
        const resolvedLength = Math.floor(decryptProgress * TARGET_IDENTITY.length);
        const resolvedPart = TARGET_IDENTITY.slice(0, resolvedLength);
        const remainingLength = TARGET_IDENTITY.length - resolvedLength;

        let scrambledPart = "";
        for (let i = 0; i < remainingLength; i++) {
          const char = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          scrambledPart += char;
        }

        setDecryptedText(resolvedPart + scrambledPart);
      }

      if (rawProgress < 1 && !isFinishedRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        finishLoading();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("replay-intro", onCustomReplay);
      window.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [shouldReduceMotion, lockScroll, unlockScroll, finishLoading, handleSkip, handleReplay]);

  // Terminal cursor blinking interval
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Expose replay function on window for convenience
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { replayTerminalIntro?: () => void }).replayTerminalIntro = handleReplay;
    }
  }, [handleReplay]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div
        id="terminal-loading-screen"
        role="status"
        aria-live="polite"
        aria-label="Loading Dipu Biswas Portfolio"
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
      >
        {/* ── Top Curtain Shutter ────────────────────────────────────── */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-[#030407] border-b border-[#1a2235]/40"
          initial={{ y: 0 }}
          animate={isExiting ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── Bottom Curtain Shutter ─────────────────────────────────── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#030407] border-t border-[#1a2235]/40"
          initial={{ y: 0 }}
          animate={isExiting ? { y: "100%" } : { y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── Ambient Radial Atmosphere Glow ─────────────────────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-75"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 35%, rgba(21, 88, 201, 0.18) 0%, transparent 60%),
              radial-gradient(circle at 50% 65%, rgba(212, 255, 36, 0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* ── Fine CRT Scanline Texture ───────────────────────────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] opacity-35"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35) 1px, transparent 1px, transparent 2px)`,
            backgroundSize: "100% 2px",
          }}
        />

        {/* ── Interactive Skip Button (Top Right) ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute top-5 right-5 z-[52]"
        >
          <button
            onClick={handleSkip}
            className="group inline-flex items-center gap-2 rounded-full border border-[#1a2235] bg-[#0a0d14]/80 px-3.5 py-1.5 text-xs font-mono text-slate-400 backdrop-blur-md transition-all duration-200 hover:border-[#D4FF24]/60 hover:text-white hover:shadow-[0_0_16px_rgba(212,255,36,0.25)] active:scale-95 cursor-pointer"
            title="Press Escape to skip loading animation"
          >
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300 group-hover:bg-[#D4FF24]/20 group-hover:text-[#D4FF24]">
              ESC
            </span>
            <span>Skip Intro</span>
            <LuFastForward className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#D4FF24]" />
          </button>
        </motion.div>

        {/* ── Terminal Window Card ───────────────────────────────────── */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, scale: 0.96, y: 12 }
          }
          animate={
            isExiting
              ? { opacity: 0, scale: 1.04, y: -8 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[51] mx-4 w-full max-w-2xl rounded-2xl border border-[#1a2235] bg-[#0a0d14]/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(21,88,201,0.18)] backdrop-blur-xl"
        >
          {/* Top Titlebar */}
          <div className="flex items-center justify-between border-b border-[#1a2235] px-4 py-3 sm:px-5">
            {/* Terminal Window Controls */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ef4444]/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="h-3 w-3 rounded-full bg-[#f59e0b]/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <span className="h-3 w-3 rounded-full bg-[#D4FF24]/80 shadow-[0_0_8px_rgba(212,255,36,0.6)]" />
              <div className="ml-2 hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <LuTerminal className="h-3.5 w-3.5 text-[#D4FF24]" />
                <span>dipu@portfolio: ~ (zsh)</span>
              </div>
            </div>

            {/* Mobile Title (visible on small screens) */}
            <div className="flex sm:hidden items-center gap-1 text-xs font-mono text-slate-300">
              <LuTerminal className="h-3.5 w-3.5 text-[#D4FF24]" />
              <span>terminal</span>
            </div>

            {/* Live System Indicator */}
            <div className="flex items-center gap-2 rounded-full border border-[#1a2235] bg-[#030407]/70 px-2.5 py-1 text-[11px] font-mono text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4FF24] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4FF24] shadow-[0_0_6px_#D4FF24]" />
              </span>
              <span className="hidden xs:inline text-slate-300">BOOTING</span>
              <span className="text-[#D4FF24] font-semibold">PORT:3000</span>
            </div>
          </div>

          {/* Terminal Console Body */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed space-y-3">
            {/* System Kernel Banner */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1a2235]/60 text-slate-500 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-400">
                <LuCpu className="h-3.5 w-3.5 text-[#1558C9]" />
                DIPU KERNEL v2.4.0-release (x86_64)
              </span>
              <span className="text-[#94a3b8]">MODE: TURBOPACK</span>
            </div>

            {/* Staggered Console Output Lines */}
            <div className="space-y-2 pt-1 min-h-[140px] sm:min-h-[155px]">
              {CONSOLE_LOGS.map((log) => {
                const isRevealed = progress >= log.threshold;
                if (!isRevealed) return null;

                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start justify-between gap-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-slate-600 select-none">
                        [{log.timestamp}]
                      </span>
                      <span className="text-slate-300">
                        <span className="text-[#1558C9] font-bold mr-1">&gt;</span>
                        {log.command}
                      </span>
                    </div>
                    <span
                      className="shrink-0 font-bold px-1.5 py-0.2 rounded text-[10px] tracking-wider"
                      style={{
                        color: log.badgeColor,
                        backgroundColor: `${log.badgeColor}15`,
                        border: `1px solid ${log.badgeColor}40`,
                      }}
                    >
                      {log.badge}
                    </span>
                  </motion.div>
                );
              })}

              {/* Matrix Decryption Cipher Line */}
              {progress >= 35 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-[#D4FF24]/30 bg-[#D4FF24]/5 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <LuSparkles className="h-3.5 w-3.5 text-[#D4FF24] animate-pulse shrink-0" />
                    <span className="font-semibold text-white tracking-wide break-all">
                      {decryptedText || TARGET_IDENTITY}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Active Command Line with Blinking Cursor */}
              <div className="pt-2 flex items-center gap-2 text-slate-300">
                <span className="text-[#D4FF24] font-semibold">
                  dipu@portfolio:~$
                </span>
                <span className="text-slate-200">
                  {progress < 100
                    ? "decrypt --target=production --launch"
                    : "ready --workspace dipu-biswas"}
                </span>
                <span
                  className={`inline-block h-3.5 w-2 bg-[#D4FF24] transition-opacity duration-100 ${
                    cursorVisible ? "opacity-100 shadow-[0_0_8px_#D4FF24]" : "opacity-0"
                  }`}
                />
              </div>
            </div>

            {/* ── Telemetry & Progress HUD Section ──────────────────────── */}
            <div className="pt-4 border-t border-[#1a2235] space-y-3">
              {/* Progress Title & Percentage Readout */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1558C9]" />
                  <span className="uppercase tracking-[0.2em] font-semibold text-slate-400 text-[11px]">
                    {progress < 100
                      ? "INITIALIZING WORKSPACE"
                      : "ALL SYSTEMS NOMINAL"}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-lg font-bold text-white tabular-nums tracking-wider text-shadow">
                    {progress.toString().padStart(3, "0")}
                  </span>
                  <span className="text-xs font-semibold text-[#D4FF24]">%</span>
                </div>
              </div>

              {/* High-Tech Progress Track */}
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#030407] border border-[#1a2235]">
                {/* Gradient Progress Fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, #1558C9 0%, #3b82f6 50%, #D4FF24 100%)",
                    boxShadow: "0 0 16px rgba(212, 255, 36, 0.4)",
                  }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />

                {/* Animated Shimmer Sweep Light */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "600%"] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>

              {/* Mini Diagnostic Telemetry Strip */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                <span>MEM: 64MB / 128MB</span>
                <span className="hidden sm:inline">LATENCY: 12ms</span>
                <span className="hidden sm:inline">REGION: IN-WEST</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <LuCheck className="h-3 w-3 text-[#D4FF24]" />
                  <span>STATUS: 200 OK</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
