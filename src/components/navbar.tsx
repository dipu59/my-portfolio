"use client";
import React from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { IconHome, IconMessage, IconMoodUnamused, IconPresentation, } from "@tabler/icons-react";

export const NavItems = [
  {
    name: "Home",
    link: "#hero",
    icon: (
      <IconHome className="h-[18px] w-[18px] text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "Works",
    link: "#works",
    icon: (
      <IconPresentation
        stroke={2}
        className="h-[18px] w-[18px] text-neutral-500 dark:text-white"
      />
    ),
  },
  {
    name: "Skill",
    link: "#skill",
    icon: (
      <IconMoodUnamused
        stroke={2}
        className="h-[18px] w-[18px] text-neutral-500 dark:text-white"
      />
    ),
  },
  {
    name: "Contact",
    link: "#contact",
    icon: (
      <IconMessage className="h-[18px] w-[18px] text-neutral-500 dark:text-white" />
    ),
  },
];
export function FloatingNavDemo() {
  return (
    <div className="relative  w-full ">
      <FloatingNav navItems={NavItems}  />
      
    </div>
  );
}
