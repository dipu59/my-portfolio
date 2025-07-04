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
        {/* <Skills/> */}
      </main>
    </>
  );
}
