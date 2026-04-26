import type { Metadata } from "next";
import { AboutPageContent } from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Dipu Biswas, a full-stack developer building fast, premium web experiences with Next.js, React, TypeScript, and Node.js.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
