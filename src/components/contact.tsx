"use client"
import React from "react";
import Contactcard from "./contactcard";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { IconLocation, IconMail, IconPhoneCall } from "@tabler/icons-react";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // only animate once

  return (
    <BackgroundBeamsWithCollision>
      <div id="contact">
        <div className="flex py-20 flex-col md:flex-row justify-center h-[75rem] md:h-[50rem] max-w-[1400px] mx-auto items-center dark:bg-gradient-to-br dark:from-[#100718] dark:via-[#1a0f25c4] dark:to-[#2a1b3dc5] bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] ">
          <Contactcard />
          <div className=" flex flex-col justify-center my-10 md:my-0 items-center w-full h-auto">
            <div>
              {/* Phone */}
              <motion.div
                ref={ref}
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
                className="flex gap-4"
              >
                <div className=" bg-gradient-to-br h-14 w-14 from-purple-800 via-purple-900 to-zinc-800 p-4 rounded-full ">
                  <IconPhoneCall stroke={1.75} className="text-white" />
                </div>
                <div className="dark:text-gray-200 text-gray-800">
                  <h3 className="font-medium text-base">Phone</h3>
                  <p className="text-lg font-medium font-mono">+919239005171</p>
                </div>
              </motion.div>
              {/* Email */}
              <motion.div
                ref={ref}
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
                className="flex gap-4 mt-7"
              >
                <div className=" bg-gradient-to-br h-14 w-14 from-purple-800 via-purple-900 to-zinc-800 p-4 rounded-full ">
                  <IconMail stroke={1.75} className="text-white" />
                </div>
                <div className="dark:text-gray-200 text-gray-800">
                  <h3 className="font-medium text-base">Email</h3>
                  <p className="text-lg font-medium font-mono">
                    12biswasdipu@gmail.com
                  </p>
                </div>
              </motion.div>
              {/* Address */}
              <motion.div
                ref={ref}
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
                className="flex gap-4 mt-7"
              >
                <div className=" bg-gradient-to-br h-14 w-14 from-purple-800 via-purple-900 to-zinc-800 p-4 rounded-full ">
                  <IconLocation stroke={1.75} className="text-white" />
                </div>
                <div className="dark:text-gray-200 text-gray-800">
                  <h3 className="font-medium text-base">Address</h3>
                  <p className="text-lg font-medium font-mono">
                    Balagarh,Hoogly,West Bangal, India
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
