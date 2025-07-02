import React from "react";
import { ExpandableCardDemo } from "./workscard";

export default function Works() {
  return (
    <main
      id="works"
      className="h-auto w-full dark:bg-gradient-to-br dark:from-[#0f0715] dark:via-[#1a0f25] dark:to-[#2a1b3d] bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] "
    >
      <div>
        <h1 className="text-4xl md:text-7xl font-bold md:pt-40  text-center bg-clip-text text-transparent bg-gradient-to-l dark:from-neutral-50 dark:to-purple-800 from-purple-900 to-purple-800  bg-opacity-50 pt-32">
          Work I’ve Done So Far
        </h1>
        <p className="max-w-2xl font-medium mx-auto text-center text-[#4b5563] md:text-lg text-base p-5 dark:text-[#f1f5f9]">
          A selection of my recent frontend development work. Each project
          highlights my skills in React, Next.js, and UI design.
        </p>
      </div>
      <ExpandableCardDemo/>
    </main>
  );
}
