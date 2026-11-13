"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/readingTime";

interface BlogHeroProps {
  featuredPost?: BlogPost;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalArticles: number;
  featuredViews?: number;
  featuredLikes?: number;
}

export function BlogHero({
  featuredPost,
  searchQuery,
  onSearchChange,
  totalArticles,
  featuredViews = 1420,
  featuredLikes = 134,
}: BlogHeroProps) {
  return (
    <section className="relative pt-24 pb-8 space-y-8">
      {/* Decorative ambient neon background glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-blue-600/10 via-[#D4FF24]/5 to-blue-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Header & Tagline */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#1558C9]/40 bg-[#1558C9]/10 text-blue-400">
          <span className="w-2 h-2 rounded-full bg-[#1558C9] animate-ping" />
          Engineering Dispatches & Thoughts
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Architectural Insights &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1558C9] via-blue-400 to-[#D4FF24]">
            Modern Code
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Deep technical explorations into Next.js 16, React 19, distributed
          edge systems, resilient micro-frontends, and futuristic UI engineering.
        </p>

        {/* Live Search Input Bar */}
        <div className="pt-2 relative max-w-xl">
          <div className="relative flex items-center">
            <svg
              className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by topic, keyword, or tag (e.g. Next.js, Edge, CSS)..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-[#1a2235] bg-[#0a0d14]/90 backdrop-blur-md text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1558C9] focus:ring-1 focus:ring-[#1558C9] transition-all shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-400">
          <span>📚 {totalArticles} Articles Published</span>
          <span>•</span>
          <span>⚡ High-Performance Systems</span>
          <span>•</span>
          <a
            href="/feed.xml"
            target="_blank"
            className="flex items-center gap-1 text-[#D4FF24] hover:underline"
          >
            <span>📡</span>
            <span>RSS Feed</span>
          </a>
        </div>
      </div>

      {/* ── Featured Billboard Card ────────────────────────────────────────── */}
      {featuredPost && !searchQuery && (
        <div className="mt-8">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group relative block rounded-3xl p-[1px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(21,88,201,0.3)]"
          >
            {/* Glowing border background gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#1558C9] via-[#3b82f6] to-[#D4FF24] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            <div className="relative z-10 rounded-[23px] bg-[#0a0d14] overflow-hidden flex flex-col md:flex-row">
              {/* Image side */}
              <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden bg-[#111726]">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent md:hidden" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#030407]/80 backdrop-blur-md text-[#D4FF24] border border-[#D4FF24]/40 shadow-lg">
                  ★ Featured Insight
                </span>
              </div>

              {/* Text side */}
              <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="text-[#3b82f6] font-semibold">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                    <span>•</span>
                    <span>{featuredPost.readingTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold !text-white group-hover:!text-[#D4FF24] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a2235] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#1a2235]">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-white">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {featuredPost.author.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>👁 {featuredViews}</span>
                    <span>❤️ {featuredLikes}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}
