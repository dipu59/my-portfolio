"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuHeart,
  LuMessageCircle,
  LuShare2,
  LuBookmark,
  LuSend,
  LuCheck,
  LuMapPin,
  LuSparkles,
} from "react-icons/lu";
import { ZoomableImage } from "./ZoomableImage";
import { GalleryPhoto } from "@/data/galleryPhotos";
import { CommentItem } from "@/lib/galleryStorage";

interface InstagramModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  likes: number;
  isLiked: boolean;
  comments: CommentItem[];
  onToggleLike: (photoId: string) => void;
  onAddComment: (photoId: string, author: string, text: string) => Promise<void>;
}

export function InstagramModal({
  photo,
  onClose,
  onNext,
  onPrev,
  likes,
  isLiked,
  comments,
  onToggleLike,
  onAddComment,
}: InstagramModalProps) {
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize author name from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gallery_user_name");
      if (saved) setAuthorName(saved);
    }
  }, []);

  // Keyboard navigation & lock body scroll
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

  // Auto scroll to latest comment when a new comment is added
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    const trimmedText = commentText.trim();
    const finalAuthor = authorName.trim() || "guest_coder";

    if (typeof window !== "undefined") {
      localStorage.setItem("gallery_user_name", finalAuthor);
    }

    setIsSubmitting(true);
    setCommentText("");
    try {
      await onAddComment(photo.id, finalAuthor, trimmedText);
      scrollToBottom();
    } finally {
      setIsSubmitting(false);
    }
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

  const handleAddEmoji = (emoji: string) => {
    setCommentText((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#030407]/90 backdrop-blur-md"
        />

        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 border border-[#1a2235] text-neutral-300 hover:text-white hover:bg-[#1a2235] transition-all"
        >
          <LuX className="h-6 w-6" />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-4 z-50 p-2.5 sm:p-3 rounded-full bg-black/70 border border-[#1a2235] text-neutral-300 hover:text-white hover:border-[#1558C9] hover:scale-105 transition-all shadow-xl"
        >
          <LuChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="absolute right-2 sm:right-4 z-50 p-2.5 sm:p-3 rounded-full bg-black/70 border border-[#1a2235] text-neutral-300 hover:text-white hover:border-[#1558C9] hover:scale-105 transition-all shadow-xl"
        >
          <LuChevronRight className="h-6 w-6" />
        </button>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-40 w-full max-w-5xl h-[92vh] max-h-[780px] rounded-2xl overflow-hidden border border-[#1a2235] bg-[#030407] shadow-2xl flex flex-col lg:flex-row"
        >
          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDE: Photo with Ultra-Smooth Pinch & Zoom (Compositor GPU)
              ══════════════════════════════════════════════════════════════ */}
          <div className="relative w-full lg:w-[58%] h-[50vh] lg:h-full bg-black flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#1a2235]">
            <ZoomableImage
              src={photo.src}
              alt={photo.alt}
              onDoubleTapHeart={handleDoubleTap}
              showHeartAnim={showHeartBurst}
            />
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SIDE: Instagram Profile Header, Comments & Reactions
              ══════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[42%] h-[50vh] lg:h-full flex flex-col justify-between bg-[#0a0d14]">
            {/* Header: User Profile */}
            <div className="p-3.5 sm:p-4 border-b border-[#1a2235] flex items-center justify-between bg-[#0a0d14]">
              <div className="flex items-center gap-3">
                <div className="relative p-0.5 rounded-full bg-linear-to-tr from-[#1558C9] to-[#D4FF24]">
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-[#0a0d14]">
                    <Image
                      src="/og-image.webp"
                      alt="Dipu Biswas"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs sm:text-sm text-white hover:text-[#D4FF24] transition-colors">
                      dipu_biswas
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1558C9]" />
                    <span className="text-[11px] font-mono text-[#D4FF24]">PRO</span>
                  </div>
                  {photo.location && (
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                      <LuMapPin className="h-3 w-3 text-[#1558C9]" />
                      <span>{photo.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <a
                href="https://github.com/dipu59"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border border-[#1a2235] bg-[#030407] text-[#D4FF24] hover:border-[#1558C9] hover:bg-[#1558C9]/10 transition-colors"
              >
                Follow
              </a>
            </div>

            {/* Scrollable Comments & Caption Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm custom-scrollbar">
              {/* Main Caption (as first comment) */}
              <div className="flex items-start gap-3 pb-3 border-b border-[#1a2235]/60">
                <div className="relative h-7 w-7 rounded-full overflow-hidden shrink-0 border border-[#1a2235]">
                  <Image
                    src="/og-image.webp"
                    alt="Dipu Biswas"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="leading-relaxed">
                    <span className="font-semibold text-white mr-1.5">
                      dipu_biswas
                    </span>
                    <span className="text-neutral-200">{photo.caption}</span>
                  </div>
                  {photo.tags && photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {photo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-[#1558C9] hover:text-[#D4FF24] cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="font-mono text-[10px] text-neutral-500 pt-1">
                    {photo.date || "Recently"}
                  </p>
                </div>
              </div>

              {/* Dynamic Comments List */}
              {comments.length === 0 ? (
                <div className="py-8 text-center space-y-1">
                  <LuSparkles className="h-6 w-6 text-[#1558C9] mx-auto opacity-70" />
                  <p className="text-neutral-300 font-medium">No comments yet</p>
                  <p className="text-[11px] text-neutral-500">
                    Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2.5 group">
                    <div className="h-6 w-6 rounded-full bg-[#1558C9]/20 border border-[#1558C9]/40 text-[#D4FF24] flex items-center justify-center font-mono text-[10px] uppercase font-bold shrink-0">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug">
                        <span className="font-semibold text-neutral-200 mr-1.5 text-xs">
                          {comment.author}
                        </span>
                        <span className="text-neutral-300 text-xs break-words">
                          {comment.text}
                        </span>
                      </p>
                      <p className="font-mono text-[9px] text-neutral-500 mt-0.5">
                        {formatTimeAgo(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>

            {/* Bottom Actions Bar (Like, Comment, Share, Bookmark) */}
            <div className="p-3.5 sm:p-4 border-t border-[#1a2235] bg-[#0a0d14] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Like Button with Animation */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={handleLikeClick}
                    aria-label="Like photo"
                    className="focus:outline-none transition-colors"
                  >
                    <LuHeart
                      className={`h-6 w-6 transition-all duration-200 ${
                        isLiked
                          ? "text-rose-500 fill-rose-500 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                          : "text-neutral-300 hover:text-white"
                      }`}
                    />
                  </motion.button>

                  {/* Comment Focus Button */}
                  <button
                    type="button"
                    onClick={() => inputRef.current?.focus()}
                    aria-label="Comment"
                    className="text-neutral-300 hover:text-white focus:outline-none transition-colors"
                  >
                    <LuMessageCircle className="h-6 w-6" />
                  </button>

                  {/* Share / Copy Link Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleCopyShare}
                      aria-label="Share photo"
                      className="text-neutral-300 hover:text-white focus:outline-none transition-colors"
                    >
                      {copiedLink ? (
                        <LuCheck className="h-6 w-6 text-[#D4FF24]" />
                      ) : (
                        <LuShare2 className="h-6 w-6" />
                      )}
                    </button>
                    {copiedLink && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[9px] bg-black px-2 py-0.5 rounded border border-[#1a2235] text-[#D4FF24] whitespace-nowrap shadow-lg">
                        Link copied!
                      </span>
                    )}
                  </div>
                </div>

                {/* Bookmark Toggle */}
                <button
                  type="button"
                  onClick={() => setBookmarked((prev) => !prev)}
                  aria-label="Bookmark photo"
                  className="text-neutral-300 hover:text-white focus:outline-none transition-colors"
                >
                  <LuBookmark
                    className={`h-6 w-6 ${
                      bookmarked ? "text-[#D4FF24] fill-[#D4FF24]" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Likes count & Date */}
              <div className="space-y-0.5">
                <p className="font-semibold text-xs text-white">
                  {likes} {likes === 1 ? "like" : "likes"}
                </p>
                <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                  DOUBLE-TAP PHOTO TO LIKE &amp; ZOOM
                </p>
              </div>

              {/* Quick Emojis */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto">
                {["🔥", "❤️", "🚀", "⚡", "👏", "💻", "✨"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleAddEmoji(emoji)}
                    className="text-sm p-1 rounded-md hover:bg-[#1a2235] transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Comment Input Form */}
              <form onSubmit={handleCommentSubmit} className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Your name / handle..."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    maxLength={30}
                    className="w-1/3 rounded-lg border border-[#1a2235] bg-[#030407] px-2.5 py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#1558C9]"
                  />
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      maxLength={500}
                      className="w-full rounded-lg border border-[#1a2235] bg-[#030407] pl-3 pr-10 py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#1558C9]"
                    />
                    <button
                      type="submit"
                      disabled={!commentText.trim() || isSubmitting}
                      aria-label="Post comment"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-[#1558C9] hover:text-[#D4FF24] disabled:opacity-30 disabled:hover:text-[#1558C9] transition-colors"
                    >
                      <LuSend className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function formatTimeAgo(isoString: string): string {
  try {
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "recently";
  }
}
