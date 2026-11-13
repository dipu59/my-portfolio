"use client";

import { useEffect, useState } from "react";
import { ReactionType, Reactions } from "@/types/blog";

interface BlogActionDockProps {
  slug: string;
  title: string;
  initialReactions: Reactions;
  fontSize: "normal" | "large" | "xlarge";
  onFontSizeChange: (size: "normal" | "large" | "xlarge") => void;
}

export function BlogActionDock({
  slug,
  title,
  initialReactions,
  fontSize,
  onFontSizeChange,
}: BlogActionDockProps) {
  const [reactions, setReactions] = useState<Reactions>(initialReactions);
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Sync user state from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("saved_blog_posts") || "[]"
      ) as string[];
      setIsBookmarked(saved.includes(slug));

      const reacted = JSON.parse(
        localStorage.getItem(`blog_reactions_${slug}`) || "{}"
      );
      setUserReactions(reacted);
    } catch {
      // ignore
    }
  }, [slug]);

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("saved_blog_posts") || "[]"
      ) as string[];
      let next: string[];
      if (saved.includes(slug)) {
        next = saved.filter((s) => s !== slug);
        setIsBookmarked(false);
      } else {
        next = [...saved, slug];
        setIsBookmarked(true);
      }
      localStorage.setItem("saved_blog_posts", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleReaction = async (type: ReactionType) => {
    // Optimistic update
    setReactions((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));

    const nextUserReactions = { ...userReactions, [type]: true };
    setUserReactions(nextUserReactions);
    try {
      localStorage.setItem(
        `blog_reactions_${slug}`,
        JSON.stringify(nextUserReactions)
      );
    } catch {
      // ignore
    }

    try {
      await fetch(`/api/blog/${slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction: type }),
      });
    } catch {
      // ignore network errors
    }
  };

  const copyUrl = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShareToast(true);
      setShowShareMenu(false);
      setTimeout(() => setShareToast(false), 2500);
    } catch {
      // fallback
    }
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Reading "${title}" by @inocent_dipu`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    setShowShareMenu(false);
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    setShowShareMenu(false);
  };

  const shareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this article: "${title}" ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0d14] border border-[#D4FF24] text-xs font-mono text-white shadow-[0_0_20px_rgba(212,255,36,0.3)] animate-in fade-in slide-in-from-bottom-2">
          <span className="text-[#D4FF24]">✓</span>
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* Floating Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-[#1a2235] bg-[#0a0d14]/90 backdrop-blur-xl shadow-2xl">
        {/* Reactions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleReaction("likes")}
            title="Like this article"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all active:scale-90 ${
              userReactions.likes
                ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                : "border-[#1a2235] bg-[#111726]/60 text-slate-300 hover:border-blue-500/50 hover:text-white"
            }`}
          >
            <span>👍</span>
            <span>{reactions.likes}</span>
          </button>

          <button
            onClick={() => handleReaction("claps")}
            title="Clap for this article"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all active:scale-90 ${
              userReactions.claps
                ? "border-[#D4FF24] bg-[#D4FF24]/10 text-[#D4FF24] shadow-[0_0_12px_rgba(212,255,36,0.2)]"
                : "border-[#1a2235] bg-[#111726]/60 text-slate-300 hover:border-[#D4FF24]/50 hover:text-white"
            }`}
          >
            <span>👏</span>
            <span>{reactions.claps}</span>
          </button>

          <button
            onClick={() => handleReaction("hearts")}
            title="Love this article"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all active:scale-90 ${
              userReactions.hearts
                ? "border-rose-500 bg-rose-500/10 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.2)]"
                : "border-[#1a2235] bg-[#111726]/60 text-slate-300 hover:border-rose-500/50 hover:text-white"
            }`}
          >
            <span>❤️</span>
            <span>{reactions.hearts}</span>
          </button>

          <button
            onClick={() => handleReaction("rockets")}
            title="Boost this article"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all active:scale-90 ${
              userReactions.rockets
                ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                : "border-[#1a2235] bg-[#111726]/60 text-slate-300 hover:border-purple-500/50 hover:text-white"
            }`}
          >
            <span>🚀</span>
            <span>{reactions.rockets}</span>
          </button>
        </div>

        {/* Right side controls: Bookmark, Font Size, Share */}
        <div className="flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center rounded-xl border border-[#1a2235] bg-[#111726]/60 p-0.5 text-xs font-mono">
            <button
              onClick={() => onFontSizeChange("normal")}
              className={`px-2 py-1 rounded-lg transition-colors ${
                fontSize === "normal"
                  ? "bg-[#1558C9] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => onFontSizeChange("large")}
              className={`px-2 py-1 rounded-lg text-sm transition-colors ${
                fontSize === "large"
                  ? "bg-[#1558C9] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            title={isBookmarked ? "Remove from bookmarks" : "Save for later"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              isBookmarked
                ? "border-[#D4FF24] bg-[#D4FF24]/15 text-[#D4FF24]"
                : "border-[#1a2235] bg-[#111726]/60 text-slate-300 hover:text-white hover:border-slate-500"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill={isBookmarked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="hidden sm:inline">
              {isBookmarked ? "Saved" : "Save"}
            </span>
          </button>

          {/* Share Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1a2235] bg-[#111726]/60 hover:bg-[#1a233a] hover:border-[#1558C9] text-slate-300 hover:text-white text-xs font-mono transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>

            {showShareMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-48 rounded-xl border border-[#1a2235] bg-[#0a0d14] p-2 shadow-2xl z-50 text-xs">
                <button
                  onClick={copyUrl}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#111726] transition-colors text-left"
                >
                  <span>🔗</span>
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={shareTwitter}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#111726] transition-colors text-left"
                >
                  <span>𝕏</span>
                  <span>Post on X</span>
                </button>
                <button
                  onClick={shareLinkedIn}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#111726] transition-colors text-left"
                >
                  <span>💼</span>
                  <span>Share on LinkedIn</span>
                </button>
                <button
                  onClick={shareWhatsApp}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#111726] transition-colors text-left"
                >
                  <span>💬</span>
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
