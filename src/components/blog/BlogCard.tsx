"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost, ViewMode } from "@/types/blog";
import { formatDate } from "@/lib/readingTime";

interface BlogCardProps {
  post: BlogPost;
  viewMode?: ViewMode;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  views?: number;
  likes?: number;
}

export function BlogCard({
  post,
  viewMode = "grid",
  isBookmarked,
  onToggleBookmark,
  views = 0,
  likes = 0,
}: BlogCardProps) {
  if (viewMode === "list") {
    return (
      <article className="group relative rounded-2xl border border-[#1e2638] bg-[#0b0f19] p-5 sm:p-6 hover:border-[#1558C9] hover:bg-[#0e1422] transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#131926] border border-[#1e2638] text-sky-400">
                {post.category}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono text-[11px]">
                {post.readingTime} read
              </span>
            </div>

            <Link href={`/blog/${post.slug}`} className="block text-white">
              <h3 className="text-lg sm:text-xl font-bold !text-white group-hover:!text-sky-300 transition-colors leading-snug">
                {post.title}
              </h3>
            </Link>

            <p className="text-base text-slate-300 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#07090e] border border-[#1e2638] text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1e2638]">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <span>{views.toLocaleString()} views</span>
              <span>•</span>
              <span>{likes} reactions</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleBookmark(post.slug);
                }}
                title={isBookmarked ? "Remove Bookmark" : "Save for later"}
                className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                  isBookmarked
                    ? "border-sky-500 bg-sky-500/15 text-sky-400"
                    : "border-[#1e2638] bg-[#07090e] text-slate-400 hover:text-white"
                }`}
              >
                <svg
                  className="w-4 h-4"
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
              </button>

              <Link
                href={`/blog/${post.slug}`}
                className="px-3 py-1.5 rounded-xl border border-[#1e2638] bg-[#131926] hover:bg-[#1558C9] hover:border-transparent text-xs font-mono text-slate-200 hover:text-white transition-all"
              >
                Read →
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid View (Default)
  return (
    <article className="group relative flex flex-col rounded-2xl border border-[#1e2638] bg-[#0b0f19] overflow-hidden hover:border-[#1558C9] hover:shadow-[0_0_30px_rgba(21,88,201,0.2)] transition-all duration-300">
      {/* Cover Image */}
      <div className="relative h-28 sm:h-48 md:h-52 w-full overflow-hidden bg-[#07090e]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-90" />

        <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between">
          <span className="px-2 py-0.5 sm:px-2.5 rounded-full text-[9px] sm:text-[10px] font-mono font-medium bg-[#07090e]/85 backdrop-blur-md text-sky-400 border border-sky-500/30 shadow-sm truncate max-w-[75%]">
            {post.category}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleBookmark(post.slug);
            }}
            title={isBookmarked ? "Remove Bookmark" : "Save for later"}
            className={`p-1 sm:p-1.5 rounded-lg sm:rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
              isBookmarked
                ? "border-sky-500 bg-sky-500/20 text-sky-400"
                : "border-[#1e2638] bg-[#07090e]/80 text-white/70 hover:text-white"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between space-y-2.5 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-slate-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{post.readingTime} read</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="block text-white">
            <h3 className="text-xs sm:text-base md:text-lg font-bold !text-white group-hover:!text-sky-300 transition-colors leading-snug line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed hidden sm:block">
            {post.excerpt}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3 pt-1.5 sm:pt-2 border-t border-[#1e2638]">
          <div className="hidden sm:flex flex-wrap items-center gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#07090e] border border-[#1e2638] text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500 pt-0.5 sm:pt-1">
            <div className="flex items-center gap-2">
              <span>{views.toLocaleString()} views</span>
              <span>•</span>
              <span>{likes} reactions</span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sky-400 group-hover:text-sky-300 group-hover:translate-x-1 transition-all flex items-center gap-0.5 sm:gap-1"
            >
              <span className="hidden sm:inline">Read article</span>
              <span className="sm:hidden">Read</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
