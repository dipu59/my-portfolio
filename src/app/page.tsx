"use client"
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { FloatingNavDemo } from "@/components/navbar";
import Skill from "@/components/skills";
import Works from "@/components/works";
// import Lenis from "lenis";
// import { useEffect } from "react";


export default function Home() {
    // useEffect(() => {
    //   const lenis = new Lenis({
    //     autoRaf: true,
    //     duration: 0,
    //   });

    //   lenis.on("scroll", (e) => {
    //     console.log(e);
    //   });
    // }, []);

  return (
    <>
      <main className="">
        <FloatingNavDemo />
        <Hero />
        <Works />
        <Skill />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
