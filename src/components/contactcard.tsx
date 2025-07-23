"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";


export default function Contactcard() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false }); // only animate once
  
  return (
    <div className="w-full h-auto p-4">
      <motion.div
        ref={ref}
        initial={{ y: 140, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
        className="shadow-input mx-auto   max-w-md md:max-w-[34rem]  bg-[#ece6f9]
 p-8 my-4 rounded-2xl md:p-8 dark:bg-[#1a0f25] dark:border dark:border-[#2a1f3d] transition-color cursor-pointer "
      >
        <motion.h2
          ref={ref}
          initial={{ y: 140, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          className="text-4xl  md:text-5xl font-bold h-16  bg-clip-text text-transparent bg-gradient-to-l dark:from-neutral-50 dark:to-purple-800 from-purple-900 to-purple-800"
        >
          Let’s work together!
        </motion.h2>

        <p className="mt-4 text-sm md:text-base font-sans leading-tight font-medium  max-w-lg  text-neutral-600 dark:text-neutral-300">
          Contact with me for your advice and feedback or any other query. I
          will be happy to hear from you.7430012014
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
          </div>
          <div className="flex gap-2">
            {" "}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Phone Number</Label>
              <Input id="password" placeholder="0123456789" type="password" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <textarea
              placeholder="Message"
              className="h-40 dark:bg-zinc-900/90 w-full shadow bg-gray-50 p-3 rounded-2xl outline-0 border-0 active:border active:border-blue-400 hover:outline-1 hover:outline-blue-300"
            ></textarea>
          </LabelInputContainer>

          <motion.button
            ref={ref}
            initial={{ y: 120, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.7 }}
            className="group/btn relative block h-13 py-4 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Send Message &rarr;
            <BottomGradient />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
