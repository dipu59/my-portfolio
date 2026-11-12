import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
// @ts-expect-error - CSS side-effect import is handled by the build pipeline and not typed in this project
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { LoadingScreen } from "../components/LoadingScreen";
import { CyberLayout } from "../components/CyberLayout";
import { config } from "@fortawesome/fontawesome-svg-core";
// @ts-expect-error - CSS side-effect import is handled by the build pipeline and not typed in this project
import "@fortawesome/fontawesome-svg-core/styles.css";
import { defaultMetadata, personJsonLd } from "../seo/config";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://kit.fontawesome.com/6a41dd5244.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-black text-white`}
      >
        <LoadingScreen />
        <Navbar />
        <CyberLayout>
          {children}
        </CyberLayout>
      </body>
    </html>
  );
}
