"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogComment, BlogPost, Reactions } from "@/types/blog";
import { formatDate } from "@/lib/readingTime";
import { BlogReaderProgress } from "./BlogReaderProgress";
import { BlogTableOfContents } from "./BlogTableOfContents";
import { BlogMarkdownRenderer } from "./BlogMarkdownRenderer";
import { BlogActionDock } from "./BlogActionDock";
import { BlogComments } from "./BlogComments";
import { BlogRelatedPosts } from "./BlogRelatedPosts";

interface BlogPostClientProps {
  post: BlogPost;
  allPosts: BlogPost[];
  initialReactions: Reactions;
  initialViews: number;
  initialComments: BlogComment[];
}

export function BlogPostClient({
  post,
  allPosts,
  initialReactions,
  initialViews,
  initialComments,
}: BlogPostClientProps) {
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [views, setViews] = useState(initialViews);

  // Increment view count on mount
  useEffect(() => {
    fetch(`/api/blog/${post.slug}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.interaction?.views) {
          setViews(data.interaction.views);
        }
      })
      .catch(() => {});
  }, [post.slug]);

  return (
    <div className="w-full relative pb-24">
      {/* Top Reading Progress Bar */}
      <BlogReaderProgress />

      {/* ── Centered Full-Width Container ─────────────────────────────────── */}
      <div className="w-full max-w-4xl xl:max-w-5xl mx-auto">
        {/* ── Breadcrumb Navigation ──────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="pt-24 pb-6 flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-300 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-sky-400 font-medium">{post.category}</span>
        </nav>

        {/* ── Article Header ───────────────────────────────────────────────── */}
        <header className="space-y-6 pb-8 border-b border-[#1e2638]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-950/40 border border-sky-800/40 text-sky-400">
              {post.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {formatDate(post.publishedAt)}
            </span>
            {post.updatedAt && (
              <span className="text-xs font-mono text-slate-500">
                (Updated {formatDate(post.updatedAt)})
              </span>
            )}
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">
              {post.readingTime} read
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">
              {views.toLocaleString()} views
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            {post.excerpt}
          </p>

          {/* Author Card & Social Links */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1e2638]">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#1558C9]/50 shadow-[0_0_15px_rgba(21,88,201,0.25)]">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white tracking-wide">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  {post.author.role}
                </p>
              </div>
            </div>

            {post.author.socials && (
              <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
                {post.author.socials.twitter && (
                  <a
                    href={post.author.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors"
                  >
                    X (Twitter)
                  </a>
                )}
                {post.author.socials.github && (
                  <a
                    href={post.author.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* ── Featured Cover Hero Image ───────────────────────────────────── */}
        <div className="relative h-64 sm:h-96 md:h-[420px] w-full my-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1e2638] bg-[#0b0f19] shadow-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent" />
        </div>

        {/* ── Full Width Article Space ────────────────────────────────────── */}
        <main className="w-full space-y-8 mt-8">
          {/* 
            ── The Dedicated Reading Ground ──
            Full-width comfortable reading surface (#0b0f19) with soft text (#cbd5e1).
            No cramming sidebar: text flows freely with optimal readability.
          */}
          <article className="rounded-2xl sm:rounded-3xl border border-[#1e2638] bg-[#0b0f19] p-6 sm:p-10 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.35)]">
            {/* Top Reader Controls Bar (Non-Sticky, Unobtrusive) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-4 border-b border-[#1e2638] text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="text-slate-300 font-medium">{post.readingTime} read</span>
                <span className="text-slate-600">•</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              {/* Reader Font Size Selector */}
              <div className="flex items-center gap-1 bg-[#07090e] border border-[#1e2638] rounded-xl p-1">
                <span className="text-[11px] text-slate-500 px-2 select-none">Size</span>
                <button
                  type="button"
                  onClick={() => setFontSize("normal")}
                  aria-label="Default font size"
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    fontSize === "normal"
                      ? "bg-[#1558C9] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("large")}
                  aria-label="Medium font size"
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    fontSize === "large"
                      ? "bg-[#1558C9] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("xlarge")}
                  aria-label="Large font size"
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    fontSize === "xlarge"
                      ? "bg-[#1558C9] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            {/* 
              ── Table of Contents (Starting of the Article) ──
              Rendered full-width at the beginning of the article outline
              with collapsible toggle and 2-column responsive layout.
            */}
            <BlogTableOfContents markdown={post.content} />

            {/* Markdown Content Renderer */}
            <BlogMarkdownRenderer
              content={post.content}
              fontSize={fontSize}
            />

            {/* Tags Cloud */}
            <div className="mt-12 pt-6 border-t border-[#1e2638] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-500 mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[#07090e] border border-[#1e2638] text-slate-300 hover:text-sky-400 hover:border-sky-500/50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* 
              Engagement & Reaction Section (Completely Non-Sticky)
              Naturally positioned at the conclusion of the article.
            */}
            <div className="mt-10 pt-8 border-t border-[#1e2638]">
              <BlogActionDock
                slug={post.slug}
                title={post.title}
                initialReactions={initialReactions}
              />
            </div>
          </article>

          {/* Author Bio Box */}
          <div className="p-6 rounded-2xl border border-[#1e2638] bg-[#0b0f19] flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-lg">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1558C9]/60 shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h4 className="text-base font-bold text-white">
                  Written by {post.author.name}
                </h4>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="text-xs text-sky-400 font-mono">
                  {post.author.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>

          {/* 
            ── Back to all articles Navigation Box ──
            Positioned at the bottom across full width.
          */}
          <div className="p-6 rounded-2xl border border-[#1e2638] bg-[#0b0f19] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md text-xs font-mono">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-sm font-semibold text-slate-200 font-sans">
                Enjoying the engineering notes?
              </p>
              <p className="text-xs text-slate-400 font-sans">
                Explore more deep-dives into modern web architectures, distributed systems, and UI engineering.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#131926] hover:bg-[#1558C9] border border-[#1e2638] hover:border-transparent text-sky-400 hover:text-white transition-all font-mono shrink-0 cursor-pointer"
            >
              <span>← Back to all articles</span>
            </Link>
          </div>

          {/* Comments Section */}
          <BlogComments
            slug={post.slug}
            initialComments={initialComments}
          />
        </main>

        {/* ── Related Posts & Navigation ──────────────────────────────────── */}
        <BlogRelatedPosts currentPost={post} allPosts={allPosts} />
      </div>
    </div>
  );
}
