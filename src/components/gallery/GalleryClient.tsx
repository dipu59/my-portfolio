"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuHeart,
  LuLayoutGrid,
  LuLayers,
  LuUser,
  LuExternalLink,
  LuShare2,
  LuCheck,
  LuMapPin,
  LuMail,
} from "react-icons/lu";
import { GALLERY_PHOTOS, GalleryPhoto } from "@/data/galleryPhotos";
import { InstagramModal } from "./InstagramModal";
import { InstagramVerifiedBadge } from "./InstagramVerifiedBadge";
import { Footer } from "@/components/Footer";

export function GalleryClient() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"all" | "projects" | "dev">("all");
  const [copiedProfile, setCopiedProfile] = useState(false);
  const [clientId, setClientId] = useState<string>("anonymous");

  // Interaction state dictionary: { likes, isLiked }
  const [interactions, setInteractions] = useState<
    Record<string, { likes: number; isLiked: boolean }>
  >(() => {
    const initial: Record<string, { likes: number; isLiked: boolean }> = {};
    GALLERY_PHOTOS.forEach((photo, idx) => {
      initial[photo.id] = {
        likes: 30 + idx * 5,
        isLiked: false,
      };
    });
    return initial;
  });

  // Client ID initialization & API sync
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

    async function loadData() {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (json?.data) {
          const map: Record<string, { likes: number; isLiked: boolean }> = {};
          Object.keys(json.data).forEach((photoId) => {
            const item = json.data[photoId];
            const likedBy = Array.isArray(item.likedBy) ? item.likedBy : [];
            map[photoId] = {
              likes: typeof item.likes === "number" ? item.likes : 0,
              isLiked: likedBy.includes(cid),
            };
          });
          setInteractions((prev) => ({ ...prev, ...map }));
        }
      } catch (err) {
        console.warn("Using local interaction state:", err);
      }
    }
    loadData();
  }, []);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    if (activeTab === "projects") {
      return GALLERY_PHOTOS.filter(
        (p) =>
          p.tags?.includes("nextjs") ||
          p.tags?.includes("fintech") ||
          p.tags?.includes("saas") ||
          p.tags?.includes("design-system")
      );
    }
    if (activeTab === "dev") {
      return GALLERY_PHOTOS.filter(
        (p) =>
          p.tags?.includes("developer") ||
          p.tags?.includes("profile") ||
          p.tags?.includes("engineering") ||
          p.tags?.includes("workspace")
      );
    }
    return GALLERY_PHOTOS;
  }, [activeTab]);

  // Total likes
  const totalLikes = useMemo(() => {
    return Object.values(interactions).reduce(
      (acc, curr) => acc + curr.likes,
      0
    );
  }, [interactions]);

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

  const handleToggleLike = async (photoId: string) => {
    const current = interactions[photoId] || {
      likes: 0,
      isLiked: false,
    };
    const nextIsLiked = !current.isLiked;
    const nextLikes = nextIsLiked
      ? current.likes + 1
      : Math.max(0, current.likes - 1);

    setInteractions((prev) => ({
      ...prev,
      [photoId]: {
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
            likes: json.likes,
            isLiked: json.isLiked,
          },
        }));
      }
    } catch (err) {
      console.error("Failed to sync like with server:", err);
    }
  };

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
    <div className="w-full min-h-screen bg-[#030407] text-white pt-20 sm:pt-24 pb-16">
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6">

        {/* ════════════════════════════════════════════════════════════════
            INSTAGRAM PROFILE HEADER (Stats right beside Avatar, No long gap)
            ════════════════════════════════════════════════════════════════ */}
        <section aria-label="Profile Header" className="pt-2 pb-6 border-b border-[#1a2235]">
          {/* Avatar on Left, Stats right beside it with tight, natural spacing */}
          <div className="flex items-center justify-start gap-6 sm:gap-10 md:gap-12">
            {/* Left: Avatar */}
            <div className="relative shrink-0">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full p-0.5 border-2 border-[#1558C9] bg-[#0a0d14]">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src="/og-image.webp"
                    alt="Dipu Biswas"
                    fill
                    priority
                    sizes="(max-width: 640px) 80px, 112px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Stats horizontally aligned beside the avatar */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-10 text-center sm:text-left">
              <div className="flex flex-col">
                <span className="font-bold text-[16px] sm:text-lg text-white">
                  {GALLERY_PHOTOS.length}
                </span>
                <span className="text-[11px] sm:text-xs text-neutral-400">
                  posts
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-[16px] sm:text-lg text-white">
                  {totalLikes}
                </span>
                <span className="text-[11px] sm:text-xs text-neutral-400">
                  likes
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-[16px] sm:text-lg text-[#D4FF24]">
                  Active
                </span>
                <span className="text-[11px] sm:text-xs text-neutral-400">
                  status
                </span>
              </div>
            </div>
          </div>

          {/* Bio Stack (Below Avatar & Stats with Instagram Verified Badge) */}
          <div className="mt-3.5 space-y-1 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-[16px]">
                Dipu Biswas
              </span>
              <InstagramVerifiedBadge className="h-4 w-4 shrink-0" />
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-xs">
                Software Developer
              </span>
            </div>

            <p className="text-neutral-300 leading-snug">
              Full-Stack Developer building scalable web applications with React, Next.js, and Node.js.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <LuMapPin className="h-3 w-3 text-[#1558C9]" />
                Balagarh, West Bengal
              </span>
              <span>•</span>
              <a
                href="https://github.com/dipu59"
                target="_blank"
                rel="noreferrer"
                className="text-[#D4FF24] hover:underline font-mono"
              >
                github.com/dipu59
              </a>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="mt-4 grid grid-cols-12 gap-2">
            <a
              href="https://github.com/dipu59"
              target="_blank"
              rel="noreferrer"
              className="col-span-5 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-[#1a2235] bg-[#0a0d14] text-xs font-semibold text-white hover:border-[#1558C9] hover:bg-[#1558C9]/15 transition-all text-center"
            >
              <span>GitHub</span>
              <LuExternalLink className="h-3 w-3 text-[#D4FF24]" />
            </a>

            <Link
              href="/#contact"
              className="col-span-5 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#1558C9] text-xs font-semibold text-white hover:bg-[#1558C9]/90 transition-all text-center"
            >
              <LuMail className="h-3.5 w-3.5" />
              <span>Contact</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyProfile}
              aria-label="Share profile"
              className="col-span-2 inline-flex items-center justify-center py-1.5 rounded-lg border border-[#1a2235] bg-[#0a0d14] text-neutral-300 hover:text-white transition-colors relative"
            >
              {copiedProfile ? (
                <LuCheck className="h-4 w-4 text-[#D4FF24]" />
              ) : (
                <LuShare2 className="h-4 w-4" />
              )}
              {copiedProfile && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[9px] bg-black px-2 py-0.5 rounded border border-[#1a2235] text-[#D4FF24] whitespace-nowrap shadow-lg">
                  Copied
                </span>
              )}
            </button>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CATEGORY TABS
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-around border-b border-[#1a2235]">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex items-center justify-center gap-1.5 py-3 border-b-2 font-mono text-xs uppercase tracking-wider transition-all flex-1 ${
              activeTab === "all"
                ? "border-[#D4FF24] text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <LuLayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">All Posts</span>
            <span className="sm:hidden">All</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`flex items-center justify-center gap-1.5 py-3 border-b-2 font-mono text-xs uppercase tracking-wider transition-all flex-1 ${
              activeTab === "projects"
                ? "border-[#1558C9] text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <LuLayers className="h-4 w-4" />
            <span>Projects</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dev")}
            className={`flex items-center justify-center gap-1.5 py-3 border-b-2 font-mono text-xs uppercase tracking-wider transition-all flex-1 ${
              activeTab === "dev"
                ? "border-[#D4FF24] text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <LuUser className="h-4 w-4" />
            <span className="hidden sm:inline">Portraits</span>
            <span className="sm:hidden">Photos</span>
          </button>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            INSTAGRAM 3-COLUMN SEAMLESS GRID (Mobile & Desktop)
            ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-3 gap-0.5 sm:gap-2 md:gap-3 py-1 sm:py-3">
          {filteredPhotos.map((photo, index) => {
            const data = interactions[photo.id] || {
              likes: 0,
              isLiked: false,
            };

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                }}
                onClick={() => handleOpenPhoto(photo)}
                className="group relative aspect-square w-full bg-[#0a0d14] cursor-pointer overflow-hidden select-none"
              >
                {/* Image */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 300px, 340px"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />

                {/* Instagram Hover / Active Overlay */}
                <div className="absolute inset-0 z-10 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-2 text-white">
                  <div className="flex items-center gap-1 font-semibold text-xs sm:text-sm">
                    <LuHeart
                      className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${
                        data.isLiked
                          ? "text-rose-500 fill-rose-500"
                          : "text-white fill-white"
                      }`}
                    />
                    <span>{data.likes}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
        onToggleLike={handleToggleLike}
      />

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
