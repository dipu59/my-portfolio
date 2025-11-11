import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

const icons = [
  {
    name: "Twitter",
    icon: <FaLinkedin />,
    link: `https://in.linkedin.com/in/dipu-biswas-b0b06a381`,
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    link: "https://www.facebook.com/profile.php?id=61579129246227",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/its__dipu59/",
  },
  { name: "Github", icon: <FaGithub />, link: "https://github.com/dipu59" },
  {
    name: "Twitter",
    icon: <FaWhatsapp />,
    link: "https://wa.me/919239005171?text=Hey%20there%20👋",
  },
];

export default function SocialFloat({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      {icons.map((item, i) => (
        <motion.a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="text-3xl text-white dark:bg-[#1a012b] bg-[#4f1979] p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-[1.3] hover:rotate-[10deg] hover:bg-[#6711a7] dark:hover:bg-[#6711a7] hover:shadow-[0px_0px_20px_6px_rgba(103,17,167,0.6)]"
          animate={{ y: [0, -21, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {item.icon}
        </motion.a>
      ))}
    </div>
  );
}
