"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1800); // keep loading for ~1.8s for a premium feel

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-black via-zinc-950 to-slate-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <motion.div
              className="h-28 w-28 rounded-full bg-linear-to-tr from-zinc-100 via-sky-400 to-violet-500 blur-3xl opacity-40"
              initial={{ scale: 0.6, opacity: 0.2 }}
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.25, 0.4, 0.25] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-black/60 backdrop-blur-xl"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                >
                  <div className="h-8 w-8 rounded-full bg-linear-to-tr from-zinc-100 via-sky-400 to-violet-500" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

