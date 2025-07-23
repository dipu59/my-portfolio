"use client";
import React from "react";
import { FlipWords } from "./ui/flip-words";
import { HeroHighlight } from "./ui/hero-highlight";
import { motion } from "framer-motion";
import Image from "next/image";
const Hero = () => {
  const words = ["A Creative", "Frontend", "Developer"];

  return (
    <HeroHighlight >
      <div id="hero" className="h-[60rem] md:h-[45rem] pb-4 w-full rounded-md flex-col md:flex-row flex items-center md:justify-between  antialiased  relative overflow-hidden md:pt-20">
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
            className="text-4xl md:text-7xl font-bold max-w-2xl text-center md:text-left  bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-purple-400 from-neutral-900 to-blue-800  bg-opacity-50"
          >
            I&apos;m <span className="  cursor-pointer">Dipu</span> <br />{" "}
            <FlipWords words={words} className="md:text-8xl text-[55px] " />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 1,
            }}
            className="mt-4 font-normal py-5 hidden md:flex md:text-lg text-base text-neutral-600 dark:text-neutral-300 max-w-lg "
          >
            &quot;I build sleek, responsive, and user-first web interfaces with
            React, Next.js, and a touch of creative madness. Turning pixels into
            smooth experiences—one component at a time.&quot;
          </motion.p>
          <div className="pt-5">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="p-[3px] relative hidden md:flex cursor-pointer hover:rotate-6 transition-all duration-300 "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[10px] font-bold  relative group transition duration-300 text-white hover:bg-transparent">
                Hire Me !
              </div>
            </motion.button>
          </div>
        </div>

        {/* For Dark Mood */}
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
          className="rounded-b-3xl mt-20 md:mt-0 dark:flex hidden justify-center justify-self-center items-center md:w-1/3 rotate-6 hover:rotate-0 transition-all duration-300 cursor-pointer md:mr-20 rounded-tl-[4rem] rounded-tr-3xl border border-purple-500 overflow-hidden h-auto mx-10 md:mx-0 "
        >
          <Image
            src="/dipu.jpg"
            alt="hero"
            className="h-auto"
            width={600}
            height={600}
          />
        </motion.div>

        {/* For Light Mood */}
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
          className="rounded-b-3xl hover:ring-4 mt-20 md:mt-0 flex dark:hidden justify-center justify-self-center items-center md:w-1/3 rotate-6 active:rotate-0 active:ring-4 ring-2 ring-purple-900 hover:rotate-0 transition-all duration-300 cursor-pointer md:mr-20 rounded-tl-[4rem] rounded-tr-3xl border border-purple-500 overflow-hidden h-auto mx-10 md:mx-0 shadow-2xl shadow-black/95"
        >
          <Image
            src="/lightdipu.jpg"
            alt="hero"
            className="h-auto"
            width={600}
            height={600}
          />
        </motion.div>

        {/* For Mobile Responsive */}
        <div className="flex md:hidden flex-col px-4">
          <motion.p
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
            &quot;I build sleek, responsive, and user-first web interfaces with
            React, Next.js, and a touch of creative madness. Turning pixels into
            smooth experiences—one component at a time.&quot;
          </motion.p>
          <div className="pt-5">
            <button className="p-[3px] relative  cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[10px] font-bold  relative group transition duration-300 text-white hover:bg-transparent">
                Hire Me !
              </div>
            </button>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default Hero;
