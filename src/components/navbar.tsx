"use client";
import React from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { IconHome, IconMessage, IconPresentation, } from "@tabler/icons-react";
import { ModeToggle } from "./darkmood";
export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Works",
      link: "#works",
      icon: <IconPresentation stroke={2} className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: <ModeToggle/>,
      link: "/",
      icon: (
        <ModeToggle/>
      ),
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems}  />
      
    </div>
  );
}
