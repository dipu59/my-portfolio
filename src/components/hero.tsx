"use client";
import React from "react";
import { FlipWords } from "./ui/flip-words";
import { HeroHighlight } from "./ui/hero-highlight";
import { motion } from "framer-motion";
import Image from "next/image";
import SocialFloat from "./socialMedia";
import { FaDownload } from "react-icons/fa";
import Link from "next/link";
const Hero = () => {
  const words = ["A Creative", "Full Stack", "Developer"];

  return (
    <HeroHighlight>
      <div
        id="hero"
        className="h-[70rem] md:h-[50rem]  pb-4 w-full rounded-md flex-col md:flex-row flex items-center md:justify-between  antialiased  relative overflow-hidden md:pt-20"
      >
        <div className=" p-4 flex flex-col items-center md:items-start justify-start   relative z-10 md:w-[70%] top-20 md:top-0 pt-20 md:pt-0">
          <motion.h1
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: [20, -10, 0],
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-4xl md:text-7xl font-bold max-w-2xl text-center md:text-left  bg-clip-text text-transparent bg-linear-to-b dark:from-neutral-50 dark:to-purple-400 from-neutral-900 to-blue-800  bg-opacity-50 font-heading! "
          >
            I&apos;m <span className="  cursor-pointer ">Dipu - </span> <br />{" "}
            <FlipWords words={words} className="md:text-8xl text-[55px] " />
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: [20, -10, 0],
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.3,
            }}
            className="
    my-4 py-5 px-5 max-w-lg
    text-lg md:text-xl font-normal font-body
    rounded-xl relative overflow-hidden

    text-neutral-700 dark:text-neutral-200

    /* glass gradient — darker & subtle */
    bg-linear-to-br
    from-white/70 to-white/40
    dark:from-slate-900/80 dark:to-slate-800/70

    backdrop-blur-md

    border border-neutral-200/60 dark:border-white/10

    shadow-lg shadow-neutral-300/30
    dark:shadow-black/40

    hover:-translate-y-0.5 hover:shadow-xl
    transition-all duration-300
  "
          >
            {/* soft dot texture */}
            <span
              className="
      absolute inset-0 opacity-[0.10] pointer-events-none
      bg-[radial-gradient(currentColor_1px,transparent_1px)]
      [background-size:18px_18px]
      text-neutral-500 dark:text-neutral-600
    "
            />

            {/* top inner shine */}
            <span className="absolute inset-x-0 top-0 h-px bg-white/70 dark:bg-white/10" />

            <span className="relative z-10">
              I build fast, scalable, SEO-friendly web apps that don’t just work
              — they perform. Using React, Next.js, Node.js, and modern web
              tech, I turn ideas into smooth, high-impact digital experiences
              people actually enjoy using.
            </span>
          </motion.p>
          <div className="pt-5 flex gap-3">
            <Link href={"/#contact"}>
              <motion.button
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                className="p-0.75 relative hidden md:flex cursor-pointer hover:rotate-6 transition-all duration-300 "
              >
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-[#6A00FF] dark:bg-black rounded-[10px] font-bold  relative group transition duration-300 text-white hover:bg-transparent dark:hover:bg-transparent">
                  Hire Me !
                </div>
              </motion.button>
            </Link>

            <motion.a
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                // type: "spring",
                // stiffness: 100,
                // damping: 10,
              }}
              href="/Resume.pdf"
              download="Dipu_Resume.pdf"
              className="md:flex hidden items-center text-gray-800 bg-gray-100 gap-2 px-5 py-2 rounded-lg border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition"
            >
              <FaDownload />
              Resume
            </motion.a>
          </div>
          <SocialFloat className="md:flex hidden mt-12 gap-4" />
        </div>

        {/* For Dark Mood */}
        <motion.div
          className="rounded-b-3xl mt-20 md:mt-0 dark:flex hidden justify-center justify-self-center items-center md:w-1/3 rotate-6 hover:rotate-0 transition-all duration-300 cursor-pointer md:mr-20 rounded-tl-[4rem] rounded-tr-3xl border border-purple-500 overflow-hidden h-auto mx-10 md:mx-0 "
          animate={{ y: [0, -23, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: [30, -20, 0],
            }}
            transition={{
              duration: 0.6,
            }}
            className=""
          >
            <Image
              src="/og-image.jpg"
              alt="hero"
              className="h-auto brightness-90"
              width={600}
              height={600}
            />
          </motion.div>
        </motion.div>

        {/* For Light Mood */}
        <motion.div
          animate={{ y: [0, -23, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.95 }}
          className="rounded-b-3xl hover:ring-4 mt-20 md:mt-0 flex dark:hidden justify-center justify-self-center items-center md:w-1/3 rotate-6 active:rotate-0 active:ring-4 ring-2 ring-purple-900 hover:rotate-0 transition-all duration-300 cursor-pointer md:mr-20 rounded-tl-[4rem] rounded-tr-3xl border border-purple-500 overflow-hidden h-auto mx-10 md:mx-0 shadow-2xl shadow-black/95 "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: [30, -20, 0],
            }}
            transition={{
              duration: 0.6,
            }}
            className=""
          >
            <Image
              src="/lightdipu.jpg"
              alt="hero"
              className="h-auto "
              width={600}
              height={600}
            />
          </motion.div>
        </motion.div>

        {/* For Mobile Responsive */}
        <div className="flex md:hidden flex-col px-4">
          {/* <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="mt-4 font-normal py-5  md:text-lg text-base text-neutral-600 dark:text-neutral-300 max-w-lg "
          >
            I build sleek, responsive, and user-first web interfaces with React,
            Next.js, and a touch of creative madness. Turning pixels into smooth
            experiences—one component at a time.
          </motion.p> */}
          <div className="pt-5 flex gap-3">
            <button className="p-0.75 relative  cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[10px] font-bold  relative group transition duration-300 text-white hover:bg-transparent">
                Hire Me !
              </div>
            </button>
            <motion.a
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                // type: "spring",
                // stiffness: 100,
                // damping: 10,
              }}
              href="/Resume.pdf"
              download="Dipu_Resume.pdf"
              className="flex md:hidden items-center text-gray-800 bg-gray-100 gap-2 px-5 py-2 rounded-lg border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition"
            >
              <FaDownload />
              Resume
            </motion.a>
          </div>
          <SocialFloat className="flex md:hidden mt-10 gap-4 justify-center items-center py-4" />
        </div>
      </div>
    </HeroHighlight>
  );
};

export default Hero;
