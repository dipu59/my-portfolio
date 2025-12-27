"use client"
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { FloatingNavDemo } from "@/components/navbar";
import Skill from "@/components/skills";
import Works from "@/components/works";

export default function Home() {

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
