"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuHeart,
  LuShare2,
  LuCheck,
  LuMapPin,
} from "react-icons/lu";
import { ZoomableImage } from "./ZoomableImage";
import { InstagramVerifiedBadge } from "./InstagramVerifiedBadge";
import { GalleryPhoto } from "@/data/galleryPhotos";

interface InstagramModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  likes: number;
  isLiked: boolean;
  onToggleLike: (photoId: string) => void;
}

export function InstagramModal({
  photo,
  onClose,
  onNext,
  onPrev,
  likes,
  isLiked,
  onToggleLike,
}: InstagramModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  // Lock body scroll and setup keyboard shortcuts
  useEffect(() => {
    if (!photo) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  const handleDoubleTap = () => {
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
    if (!isLiked) {
      onToggleLike(photo.id);
    }
  };

  const handleLikeClick = () => {
    if (!isLiked) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
    onToggleLike(photo.id);
  };

  const handleCopyShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 sm:bg-black/90 sm:backdrop-blur-md sm:p-4 md:p-6">
        {/* Backdrop click to close (desktop) */}
        <div
          onClick={onClose}
          className="absolute inset-0 hidden sm:block"
          aria-hidden="true"
        />

        {/* Previous Button (Desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="hidden sm:flex absolute left-4 z-50 p-3 rounded-full bg-black/70 border border-[#1a2235] text-neutral-300 hover:text-white hover:border-[#1558C9] hover:scale-105 transition-all shadow-xl"
        >
          <LuChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Button (Desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="hidden sm:flex absolute right-4 z-50 p-3 rounded-full bg-black/70 border border-[#1a2235] text-neutral-300 hover:text-white hover:border-[#1558C9] hover:scale-105 transition-all shadow-xl"
        >
          <LuChevronRight className="h-6 w-6" />
        </button>

        {/* Close Button Top (Desktop) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="hidden sm:flex absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/70 border border-[#1a2235] text-neutral-300 hover:text-white hover:bg-[#1a2235] transition-all"
        >
          <LuX className="h-6 w-6" />
        </button>

        {/* Modal Container: Fullscreen on mobile, centered card on tablet/desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-40 w-full h-full sm:h-[86vh] sm:max-h-[780px] sm:max-w-4xl sm:rounded-2xl overflow-hidden border-0 sm:border sm:border-[#1a2235] bg-[#030407] shadow-2xl flex flex-col"
        >
          {/* ── Top Bar: Instagram Profile Header ───────────────────────── */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a2235] bg-[#030407] shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[#1a2235]">
                <Image
                  src="/og-image.webp"
                  alt="Dipu Biswas"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    dipu_biswas
                  </span>
                  <InstagramVerifiedBadge className="h-3.5 w-3.5 shrink-0" />
                </div>
                {photo.location && (
                  <p className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <LuMapPin className="h-3 w-3 text-[#1558C9]" />
                    <span>{photo.location}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyShare}
                aria-label="Share photo"
                className="p-2 text-neutral-400 hover:text-white transition-colors relative"
              >
                {copiedLink ? (
                  <LuCheck className="h-4 w-4 text-[#D4FF24]" />
                ) : (
                  <LuShare2 className="h-4 w-4" />
                )}
                {copiedLink && (
                  <span className="absolute -top-6 right-0 font-mono text-[9px] bg-black px-2 py-0.5 rounded border border-[#1a2235] text-[#D4FF24] whitespace-nowrap shadow-lg">
                    Copied
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ── Center: Zoomable Photo Container ────────────────────────── */}
          <div className="relative flex-1 min-h-0 w-full bg-black flex items-center justify-center overflow-hidden">
            <ZoomableImage
              src={photo.src}
              alt={photo.alt}
              onDoubleTapHeart={handleDoubleTap}
              showHeartAnim={showHeartBurst}
            />
          </div>

          {/* ── Bottom Section: Action & Caption ────────────────────────── */}
          <div className="px-4 py-3 sm:py-4 border-t border-[#1a2235] bg-[#030407] shrink-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={handleLikeClick}
                  aria-label="Like photo"
                  className="focus:outline-none"
                >
                  <LuHeart
                    className={`h-6 w-6 transition-all duration-200 ${
                      isLiked
                        ? "text-rose-500 fill-rose-500 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                        : "text-neutral-300 hover:text-white"
                    }`}
                  />
                </motion.button>
                <span className="font-semibold text-xs sm:text-sm text-white">
                  {likes} {likes === 1 ? "like" : "likes"}
                </span>
              </div>

              {photo.date && (
                <span className="font-mono text-[10px] text-neutral-500">
                  {photo.date}
                </span>
              )}
            </div>

            {/* Caption */}
            <div className="text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold text-white mr-1.5">
                dipu_biswas
              </span>
              <span className="text-neutral-300">{photo.caption}</span>
            </div>

            {/* Tags */}
            {photo.tags && photo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-[#1558C9]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
