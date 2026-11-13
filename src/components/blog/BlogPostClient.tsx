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

  // Increment view on mount
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

      {/* ── Breadcrumb & Category Bar ─────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="pt-24 pb-6 flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-slate-300 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-[#3b82f6] font-medium">{post.category}</span>
      </nav>

      {/* ── Article Header ─────────────────────────────────────────────────── */}
      <header className="space-y-6 pb-8 border-b border-[#1a2235]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#111726] border border-[#1a2235] text-[#D4FF24]">
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
            ⏱ {post.readingTime}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">
            👁 {views} views
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          {post.excerpt}
        </p>

        {/* Author Card & Social Links */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1a2235]/60">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#1558C9]/50 shadow-[0_0_15px_rgba(21,88,201,0.3)]">
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
            <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
              {post.author.socials.twitter && (
                <a
                  href={post.author.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter / 𝕏
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

      {/* ── Featured Cover Hero Image ─────────────────────────────────────── */}
      <div className="relative h-64 sm:h-96 w-full my-8 rounded-3xl overflow-hidden border border-[#1a2235] bg-[#0a0d14] shadow-2xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-transparent opacity-60" />
      </div>

      {/* ── Floating Action Dock ──────────────────────────────────────────── */}
      <div className="sticky top-20 z-40 my-6">
        <BlogActionDock
          slug={post.slug}
          title={post.title}
          initialReactions={initialReactions}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />
      </div>

      {/* ── Main Layout: Content + Sticky TOC ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-start">
        {/* Main Article Body */}
        <main className="lg:col-span-8 w-full min-w-0">
          <BlogMarkdownRenderer
            content={post.content}
            fontSize={fontSize}
          />

          {/* Tags cloud */}
          <div className="mt-12 pt-6 border-t border-[#1a2235] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-[#0a0d14] border border-[#1a2235] text-slate-300 hover:text-[#D4FF24] hover:border-[#D4FF24]/40 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Author Bio Box */}
          <div className="mt-10 p-6 rounded-2xl border border-[#1a2235] bg-gradient-to-r from-[#0a0d14] to-[#0f1420] flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1558C9] flex-shrink-0">
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
                <span className="text-xs text-[#3b82f6] font-mono">
                  {post.author.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <BlogComments
            slug={post.slug}
            initialComments={initialComments}
          />
        </main>

        {/* Right Sticky Sidebar (Table of Contents & Quick Links) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-36 space-y-6">
          <BlogTableOfContents markdown={post.content} />

          {/* Quick share or back button */}
          <div className="p-4 rounded-2xl border border-[#1a2235] bg-[#0a0d14]/60 text-xs font-mono space-y-3">
            <p className="text-slate-400">Enjoyed this dispatch?</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[#D4FF24] hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </aside>
      </div>

      {/* ── Related Posts & Navigation ────────────────────────────────────── */}
      <BlogRelatedPosts currentPost={post} allPosts={allPosts} />
    </div>
  );
}
