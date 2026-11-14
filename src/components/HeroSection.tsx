"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowUpRight, LuDownload } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { NeonSnakeGame } from "./NeonSnakeGame";
import { CyberBugHunterGame } from "./CyberBugHunterGame";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/dipu59", icon: faGithub },
  { label: "Twitter", href: "https://x.com/dipu_biswas_dev", icon: faTwitter },
  { label: "LinkedIn", href: "https://in.linkedin.com/in/dipu-biswas-b0b06a381", icon: faLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/dipubiswas_official_/", icon: faInstagram },
] as const;

// ── Retro Arcade Game Zone Sound Effects ────────────────────────────────────
function playArcadeEntrySound() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // Upbeat 8-bit futuristic power-up fanfare (Level enter / Warp chord)
    const notes = [
      { f: 261.63, time: 0.00, dur: 0.06, type: "sawtooth" as OscillatorType }, // C4
      { f: 329.63, time: 0.06, dur: 0.06, type: "sawtooth" as OscillatorType }, // E4
      { f: 392.00, time: 0.12, dur: 0.06, type: "sawtooth" as OscillatorType }, // G4
      { f: 523.25, time: 0.18, dur: 0.08, type: "square" as OscillatorType },   // C5
      { f: 659.25, time: 0.25, dur: 0.10, type: "square" as OscillatorType },   // E5
      { f: 783.99, time: 0.32, dur: 0.12, type: "square" as OscillatorType },   // G5
      { f: 1046.50, time: 0.40, dur: 0.32, type: "square" as OscillatorType },  // C6 (Trophy note)
    ];

    notes.forEach(({ f, time, dur, type }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, now + time);
      osc.frequency.exponentialRampToValueAtTime(f * 1.03, now + time + dur);

      gain.gain.setValueAtTime(0.14, now + time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });

    // Deep sub-bass warp thump at start
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.35);
    subGain.gain.setValueAtTime(0.25, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.35);
  } catch { }
}

function playArcadeExitSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.2);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch { }
}

