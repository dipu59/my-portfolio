import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
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

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Dipu Biswas – Full Stack Developer | React, Next.js, Node.js Expert",
  description:
    "Dipu Biswas is a Full Stack Developer from Balagarh, Hooghly, serving Kolkata and nearby areas.Specializing in React, Next.js, Node.js, and modern web technologies. Building fast, SEO-friendly, and scalable web applications.",

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
        className={`${geistSans.variable} ${geistMono.variable}${inter.variable}${space.variable} antialiased `}
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
