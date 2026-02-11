/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../../lib/utils";
import { JSX } from "react/jsx-runtime";
import Link from "next/link";
import { ModeToggle } from "../darkmood";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: any;
    link: string | null;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  // Show navbar on initial load if near top
  useEffect(() => {
    if (scrollYProgress.get() < 0.05) {
      setVisible(true);
    }
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const prev = scrollYProgress.getPrevious() ?? 0;
      const direction = current - prev;

      if (current < 0.05 || direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }} // smoother initial hidden state
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -100 }} // nice transition in
        transition={{ duration: 0.4, ease: "easeInOut" }} // smooth ease
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/20 rounded-full dark:bg-black bg-white shadow-input z-5000 pr-7 pl-8 py-2 items-center justify-center space-x-4",
          className,
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <ModeToggle />
      </motion.div>
    </AnimatePresence>
  );
};
