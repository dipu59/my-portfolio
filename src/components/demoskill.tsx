// components/Skills.tsx
"use client";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiBootstrap, SiSass } from "react-icons/si";

const skills = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> },
  { name: "SCSS", icon: <SiSass className="text-pink-400" /> },
  { name: "React JS", icon: <FaReact className="text-sky-500 animate-spin-slow" /> },
  { name: "Next JS", icon: <SiNextdotjs /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-gray-950 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">🚀 My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <p className="text-sm font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
