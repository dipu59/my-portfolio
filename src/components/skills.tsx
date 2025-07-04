import Image from "next/image";
import React from "react";

export default function Skill() {
  return (
    <div className="dark:bg-[#0d0b14] bg-[#f2eefc] py-32">
      <h1 className="text-4xl md:text-7xl font-bold   text-center bg-clip-text text-transparent bg-gradient-to-l dark:from-neutral-50 dark:to-purple-800 from-purple-900 to-purple-800  bg-opacity-50 ">
        My Skills
      </h1>
      <p className="max-w-2xl font-medium mx-auto text-center text-[#4b5563] md:text-lg text-base p-5 dark:text-[#f1f5f9]">
        Here are the technologies and tools I work with to build modern,
        responsive, and user-friendly web applications.
      </p>

      {/* grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 */}
      {/* Core Web Tech */}
      <h3 className="py-3 mt-10 bg-clip-text text-transparent bg-gradient-to-l dark:from-white dark:to-indigo-600 from-purple-900 to-purple-800  bg-opacity-50  text-center text-2xl font-semibold">
        Core Web Tech
      </h3>
      <div className=" flex flex-wrap max-w-[1100px] mx-auto justify-center gap-5 items-center">
        {SkillInfo.slice(0, 3).map((items, index) => (
          <div key={index}>
            <div className="w-[170px] group transition-all duration-500 cursor-pointer  h-[170px] dark:hover:bg-[#8750F7]/30 hover:bg-[#8750F7]/30 dark:bg-[#140c1c] rounded-2xl hover:border hover:border-[#8750F7]/60 flex flex-col bg-[#f1effa] shadow-md justify-center items-center ">
              <Image
                src={items.path}
                width={62}
                height={62}
                alt="jslogo"
                className="rounded-lg saturate-0 group-hover:saturate-100 group-hover:scale-110 transition-all duration-500 "
              />
              <p className="text-[#8750F7]  saturate-0 group-hover:saturate-100 font-semibold pt-3 text-base md:text-lg transition-all duration-500">
                {items.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*  CSS Frameworks & Preprocessors */}
      <h3 className="pt-6 py-4 bg-clip-text text-transparent bg-gradient-to-l dark:from-white dark:to-indigo-600 from-purple-900 to-purple-800  bg-opacity-50  text-center text-2xl font-semibold">
        CSS Frameworks & Preprocessors
      </h3>
      <div className=" flex flex-wrap max-w-[1100px] mx-auto justify-center gap-5 items-center">
        {SkillInfo.slice(4, 12).map((items, index) => (
          <div key={index}>
            <div className="w-[170px] group transition-all duration-500 cursor-pointer  h-[170px] dark:hover:bg-[#8750F7]/30 hover:bg-[#8750F7]/30 dark:bg-[#140c1c] rounded-2xl hover:border hover:border-[#8750F7]/60 flex flex-col bg-[#f1effa] shadow-md justify-center items-center">
              <Image
                src={items.path}
                width={62}
                height={62}
                alt="jslogo"
                className="rounded-lg saturate-0 group-hover:saturate-100 group-hover:scale-110 transition-all duration-500 "
              />
              <p className="text-[#8750F7]  saturate-0 group-hover:saturate-100 font-semibold pt-3 text-base md:text-lg transition-all duration-500">
                {items.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*  JavaScript Frameworks & Libraries */}
      <h3 className="pt-6 py-4 bg-clip-text text-transparent bg-gradient-to-l dark:from-white dark:to-indigo-600 from-purple-900 to-purple-800  bg-opacity-50  text-center text-2xl font-semibold">
        JavaScript Frameworks & Libraries
      </h3>
      <div className=" flex flex-wrap max-w-[1100px] mx-auto justify-center gap-5 items-center">
        {SkillInfo.slice(11, 13).map((items, index) => (
          <div key={index}>
            <div className="w-[170px] group transition-all duration-500 cursor-pointer  h-[170px] dark:hover:bg-[#8750F7]/30 hover:bg-[#8750F7]/30 dark:bg-[#140c1c] rounded-2xl hover:border hover:border-[#8750F7]/60 flex flex-col bg-[#f1effa] shadow-md justify-center items-center">
              <Image
                src={items.path}
                width={62}
                height={62}
                alt="jslogo"
                className="rounded-lg saturate-0 group-hover:saturate-100 group-hover:scale-110 transition-all duration-500 "
              />
              <p className="text-[#8750F7]  saturate-0 group-hover:saturate-100 font-semibold pt-3 text-base md:text-lg transition-all duration-500">
                {items.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tools & Version Control */}
      <h3 className="pt-6 py-4 bg-clip-text text-transparent bg-gradient-to-l dark:from-white dark:to-[#8750F7] from-purple-900 to-purple-800  bg-opacity-50  text-center text-2xl md:text-2xl font-semibold">
        Tools & Version Control
      </h3>
      <div className=" flex flex-wrap max-w-[1100px] mx-auto justify-center gap-5 items-center">
        {SkillInfo.slice(13, 14).map((items, index) => (
          <div key={index}>
            <div className="w-[170px] group transition-all duration-500 cursor-pointer  h-[170px] dark:hover:bg-[#8750F7]/30 hover:bg-[#8750F7]/30 dark:bg-[#140c1c] rounded-2xl hover:border hover:border-[#8750F7]/60 flex flex-col bg-[#f1effa] shadow-md justify-center items-center">
              <Image
                src={items.path}
                width={62}
                height={62}
                alt="jslogo"
                className="rounded-lg saturate-0 group-hover:saturate-100 group-hover:scale-110 transition-all duration-500 "
              />
              <p className="text-[#8750F7]  saturate-0 group-hover:saturate-100 font-semibold pt-3 text-base md:text-lg transition-all duration-500">
                {items.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SkillInfo = [
  // Core Web Tech 0-3
  {
    id: 1,
    path: "/htmllogo.webp",
    name: "HTML 5",
  },
  {
    id: 2,
    path: "/css3.png",
    name: "CSS 3",
  },
  {
    id: 3,
    path: "/jslogo.svg",
    name: "JavaScript",
  },
  {
    id: 4,
    path: "/tslogo.svg",
    name: "TypeScript",
  },
  //CSS Frameworks & Preprocessors 4-9
  {
    id: 5,
    path: "/tailwind.svg",
    name: "Tailwind CSS",
  },
  {
    id: 5,
    path: "/sasslogo.svg",
    name: "SASS",
  },
  {
    id: 6,
    path: "/bootstrap.svg",
    name: "Bootstrap 5",
  },
  {
    id: 7,
    path: "/mui.svg",
    name: "Material UI",
  },
  {
    id: 8,
    path: "/shadcn.jpg",
    name: "Shadcn UI",
  },
  {
    id: 9,
    path: "/shadcn.jpg",
    name: "Hero UI",
  },
  {
    id: 10,
    path: "/aceternity.png",
    name: "Aceternity UI",
  },
  //JavaScript Frameworks & Libraries 10-11
  {
    id: 11,
    path: "/reactlogo.svg",
    name: "React JS",
  },
  {
    id: 12,
    path: "/nextlogo.svg",
    name: "Next JS",
  },
  //Tools & Version Control 12
  {
    id: 13,
    path: "/gitlogo.svg",
    name: "Git",
  },
];
