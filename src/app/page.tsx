import Hero from "@/components/hero";
import { FloatingNavDemo } from "@/components/navbar";
import Works from "@/components/works";

export default function Home() {
  return (
    <>
      <main>
        <FloatingNavDemo />
        <Hero />
        <Works />
      </main>
    </>
  );
}
