import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery // Dipu Biswas — Developer & Visual Feed",
  description:
    "An Instagram-inspired developer photo feed showcasing behind-the-scenes engineering, shipped projects, and lifestyle moments. Tap any photo to zoom, like, and comment.",
  openGraph: {
    title: "Gallery // Dipu Biswas",
    description:
      "Interactive visual feed of projects, workspace, and engineering journey. Double-tap to zoom and like.",
    images: ["/dipubiswas.jpg"],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
