import { ExpandableCardDemo } from "./workscard";

export default function Works() {
  return (
    <main
      id="works"
      className="h-auto w-full dark:bg-linear-to-br dark:from-[#0f0715] dark:via-[#1a0f25] dark:to-[#2a1b3d] bg-linear-to-br from-[#fdfbfb] to-[#ebedee] "
    >
      <div>
        <h1 className="text-4xl md:text-7xl font-bold md:pt-40  text-center bg-clip-text text-transparent bg-linear-to-l dark:from-neutral-50 dark:to-purple-800 from-purple-900 to-purple-800  bg-opacity-50 pt-32 font-heading! md:p-4 ">
          Work I’ve Done So Far
        </h1>
        <p className="max-w-2xl font-medium mx-auto text-center text-[#4b5563] md:text-lg text-base p-5 dark:text-neutral-300! font-body!">
          Explore some of my recent frontend projects where I build fast,
          responsive, and user-friendly web applications using React, Next.js,
          and modern web technologies.
        </p>
      </div>
      <ExpandableCardDemo />
    </main>
  );
}
