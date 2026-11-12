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
    alt: "Dipu Biswas — Full-Stack Developer",
    caption: "Engineering production web applications with React, Next.js, and TypeScript.",
    location: "Balagarh, West Bengal",
    date: "2024",
    tags: ["software", "engineering", "workspace"],
    aspectRatio: "portrait",
  },
  {
    id: "photo-002",
    src: "/og-image.jpg",
    alt: "Developer Portrait",
    caption: "Focusing on performance optimization, clean architecture, and UI precision.",
    location: "West Bengal, India",
    date: "2024",
    tags: ["developer", "profile"],
    aspectRatio: "square",
  },
  {
    id: "photo-003",
    src: "/og-image2.jpg",
    alt: "Professional Portrait",
    caption: "Full-stack developer building scalable digital products and modern cloud services.",
    location: "India",
    date: "2024",
    tags: ["engineering", "systems"],
    aspectRatio: "portrait",
  },
  {
    id: "photo-004",
    src: "/projects/chillbay.png",
    alt: "Chill-Bay Collaboration Platform",
    caption: "Chill-Bay — Real-time team workspace with WebSocket sync and Redis state management.",
    location: "Remote",
    date: "2024",
    tags: ["nextjs", "socketio", "redis"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-005",
    src: "/projects/mypay.png",
    alt: "My Pay Fintech Application",
    caption: "My Pay — High-conversion digital checkout architecture integrated with Stripe primitives.",
    location: "Remote",
    date: "2024",
    tags: ["fintech", "stripe", "prisma"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-006",
    src: "/projects/disesters.png",
    alt: "Disester IO Motion System",
    caption: "Disester IO — Custom design system built with Framer Motion and 60 FPS compositor physics.",
    location: "Remote",
    date: "2024",
    tags: ["design-system", "motion", "ui"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-007",
    src: "/projects/restrurent.webp",
    alt: "Restaurant Feedback Intelligence",
    caption: "Restaurant Feedback — Real-time operational feedback capture with analytics dashboard.",
    location: "Remote",
    date: "2024",
    tags: ["saas", "postgresql", "dashboard"],
    aspectRatio: "landscape",
  },
  {
    id: "photo-008",
    src: "/og-image.webp",
    alt: "Developer Workspace Shot",
    caption: "Balancing elegant minimalist interfaces with robust backend infrastructure.",
    location: "Balagarh, India",
    date: "2024",
    tags: ["webdev", "architecture"],
    aspectRatio: "square",
  },
];
