import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dipu Biswas | Full Stack Developer",
  description:
    "Dipu Biswas – Full Stack Developer specializing in React, Next.js, Node.js, Express, and building scalable, performance-driven web applications.",

  verification: {
    google: "google8ddbe53d89cba937",
  },

  openGraph: {
    title: "Dipu Biswas | Full Stack Developer",
    description:
      "Portfolio of Dipu Biswas – Full Stack Developer building modern web apps.",
    url: "https://dipubiswas.vercel.app",
    siteName: "Dipu Biswas",
    images: [
      {
        url: "https://dipubiswas.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dipu Biswas - Full Stack Developer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dipu Biswas | Full Stack Developer",
    description:
      "Frontend & Full Stack Developer passionate about modern web technologies.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark " suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
