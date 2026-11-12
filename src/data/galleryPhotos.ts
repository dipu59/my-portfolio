/**
 * galleryPhotos.ts — Photo Configuration for the Gallery Page
 * ─────────────────────────────────────────────────────────────
 * To add your own photos:
 *   1. Drop your images into /public/gallery/
 *   2. Add an entry below following the same shape.
 *
 * aspectRatio controls the grid cell height:
 *   "portrait"  → tall   (4:5)
 *   "square"    → square (1:1)
 *   "landscape" → wide   (16:9)
 */

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location?: string;
  date?: string;
  tags?: string[];
  aspectRatio: "portrait" | "square" | "landscape";
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-001",
    src: "/dipubiswas.jpg",
    alt: "Dipu Biswas",
    caption: "Building the future, one line at a time. 💻",
    location: "Balagarh, West Bengal",
    date: "2024",
    tags: ["dev", "code", "life"],
    aspectRatio: "portrait",
  },
  {
    id: "photo-002",
    src: "/og-image.jpg",
    alt: "Dipu Biswas — Developer Portrait",
    caption: "Always shipping. Always learning. 🚀",
    location: "West Bengal, India",
    date: "2024",
    tags: ["portfolio", "developer"],
    aspectRatio: "square",
  },
  {
    id: "photo-003",
    src: "/og-image2.jpg",
    alt: "Professional Shot",
    caption: "Full-stack engineer by day, problem solver by night. ⚡",
    location: "India",
    date: "2024",
    tags: ["professional", "developer"],
    aspectRatio: "portrait",
  },
  {
    id: "photo-004",
    src: "/projects/chillbay.png",
    alt: "Chill-Bay Project",
    caption: "Chill-Bay — Real-time collaboration done right. 🎯",
    location: "Built remotely",
    date: "2024",
    tags: ["project", "code", "realtime"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-005",
    src: "/projects/mypay.png",
    alt: "My Pay Project",
    caption: "My Pay — High-conversion fintech storefront. 💰",
    location: "Built remotely",
    date: "2024",
    tags: ["project", "fintech", "stripe"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-006",
    src: "/projects/disesters.png",
    alt: "Disester IO Project",
    caption: "Disester IO — Motion-first design system. ✨",
    location: "Built remotely",
    date: "2024",
    tags: ["design", "motion", "portfolio"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-007",
    src: "/projects/restrurent.webp",
    alt: "Restaurant Feedback System",
    caption: "Restaurant Feedback — Real-time sentiment analytics. 📊",
    location: "Built remotely",
    date: "2024",
    tags: ["project", "analytics", "fullstack"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-008",
    src: "/og-image.webp",
    alt: "Dipu Biswas — Webp",
    caption: "Crafting digital experiences that matter. 🎨",
    location: "Balagarh, India",
    date: "2024",
    tags: ["life", "developer", "creative"],
    aspectRatio: "square",
  },
];
