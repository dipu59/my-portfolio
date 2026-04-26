"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const orbitDots = [
  { angle: 12, size: "h-3 w-3", color: "bg-sky-300" },
  { angle: 104, size: "h-2.5 w-2.5", color: "bg-cyan-200" },
  { angle: 196, size: "h-3.5 w-3.5", color: "bg-zinc-100" },
  { angle: 286, size: "h-2 w-2", color: "bg-sky-400" },
];

export function LoadingScreen() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const isAboutPage = pathname === "/about";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, isAboutPage ? 1500 : 2100);

    return () => clearTimeout(timeout);
  }, [isAboutPage]);

  return (
    <AnimatePresence>
      {isVisible && !isAboutPage && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-[radial-gradient(circle_at_top,#17304a_0%,#05070b_42%,#000000_100%)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute left-1/2 top-[14%] h-52 w-52 -translate-x-1/2 rounded-full bg-sky-400/15 blur-3xl"
            animate={{
              scale: [0.9, 1.1, 0.92],
              opacity: [0.18, 0.35, 0.2],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[12%] h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl"
            animate={{
              x: [-20, 14, -20],
              y: [12, -18, 12],
              opacity: [0.16, 0.28, 0.16],
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex min-h-screen items-center justify-center px-5">
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(125,211,252,0.16)_42%,transparent_72%)]"
                animate={{ x: ["-120%", "140%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative flex flex-col items-center text-center">
                <div className="relative flex h-40 w-40 items-center justify-center">
                  <motion.div
                    className="absolute inset-3 rounded-full border border-sky-300/15"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/6"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 16,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,#e0f2fe_0%,#38bdf8_30%,rgba(14,165,233,0.18)_62%,rgba(0,0,0,0)_100%)] blur-[2px]"
                    animate={{
                      scale: [0.92, 1.08, 0.94],
                      opacity: [0.75, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute flex h-20 w-20 items-center justify-center rounded-full border border-white/12 bg-black/35 shadow-[0_0_40px_rgba(56,189,248,0.18)]"
                    animate={{
                      boxShadow: [
                        "0 0 28px rgba(56,189,248,0.12)",
                        "0 0 42px rgba(56,189,248,0.28)",
                        "0 0 28px rgba(56,189,248,0.12)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className="h-8 w-8 rounded-2xl bg-[linear-gradient(135deg,#f8fafc_0%,#7dd3fc_45%,#0ea5e9_100%)]"
                      animate={{ rotate: [0, 90, 180, 270, 360] }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  {orbitDots.map((dot, index) => (
                    <motion.div
                      key={dot.angle}
                      className="absolute left-1/2 top-1/2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 5.5 + index * 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ width: 0, height: 0 }}
                    >
                      <div
                        className="relative"
                        style={{
                          transform: `rotate(${dot.angle}deg) translateY(-64px)`,
                        }}
                      >
                        <motion.div
                          className={`${dot.size} ${dot.color} rounded-full shadow-[0_0_20px_rgba(125,211,252,0.45)]`}
                          animate={{
                            scale: [0.75, 1.2, 0.75],
                            opacity: [0.55, 1, 0.55],
                          }}
                          transition={{
                            duration: 1.6 + index * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="mt-3 text-[11px] font-medium uppercase tracking-[0.34em] text-sky-300/70"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                >
                  Preparing Experience
                </motion.p>
                <motion.h2
                  className="mt-3 max-w-xs text-2xl font-semibold tracking-tight text-white sm:text-[2rem]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.55 }}
                >
                  Building a cleaner, faster first impression.
                </motion.h2>
                <motion.p
                  className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.55 }}
                >
                  Loading the portfolio, motion layers, and project details so
                  the page feels ready from the first frame.
                </motion.p>

                <div className="mt-7 w-full max-w-xs">
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#e0f2fe_0%,#7dd3fc_30%,#0ea5e9_70%,#f8fafc_100%)]"
                      initial={{ x: "-100%" }}
                      animate={{ x: ["-100%", "0%", "18%"] }}
                      transition={{
                        duration: 1.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                    <motion.span
                      animate={{ opacity: [0.55, 1, 0.55] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Just a moment
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      01 / 01
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {isVisible && isAboutPage && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_48%,#eef5fb_100%)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.35),rgba(255,255,255,0)_68%)]" />

          <div className="relative flex min-h-screen items-center justify-center px-5">
            <motion.div
              className="w-full max-w-sm rounded-[2rem] border border-slate-200 bg-white/92 p-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="relative flex h-16 w-16 items-center justify-center rounded-full border border-sky-100 bg-sky-50"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.06, 1],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <motion.div
                    className="h-7 w-7 rounded-2xl bg-[linear-gradient(135deg,#38bdf8_0%,#0ea5e9_100%)]"
                    animate={
                      shouldReduceMotion ? undefined : { rotate: [0, 90, 180, 270, 360] }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "linear",
                          }
                    }
                  />
                </motion.div>

                <motion.p
                  className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.3 }}
                >
                  Loading About
                </motion.p>

                <motion.h2
                  className="mt-3 text-2xl font-semibold tracking-tight text-slate-950"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.35 }}
                >
                  Preparing my story.
                </motion.h2>

                <motion.p
                  className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                >
                  Bringing in the profile, details, and a cleaner first impression.
                </motion.p>

                <div className="mt-6 w-full max-w-[14rem]">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3fc_0%,#38bdf8_50%,#0ea5e9_100%)]"
                      initial={{ x: "-100%" }}
                      animate={{ x: ["-100%", "0%", "18%"] }}
                      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
