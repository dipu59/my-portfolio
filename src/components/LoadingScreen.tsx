"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

type LoadingCardProps = {
  eyebrow: string;
  title: string;
  progressDuration: number;
  overlayClassName: string;
  labelClassName: string;
  titleClassName: string;
  circleOuterClassName: string;
  circleInnerClassName: string;
  circleAccentClassName: string;
  progressTrackClassName: string;
  progressFillClassName: string;
};

function LoadingCard({
  eyebrow,
  title,
  progressDuration,
  overlayClassName,
  labelClassName,
  titleClassName,
  circleOuterClassName,
  circleInnerClassName,
  circleAccentClassName,
  progressTrackClassName,
  progressFillClassName,
}: LoadingCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center px-5 ${overlayClassName}`}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full max-w-xs"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`absolute inset-0 rounded-full border ${circleOuterClassName}`}
            />
            <div
              className={`absolute inset-[8px] rounded-full border ${circleInnerClassName}`}
            />
            <motion.div
              className={`absolute inset-[8px] rounded-full border-t border-r ${circleAccentClassName}`}
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            />
          </motion.div>

          <motion.p
            className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] ${labelClassName}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04, ease: "easeOut" }}
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            className={`mt-3 text-xl font-medium tracking-tight ${titleClassName}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h2>

          <div className="mt-6 w-full">
            <div
              className={`relative h-px overflow-hidden rounded-full ${progressTrackClassName}`}
            >
              <motion.div
                className={`h-full origin-left rounded-full ${progressFillClassName}`}
                initial={shouldReduceMotion ? { scaleX: 0.9 } : { scaleX: 0 }}
                animate={{ scaleX: 0.92 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : progressDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.9)_50%,transparent_100%)] opacity-60"
                  initial={{ x: "-120%" }}
                  animate={{ x: ["-120%", "260%"] }}
                  transition={{
                    duration: progressDuration,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LoadingScreen() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const isAboutPage = pathname === "/about";
  const timeoutDuration = isAboutPage ? 1500 : 2100;
  const progressDuration = Math.max(0.9, timeoutDuration / 1000 - 0.3);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [timeoutDuration]);

  return (
    <AnimatePresence>
      {isVisible &&
        (isAboutPage ? (
          <LoadingCard
            eyebrow="Loading About"
            title="Preparing my story."
            progressDuration={progressDuration}
            overlayClassName="bg-[#f8fafc]"
            labelClassName="text-slate-500"
            titleClassName="text-slate-950"
            circleOuterClassName="border-slate-200"
            circleInnerClassName="border-slate-200/80"
            circleAccentClassName="border-t-slate-700 border-r-slate-400"
            progressTrackClassName="bg-slate-200"
            progressFillClassName="bg-slate-700"
          />
        ) : (
          <LoadingCard
            eyebrow="Loading Portfolio"
            title="Preparing the experience."
            progressDuration={progressDuration}
            overlayClassName="bg-[#05070b]"
            labelClassName="text-zinc-500"
            titleClassName="text-white"
            circleOuterClassName="border-white/10"
            circleInnerClassName="border-white/12"
            circleAccentClassName="border-t-white border-r-white/45"
            progressTrackClassName="bg-white/12"
            progressFillClassName="bg-white"
          />
        ))}
    </AnimatePresence>
  );
}
