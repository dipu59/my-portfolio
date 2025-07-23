"use client";

import React, { RefObject, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // ease: "easeInOut", // Use a valid string for easing
    },
  },
};

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // const ref = useRef();
  useOutsideClick(ref as RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[1100px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-950 sm:rounded-3xl overflow-y-scroll"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={1200}
                  height={900}
                  src={active.src}
                  alt={active.title}
                  quality={100}
                  className="w-full h-96 lg:h-[32rem] sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top overflow-auto"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    {/* Title Here */}
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 "
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Create card here */}
      <ul className="max-w-6xl py-12 px-4 md:px-0 mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-10">
        {cards.map((card, index) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0 }}
            layoutId={`card-${card.title}-${id}`}
            key={index}
            onClick={() => setActive(card)}
            className="md:p-8 group p-4 relative dark:hover:shadow-purple-500/20 inset-0 dark:hover:shadow-2xl  flex flex-col dark:hover:ring-4 dark:hover:ring-[#171220]  hover:bg-neutral-50 dark:bg-[#1a0f25] dark:border dark:border-[#2a1f3d] transition-color rounded-xl cursor-pointer bg-white shadow-md"
          >
            <div className="flex gap-4 flex-col h-96  w-full">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                className="h-full w-full"
              >
                <Image
                  width={550}
                  height={550}
                  src={card.src}
                  alt={card.title}
                  quality={100}
                  className="h-96 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 delay-150  absolute bottom-12 right-0 left-0 py-4 md:py-6  bg-gradient-to-r dark:from-purple-700 dark:to-purple-950 from-purple-700  rounded-xl w-[94%] mx-auto justify-center items-center md:items-start px-4 flex-col rounded-tl-4xl rounded-br-4xl">
                <motion.div className="">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-semibold text-white dark:text-neutral-200 text-center md:text-left text-base md:text-2xl "
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-200 dark:text-neutral-400 text-center md:text-left text-base"
                  >
                    {card.description}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// Cards Details
const cards = [
  {
    description: "Lana Del Rey",
    title: "Music Portfolio",
    src: "/musicSchool.png",
    ctaText: "Live Link",
    ctaLink: "https://music-s-portfolio.vercel.app/",
    content: () => {
      return (
        <>
          <p>
            I designed and developed a dynamic and user-friendly website for a
            local music school. The site showcases their courses, instructors,
            events options in a clean, engaging layout.
          </p>
          <h2 className="text-2xl text-gray-900 font-semibold">Technology</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Html{" "}
              <Image src="/htmllogo.webp" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              CSS
              <Image src="/css3.png" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              TypeScript
              <Image src="/tslogo.svg" width={22} height={22} alt="tslogo" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Tailwind CSS
              <Image
                src="/tailwind.svg"
                width={22}
                height={22}
                alt="tailwind"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Aceternity UI
              <Image
                src="/aceternity.png"
                width={22}
                height={22}
                alt="aceternity"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              Next JS
              <Image
                src="/nextlogo.svg"
                width={22}
                height={22}
                alt="nextlogo"
              />
            </li>
          </ul>
        </>
      );
    },
  },
  {
    description: "Babbu Maan",
    title: "AI Governing Docs",
    src: "/governing.png",
    ctaText: "Visit",
    ctaLink: "https://governing-docs-eight.vercel.app/",
    content: () => {
      return (
        <>
          <p>
            I built a clean, modern, and responsive single landing page for a
            government-related documentation portal. The main focus was clarity,
            simplicity, and trust — perfect for an official government site.
          </p>
          <h2 className="text-2xl text-gray-900 font-semibold">Technology</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Html{" "}
              <Image src="/htmllogo.webp" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              CSS
              <Image src="/css3.png" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              JavaScript
              <Image src="/jslogo.svg" width={22} height={22} alt="tslogo" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Tailwind CSS
              <Image
                src="/tailwind.svg"
                width={22}
                height={22}
                alt="tailwind"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              React JS
              <Image
                src="/reactlogo.svg"
                width={22}
                height={22}
                alt="nextlogo"
              />
            </li>
          </ul>
        </>
      );
    },
  },

  {
    description: "Metallica",
    title: "Finance Website",
    src: "/finance.png",
    ctaText: "Visit",
    ctaLink: "https://finance-website-dipu59.netlify.app/",
    content: () => {
      return (
        <>
          <p>
            {" "}
            I developed a clean and modern landing page for a finance company,
            focused on promoting financial services and building user trust. The
            site presents key offerings, company values, and client engagement
            elements in a professional layout.
          </p>
          <h2 className="text-2xl text-gray-900 font-semibold">Technology</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Html{" "}
              <Image src="/htmllogo.webp" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              CSS
              <Image src="/css3.png" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              JavaScript
              <Image src="/jslogo.svg" width={22} height={22} alt="tslogo" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Tailwind CSS
              <Image
                src="/tailwind.svg"
                width={22}
                height={22}
                alt="tailwind"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              React JS
              <Image
                src="/nextlogo.svg"
                width={22}
                height={22}
                alt="reactlogo"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              Famer Motion
            </li>
          </ul>
        </>
      );
    },
  },
  {
    description: "Lord57",
    title: "Car Business",
    src: "/carbusiness.png",
    ctaText: "Visit",
    ctaLink: "https://car-business-dipu59.netlify.app/",
    content: () => {
      return (
        <>
          <p>
            I created a sleek and professional landing page for a car
            dealership/business website. The design showcases car models,
            services, and business info in a clean and modern layout, optimized
            for user engagement and mobile responsiveness.
          </p>
          <h2 className="text-2xl text-gray-900 font-semibold">Technology</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Html{" "}
              <Image src="/htmllogo.webp" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              CSS
              <Image src="/css3.png" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              JavaScript
              <Image src="/jslogo.svg" width={22} height={22} alt="tslogo" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Tailwind CSS
              <Image
                src="/tailwind.svg"
                width={22}
                height={22}
                alt="tailwind"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Hero Ui
              <Image
                src="/aceternity.png"
                width={22}
                height={22}
                alt="aceternity"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              React JS
              <Image
                src="/reactlogo.svg"
                width={22}
                height={22}
                alt="nextlogo"
              />
            </li>
          </ul>
        </>
      );
    },
  },
  {
    description: "Lord53",
    title: "disears",
    src: "/disears.png",
    ctaText: "Visit",
    ctaLink: "https://disastersio-umber.vercel.app/",
    content: () => {
      return (
        <>
          <p>
            I designed and developed a disaster awareness landing page that
            delivers real-time emergency info in a clear and impactful layout.
            Built for high visibility and fast user understanding, this site is
            ideal for disaster management agencies or emergency services.
          </p>
          <h2 className="text-2xl text-gray-900 font-semibold">Technology</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Html{" "}
              <Image src="/htmllogo.webp" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              CSS
              <Image src="/css3.png" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              JavaScript
              <Image src="/jslogo.svg" width={22} height={22} alt="tslogo" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Tailwind CSS
              <Image
                src="/tailwind.svg"
                width={22}
                height={22}
                alt="tailwind"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Hero Ui
              <Image
                src="/aceternity.png"
                width={22}
                height={22}
                alt="aceternity"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              React JS
              <Image
                src="/reactlogo.svg"
                width={22}
                height={22}
                alt="nextlogo"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              Famer Motion
            </li>
          </ul>
        </>
      );
    },
  },
  {
    description: "Lord45",
    title: "wizias",
    src: "/wizias.png",
    ctaText: "Visit",
    ctaLink: "https://wizias-dipu.vercel.app/",
    content: () => {
      return (
        <>
          <p>
            I built a sleek and modern landing page for Wizias, a digital
            business/AI solution platform. The design focuses on minimalism,
            bold typography, and conversion-focused layout to highlight services
            and attract clients.
          </p>
          <h2 className="text-2xl text-gray-900 font-semibold">Technology</h2>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Html{" "}
              <Image src="/htmllogo.webp" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              CSS
              <Image src="/css3.png" width={22} height={22} alt="HTML" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              JavaScript
              <Image src="/jslogo.svg" width={22} height={22} alt="tslogo" />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all  items-center">
              Tailwind CSS
              <Image
                src="/tailwind.svg"
                width={22}
                height={22}
                alt="tailwind"
              />
            </li>
            <li className="flex gap-1 hover:text-blue-500 cursor-pointer transition-all items-center">
              React JS
              <Image
                src="/reactlogo.svg"
                width={22}
                height={22}
                alt="nextlogo"
              />
            </li>
          </ul>
        </>
      );
    },
  },
  {
    description: "Lord5",
    title: "itsupportlight",
    src: "/itsupportlight.png",
    ctaText: "Visit",
    ctaLink: "https://itsport-dipu59.netlify.app/",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
  {
    description: "Lord4",
    title: "creativs",
    src: "/creativs.png",
    ctaText: "Visit",
    ctaLink: "https://creatsforyou-dipu59.netlify.app/",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
  {
    description: "Lord3",
    title: "balancetraker",
    src: "/balancetraker.png",
    ctaText: "Visit",
    ctaLink: "https://balance-checker-dipu59.netlify.app/",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
  {
    description: "Lord2",
    title: "todo",
    src: "/todo.png",
    ctaText: "Visit",
    ctaLink: "https://todolist-dipu59.netlify.app/",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
  {
    description: "Lord1",
    title: "ticker",
    src: "/ticker.png",
    ctaText: "Visit",
    ctaLink: "https://tailwindcss-project-dipu59.netlify.app/",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
];
