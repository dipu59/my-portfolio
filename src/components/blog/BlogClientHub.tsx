"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogPost, BlogInteractionsMap, SortOption, ViewMode } from "@/types/blog";
import { BLOG_CATEGORIES, getAllTags } from "@/data/blogPosts";
import { BlogHero } from "./BlogHero";
import { BlogFilters } from "./BlogFilters";
import { BlogCard } from "./BlogCard";
import { BlogNewsletter } from "./BlogNewsletter";

interface BlogClientHubProps {
  initialPosts: BlogPost[];
  initialInteractions: BlogInteractionsMap;
}

export function BlogClientHub({
  initialPosts,
  initialInteractions,
}: BlogClientHubProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [interactions, setInteractions] =
    useState<BlogInteractionsMap>(initialInteractions);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);

  // Load bookmarks & interactions
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("saved_blog_posts") || "[]"
      ) as string[];
      setBookmarkedSlugs(saved);
    } catch {
      // ignore
    }

    // Refresh interaction stats in background
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.interactions) {
          setInteractions(data.interactions);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleBookmark = (slug: string) => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("saved_blog_posts") || "[]"
      ) as string[];
      let next: string[];
      if (saved.includes(slug)) {
        next = saved.filter((s) => s !== slug);
      } else {
        next = [...saved, slug];
      }
      localStorage.setItem("saved_blog_posts", JSON.stringify(next));
      setBookmarkedSlugs(next);
    } catch {
      // ignore
    }
  };

  const allTags = useMemo(() => getAllTags(), []);

  // Compute post counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    BLOG_CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = posts.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [posts]);

  // Filter & Sort Pipeline
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        // Bookmarked filter
        if (onlyBookmarked && !bookmarkedSlugs.includes(post.slug)) {
          return false;
        }

        // Category filter
        if (selectedCategory !== "All" && post.category !== selectedCategory) {
          return false;
        }

        // Tag filter
        if (selectedTag && !post.tags.includes(selectedTag)) {
          return false;
        }

        // Search Query (Fuzzy across title, excerpt, tags, content)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = post.title.toLowerCase().includes(q);
          const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
          const matchesTag = post.tags.some((t) => t.toLowerCase().includes(q));
          const matchesContent = post.content.toLowerCase().includes(q);
          if (!matchesTitle && !matchesExcerpt && !matchesTag && !matchesContent) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") {
          const aLikes = interactions[a.slug]?.reactions?.likes ?? 0;
          const bLikes = interactions[b.slug]?.reactions?.likes ?? 0;
          return bLikes - aLikes;
        }

        if (sortBy === "reading-time-asc") {
          const aMin = parseInt(a.readingTime) || 0;
          const bMin = parseInt(b.readingTime) || 0;
          return aMin - bMin;
        }

        if (sortBy === "reading-time-desc") {
          const aMin = parseInt(a.readingTime) || 0;
          const bMin = parseInt(b.readingTime) || 0;
          return bMin - aMin;
        }

        // Default: Latest
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      });
  }, [
    posts,
    onlyBookmarked,
    bookmarkedSlugs,
    selectedCategory,
    selectedTag,
    searchQuery,
    sortBy,
    interactions,
  ]);

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const featuredInteraction = featuredPost
    ? interactions[featuredPost.slug]
    : undefined;

  return (
    <div className="w-full space-y-8 pb-20">
      {/* Hero Section */}
      <BlogHero
        featuredPost={featuredPost}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalArticles={posts.length}
        featuredViews={featuredInteraction?.views}
        featuredLikes={featuredInteraction?.reactions?.likes}
      />

      {/* Filter and View Controls */}
      <div className="pt-4">
        <BlogFilters
          categories={BLOG_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          bookmarkedCount={bookmarkedSlugs.length}
          onlyBookmarked={onlyBookmarked}
          onToggleOnlyBookmarked={() => setOnlyBookmarked(!onlyBookmarked)}
          categoryCounts={categoryCounts}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 text-xs font-mono text-slate-500">
          <span>
            Showing {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedCategory !== "All" && ` in "${selectedCategory}"`}
            {selectedTag && ` tagged #${selectedTag}`}
            {searchQuery && ` matching "${searchQuery}"`}
            {onlyBookmarked && ` (Saved)`}
          </span>
        </div>

        {/* Post Grid or List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl border border-dashed border-[#1a2235] bg-[#07090e]/60">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-white mb-2">
              No matching articles found
            </h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
              We couldn&apos;t find any articles matching your search criteria. Try
              adjusting your keywords or reset active filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedTag("");
                setOnlyBookmarked(false);
              }}
              className="px-5 py-2.5 rounded-xl border border-[#1558C9] bg-[#1558C9]/20 hover:bg-[#1558C9]/40 text-blue-400 text-xs font-mono font-medium transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                : "space-y-4"
            }
          >
            {filteredPosts.map((post) => {
              const postStats = interactions[post.slug];
              const isBookmarked = bookmarkedSlugs.includes(post.slug);

              return (
                <BlogCard
                  key={post.slug}
                  post={post}
                  viewMode={viewMode}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                  views={postStats?.views ?? 0}
                  likes={postStats?.reactions?.likes ?? 0}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <BlogNewsletter />
    </div>
  );
}
