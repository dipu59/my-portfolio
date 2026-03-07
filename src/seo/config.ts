import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dipu-biswas-portfolio.com";

export const defaultMetadata: Metadata = {
  title: {
    default: "Dipu Biswas - Full Stack Web Developer",
    template: "%s | Dipu Biswas",
  },
  description:
    "Dipu Biswas is a full stack web developer specializing in modern, high-performance web applications, portfolio websites, and custom web solutions.",
  keywords: [
    "Dipu Biswas",
    "Dipu Biswas web developer",
    "Dipu Biswas software developer",
    "Dipu Biswas full stack developer",
    "Dipu Biswas portfolio",
    "Dipu Biswas India",
    "web developer",
    "full stack web developer",
    "frontend developer",
    "backend developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "JavaScript developer",
    "portfolio website developer",
    "freelance web developer",
    "modern web development",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Dipu Biswas - Full Stack Web Developer",
    description:
      "Full stack web developer building modern, fast, and SEO-friendly web applications.",
    url: siteUrl,
    siteName: "Dipu Biswas - Web Developer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipu Biswas - Full Stack Web Developer",
    description:
      "Full stack web developer building modern, fast, and SEO-friendly web applications.",
  },
  authors: [{ name: "Dipu Biswas" }],
  creator: "Dipu Biswas",
  publisher: "Dipu Biswas",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dipu Biswas",
  jobTitle: "Full Stack Web Developer",
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com", // replace with your real profile
    "https://github.com", // replace with your real profile
  ],
  description:
    "Full stack web developer specializing in modern, SEO-friendly web applications.",
};
