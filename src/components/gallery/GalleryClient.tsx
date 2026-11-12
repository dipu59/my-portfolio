"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuHeart,
  LuMessageCircle,
  LuLayoutGrid,
  LuLayers,
  LuUser,
  LuExternalLink,
  LuShare2,
  LuCheck,
  LuMapPin,
  LuSparkles,
  LuZoomIn,
} from "react-icons/lu";
import { GALLERY_PHOTOS, GalleryPhoto } from "@/data/galleryPhotos";
import { InstagramModal } from "./InstagramModal";
import { CommentItem } from "@/lib/galleryStorage";
import { Footer } from "@/components/Footer";

interface PhotoInteractionState {
  likes: number;
  comments: CommentItem[];
  isLiked: boolean;
}

export function GalleryClient() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"all" | "projects" | "dev">("all");
  const [copiedProfile, setCopiedProfile] = useState(false);
  const [clientId, setClientId] = useState<string>("anonymous");

  // Interaction state dictionary
  const [interactions, setInteractions] = useState<
    Record<string, PhotoInteractionState>
  >(() => {
    // Initial fallback data
    const initial: Record<string, PhotoInteractionState> = {};
    GALLERY_PHOTOS.forEach((photo, idx) => {
      initial[photo.id] = {
        likes: 30 + idx * 5,
        comments: [],
        isLiked: false,
      };
    });
    return initial;
  });

  // Setup unique Client ID & fetch persisted interactions from API
  useEffect(() => {
    let cid = "anonymous";
    if (typeof window !== "undefined") {
      let savedCid = localStorage.getItem("gallery_client_id");
      if (!savedCid) {
        savedCid = `client_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem("gallery_client_id", savedCid);
      }
      cid = savedCid;
      setClientId(savedCid);
    }

    // Fetch initial database records
    async function loadData() {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (json?.data) {
          const map: Record<string, PhotoInteractionState> = {};
          Object.keys(json.data).forEach((photoId) => {
            const item = json.data[photoId];
            const likedBy = Array.isArray(item.likedBy) ? item.likedBy : [];
            map[photoId] = {
              likes: typeof item.likes === "number" ? item.likes : 0,
              comments: Array.isArray(item.comments) ? item.comments : [],
              isLiked: likedBy.includes(cid),
            };
          });
          setInteractions((prev) => ({ ...prev, ...map }));
        }
      } catch (err) {
        console.warn("Could not load gallery interactions, using local state:", err);
      }
    }
    loadData();
  }, []);

  // Filtered photos based on active tab
  const filteredPhotos = useMemo(() => {
    if (activeTab === "projects") {
      return GALLERY_PHOTOS.filter((p) => p.tags?.includes("project"));
    }
    if (activeTab === "dev") {
      return GALLERY_PHOTOS.filter(
        (p) => p.tags?.includes("developer") || p.tags?.includes("life")
      );
    }
    return GALLERY_PHOTOS;
  }, [activeTab]);

  // Total likes counter for profile stats
  const totalLikes = useMemo(() => {
    return Object.values(interactions).reduce((acc, curr) => acc + curr.likes, 0);
  }, [interactions]);

  // Selected photo for modal
  const selectedPhoto =
    selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null;

  const handleOpenPhoto = (photo: GalleryPhoto) => {
    const idx = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
    if (idx !== -1) {
      setSelectedPhotoIndex(idx);
    }
  };

  const handleCloseModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const handleNextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % GALLERY_PHOTOS.length;
    });
  }, []);

  const handlePrevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    });
  }, []);

  // Toggle Like Handler
  const handleToggleLike = async (photoId: string) => {
    const current = interactions[photoId] || {
      likes: 0,
      comments: [],
      isLiked: false,
    };
    const nextIsLiked = !current.isLiked;
    const nextLikes = nextIsLiked
      ? current.likes + 1
      : Math.max(0, current.likes - 1);

    // Optimistic update
    setInteractions((prev) => ({
      ...prev,
      [photoId]: {
        ...current,
        likes: nextLikes,
        isLiked: nextIsLiked,
      },
    }));

    try {
      const res = await fetch(`/api/gallery/${photoId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      });
      if (res.ok) {
        const json = await res.json();
        setInteractions((prev) => ({
          ...prev,
          [photoId]: {
            ...prev[photoId],
            likes: json.likes,
            isLiked: json.isLiked,
          },
        }));
      }
    } catch (err) {
      console.error("Failed to sync like with server:", err);
    }
  };

  // Add Comment Handler
  const handleAddComment = async (
    photoId: string,
    author: string,
    text: string
  ) => {
    const tempId = `temp_${Date.now()}`;
    const optimisticComment: CommentItem = {
      id: tempId,
      author,
      text,
      createdAt: new Date().toISOString(),
    };

    // Optimistic comment
    setInteractions((prev) => {
      const cur = prev[photoId] || { likes: 0, comments: [], isLiked: false };
      return {
        ...prev,
        [photoId]: {
          ...cur,
          comments: [...cur.comments, optimisticComment],
        },
      };
    });

    try {
      const res = await fetch(`/api/gallery/${photoId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, text }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.comments) {
          setInteractions((prev) => ({
            ...prev,
            [photoId]: {
              ...prev[photoId],
              comments: json.comments,
            },
          }));
        }
      }
    } catch (err) {
      console.error("Failed to sync comment with server:", err);
    }
  };

  // Copy Profile Link
  const handleCopyProfile = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopiedProfile(true);
      setTimeout(() => setCopiedProfile(false), 2000);
    } catch {
      setCopiedProfile(true);
      setTimeout(() => setCopiedProfile(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#030407] text-white pt-24 pb-16">
      {/* ── Top Container ───────────────────────────────────────────────── */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">

        {/* ════════════════════════════════════════════════════════════════
            INSTAGRAM PROFILE HEADER
            ════════════════════════════════════════════════════════════════ */}
        <section aria-label="Profile Header" className="pb-8 border-b border-[#1a2235]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            {/* Story Avatar */}
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <div className="relative p-1 rounded-full bg-linear-to-tr from-[#1558C9] via-[#D4FF24] to-[#1558C9] animate-gradient shadow-[0_0_24px_rgba(21,88,201,0.3)]">
                <div className="relative h-20 w-20 sm:h-28 sm:w-28 rounded-full overflow-hidden border-2 border-[#030407] bg-[#0a0d14]">
                  <Image
                    src="/og-image.webp"
                    alt="Dipu Biswas Profile"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-[#1558C9] border-2 border-[#030407] flex items-center justify-center text-[10px] text-white font-bold">
                ✓
              </span>
            </div>

            {/* Profile Information & Actions */}
            <div className="flex-1 space-y-4 w-full">
              {/* Username row */}
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    dipu_biswas
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#D4FF24] bg-[#D4FF24]/10 border border-[#D4FF24]/30">
                    VERIFIED DEV
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/dipu59"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#1a2235] bg-[#0a0d14] text-xs font-semibold text-white hover:border-[#1558C9] hover:bg-[#1558C9]/15 transition-all"
                  >
                    <span>Follow</span>
                    <LuExternalLink className="h-3 w-3 text-[#D4FF24]" />
                  </a>

                  <Link
                    href="/#contact"
                    className="px-3.5 py-1.5 rounded-lg bg-[#1558C9] text-xs font-semibold text-white hover:bg-[#1558C9]/90 hover:shadow-[0_0_16px_rgba(21,88,201,0.5)] transition-all"
                  >
                    Message
                  </Link>

                  <button
                    type="button"
                    onClick={handleCopyProfile}
                    aria-label="Share profile"
                    className="p-2 rounded-lg border border-[#1a2235] bg-[#0a0d14] text-neutral-300 hover:text-white hover:border-[#1a2235] transition-colors relative"
                  >
                    {copiedProfile ? (
                      <LuCheck className="h-4 w-4 text-[#D4FF24]" />
                    ) : (
                      <LuShare2 className="h-4 w-4" />
                    )}
                    {copiedProfile && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[9px] bg-black px-2 py-0.5 rounded border border-[#1a2235] text-[#D4FF24] whitespace-nowrap shadow-lg">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-white">
                    {GALLERY_PHOTOS.length}
                  </span>{" "}
                  <span className="text-neutral-400">posts</span>
                </div>
                <div>
                  <span className="font-bold text-white">{totalLikes}</span>{" "}
                  <span className="text-neutral-400">likes</span>
                </div>
                <div>
                  <span className="font-bold text-[#D4FF24]">Active</span>{" "}
                  <span className="text-neutral-400">creator</span>
                </div>
              </div>

              {/* Bio & Links */}
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-semibold text-white">Dipu Biswas</p>
                <p className="text-neutral-300 leading-relaxed">
                  Full-Stack Software Developer 💻 Building high-performance web
                  systems with React, Next.js, and Node.js.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-400">
                  <div className="flex items-center gap-1">
                    <LuMapPin className="h-3 w-3 text-[#1558C9]" />
                    <span>Balagarh, West Bengal, India</span>
                  </div>
                  <span>•</span>
                  <a
                    href="https://github.com/dipu59"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[#D4FF24] hover:underline"
                  >
                    github.com/dipu59
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Story Highlights ────────────────────────────────────────── */}
          <div className="flex items-center gap-4 sm:gap-6 pt-6 overflow-x-auto no-scrollbar">
            {[
              { label: "Chill-Bay", img: "/projects/chillbay.png" },
              { label: "My Pay", img: "/projects/mypay.png" },
              { label: "Motion", img: "/projects/disesters.png" },
              { label: "Analytics", img: "/projects/restrurent.webp" },
              { label: "Workspace", img: "/dipubiswas.jpg" },
            ].map((story) => (
              <div
                key={story.label}
                onClick={() => setActiveTab("all")}
                className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0"
              >
                <div className="p-0.5 rounded-full border border-[#1a2235] group-hover:border-[#1558C9] group-hover:scale-105 transition-all">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-[#0a0d14]">
                    <Image
                      src={story.img}
                      alt={story.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="font-mono text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                  {story.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CATEGORY TABS (POSTS, PROJECTS, LIFE)
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 border-b border-[#1a2235] mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 py-3.5 border-b-2 font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === "all"
                ? "border-[#D4FF24] text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <LuLayoutGrid className="h-4 w-4" />
            <span>All Posts ({GALLERY_PHOTOS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 py-3.5 border-b-2 font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === "projects"
                ? "border-[#1558C9] text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <LuLayers className="h-4 w-4" />
            <span>Project Shots (4)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dev")}
            className={`flex items-center gap-2 py-3.5 border-b-2 font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === "dev"
                ? "border-[#D4FF24] text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <LuUser className="h-4 w-4" />
            <span>Developer (4)</span>
          </button>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            INSTAGRAM 3-COLUMN PHOTO GRID
            ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {filteredPhotos.map((photo, index) => {
            const data = interactions[photo.id] || {
              likes: 0,
              comments: [],
              isLiked: false,
            };

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleOpenPhoto(photo)}
                className="group relative aspect-square w-full rounded-xl overflow-hidden bg-[#0a0d14] border border-[#1a2235] cursor-pointer transform-gpu will-change-transform"
              >
                {/* Image */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Subtle border highlight on hover */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#1558C9]/60 transition-colors pointer-events-none z-10" />

                {/* Zoom Badge on Top Right */}
                <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs p-1.5 rounded-full border border-white/10 text-white shadow-md">
                  <LuZoomIn className="h-3.5 w-3.5 text-[#D4FF24]" />
                </div>

                {/* Instagram Hover Overlay (Dark Backdrop + Likes/Comments Count) */}
                <div className="absolute inset-0 z-10 bg-black/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 sm:gap-6 text-white select-none">
                  {/* Likes count */}
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                    <LuHeart
                      className={`h-4 sm:h-5 w-4 sm:w-5 ${
                        data.isLiked ? "text-rose-500 fill-rose-500" : "text-white fill-white"
                      }`}
                    />
                    <span>{data.likes}</span>
                  </div>

                  {/* Comments count */}
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                    <LuMessageCircle className="h-4 sm:h-5 w-4 sm:w-5 text-white fill-white" />
                    <span>{data.comments.length}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Callout ────────────────────────────────────────────── */}
        <div className="mt-16 text-center py-10 border-t border-[#1a2235] space-y-3">
          <div className="inline-flex items-center gap-2">
            <LuSparkles className="h-4 w-4 text-[#D4FF24]" />
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Interactive Instagram-Grade Experience
            </p>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Tap any photo to view full resolution with pinch &amp; scroll zoom,
            double-tap to send hearts, and leave real-time comments.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          FULL-SCREEN INSTAGRAM ZOOM LIGHTBOX MODAL
          ════════════════════════════════════════════════════════════════ */}
      <InstagramModal
        photo={selectedPhoto}
        onClose={handleCloseModal}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        likes={selectedPhoto ? interactions[selectedPhoto.id]?.likes || 0 : 0}
        isLiked={
          selectedPhoto ? interactions[selectedPhoto.id]?.isLiked || false : false
        }
        comments={
          selectedPhoto ? interactions[selectedPhoto.id]?.comments || [] : []
        }
        onToggleLike={handleToggleLike}
        onAddComment={handleAddComment}
      />

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