export function HeroSection() {
  const [activeView, setActiveView] = useState<"profile" | "snake" | "bughunter">("profile");
  const [lastGame, setLastGame] = useState<"snake" | "bughunter">("snake");

  const handleToggleGame = () => {
    if (activeView === "profile") {
      playArcadeEntrySound();
      setActiveView(lastGame);
    } else {
      playArcadeExitSound();
      setActiveView("profile");
    }
  };

  const handleCloseGame = () => {
    playArcadeExitSound();
    setActiveView("profile");
  };

  return (
    <section
      aria-label="Hero Introduction"
      className="relative w-full pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 lg:pt-36 lg:pb-24"
      style={{ backgroundColor: "#030407" }}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-center">

        {/* ── Left Column ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:col-span-7 flex flex-col items-start gap-6 sm:gap-7"
        >
          {/* Status Pill */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-white"
            style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ backgroundColor: "#D4FF24", animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "#D4FF24", boxShadow: "0 0 8px rgba(212,255,36,0.7)" }}
              />
            </span>
            <span>Available for premium collaborations</span>
          </div>

          {/* Headline */}
          <h1 className="w-full text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            Trust me, I&apos;m a{" "}
            <span
              className="relative inline-block"
              style={{ color: "#D4FF24" }}
            >
              software developer.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="w-full max-w-xl text-base sm:text-lg md:text-[19px] leading-relaxed" style={{ color: "#cbd5e1" }}>
            I build fast, scalable, production-ready web apps using{" "}
            <span className="font-semibold text-white">React, Next.js, and Node.js</span>
            —turning ideas into smooth, high-impact digital experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3.5 pt-2 w-full sm:w-auto">
            {/* Primary */}
            <a
              href="#projects"
              className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 w-auto"
              style={{
                backgroundColor: "#1558C9",
                color: "#ffffff",
                boxShadow: "0 0 24px rgba(21,88,201,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 32px rgba(21,88,201,0.65)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(21,88,201,0.4)";
              }}
            >
              <span>View Selected Work</span>
              <LuArrowUpRight className="h-4 w-4" />
            </a>

            {/* Secondary */}
            <a
              href="/resume.pdf"
              download
              className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 w-auto"
              style={{
                border: "1px solid rgba(212,255,36,0.35)",
                backgroundColor: "transparent",
                color: "#D4FF24",
              }}
            >
              <span>Resume</span>
              <LuDownload className="h-4 w-4" />
            </a>
          </div>

          {/* Social Row & Attractive Animated Game Button */}
          <div
            className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-3 w-full text-xs"
            style={{ borderTop: "1px solid #1a2235" }}
          >
            <div className="flex items-center gap-3.5">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-[16px] p-1 transition-colors duration-200"
                  style={{ color: "#64748b" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#D4FF24";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#64748b";
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </Link>
              ))}
            </div>

            <span className="hidden sm:inline-block h-3.5 w-px" style={{ backgroundColor: "#1a2235" }} />

            {/* ── Single Attractive Animated Game Button ───────────────── */}
            <motion.button
              type="button"
              onClick={handleToggleGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={
                activeView === "profile"
                  ? {
                    boxShadow: [
                      "0 0 10px rgba(212,255,36,0.25)",
                      "0 0 24px rgba(21,88,201,0.55)",
                      "0 0 10px rgba(212,255,36,0.25)",
                    ],
                  }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className={`relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono font-bold transition-all duration-300 cursor-pointer select-none border group ${activeView !== "profile"
                ? "border-rose-500/50 bg-rose-950/40 text-rose-300 shadow-[0_0_14px_rgba(244,63,94,0.35)]"
                : "border-[#D4FF24]/60 bg-gradient-to-r from-[#1558C9]/25 via-[#0a0d14] to-[#D4FF24]/15 text-white hover:border-[#D4FF24]"
                }`}
              title={
                activeView !== "profile"
                  ? "Exit Game & Flip Back to Profile"
                  : "Enter Retro Arcade Game Zone!"
              }
            >
              {/* Neon Ping Indicator */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  aria-hidden="true"
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${activeView !== "profile"
                    ? "bg-rose-500"
                    : "bg-[#D4FF24] animate-ping"
                    }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${activeView !== "profile" ? "bg-rose-500" : "bg-[#D4FF24]"
                    }`}
                />
              </span>


              {/* Button Label */}
              <span className="tracking-wide">
                {activeView !== "profile" ? "Exit" : "Game"}
              </span>

              {/* Animated Action Badge */}
              <span
                className={`px-1.5 py-0.5 text-[9px] rounded-full font-extrabold tracking-wider transition-colors ${activeView !== "profile"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "bg-[#D4FF24] text-black shadow-sm group-hover:bg-[#e4ff66]"
                  }`}
              >
                {activeView !== "profile" ? "FLIP ↩" : "PLAY"}
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Right Column: 3D Flip Card (Photo ↔ Game Zone) ───────────── */}
        <div
          className="w-full md:col-span-5 flex justify-center md:justify-end"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="wait">
            {activeView === "profile" ? (
              <motion.div
                key="profile-card"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full max-w-sm sm:max-w-md md:max-w-none rounded-2xl sm:rounded-3xl group relative"
              >
                <div
                  className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 relative"
                  style={{
                    border: "1px solid #1a2235",
                    backgroundColor: "#0a0d14",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.70)",
                  }}
                >
                  {/* Image */}
                  <div
                    className="relative aspect-4/5 sm:aspect-square md:aspect-4/5 w-full overflow-hidden rounded-xl sm:rounded-2xl"
                    style={{ border: "1px solid #1a2235", backgroundColor: "#0f1420" }}
                  >
                    <Image
                      src="/og-image.webp"
                      alt="Dipu Biswas — Software Developer"
                      fill
                      priority
                      sizes="(min-width: 1024px) 340px, (min-width: 768px) 40vw, 100vw"
                      className="object-cover object-top"
                    />
                    {/* Blue gradient overlay at bottom */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                      style={{ background: "linear-gradient(to top, rgba(21,88,201,0.25), transparent)" }}
                    />
                  </div>

                  {/* Card Info */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm sm:text-[16px] font-bold text-white">Dipu Biswas</p>
                      <p className="text-xs" style={{ color: "#64748b" }}>
                        Full-stack Developer · Next.js &amp; React
                      </p>
                    </div>

                    <div
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-medium"
                      style={{
                        border: "1px solid rgba(212,255,36,0.25)",
                        backgroundColor: "rgba(212,255,36,0.08)",
                        color: "#D4FF24",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: "#D4FF24" }}
                      />
                      <span>ONLINE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="game-card"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full flex justify-center md:justify-end"
              >
                {activeView === "snake" ? (
                  <NeonSnakeGame
                    onClose={handleCloseGame}
                    onSwitchToBugHunter={() => {
                      setLastGame("bughunter");
                      setActiveView("bughunter");
                    }}
                  />
                ) : (
                  <CyberBugHunterGame
                    onClose={handleCloseGame}
                    onSwitchToSnake={() => {
                      setLastGame("snake");
                      setActiveView("snake");
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
