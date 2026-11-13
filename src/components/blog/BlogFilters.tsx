"use client";

import { BlogCategory, SortOption, ViewMode } from "@/types/blog";

interface BlogFiltersProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  sortBy: SortOption;
  onSelectSort: (sort: SortOption) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  bookmarkedCount: number;
  onlyBookmarked: boolean;
  onToggleOnlyBookmarked: () => void;
  categoryCounts: Record<string, number>;
}

export function BlogFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  tags,
  selectedTag,
  onSelectTag,
  sortBy,
  onSelectSort,
  viewMode,
  onToggleViewMode,
  bookmarkedCount,
  onlyBookmarked,
  onToggleOnlyBookmarked,
  categoryCounts,
}: BlogFiltersProps) {
  const hasActiveFilters =
    selectedCategory !== "All" || selectedTag !== "" || onlyBookmarked;

  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills Bar */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat && !onlyBookmarked;
            const count = categoryCounts[cat] ?? 0;

            return (
              <button
                key={cat}
                onClick={() => {
                  if (onlyBookmarked) onToggleOnlyBookmarked();
                  onSelectCategory(cat);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#1558C9] text-white shadow-[0_0_15px_rgba(21,88,201,0.4)] border border-blue-400/40"
                    : "bg-[#0a0d14] border border-[#1a2235] text-slate-400 hover:text-white hover:border-[#1558C9]/40"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#111726] text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Bookmarked Filter Pill */}
          <button
            onClick={onToggleOnlyBookmarked}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all ${
              onlyBookmarked
                ? "bg-[#D4FF24] text-black shadow-[0_0_15px_rgba(212,255,36,0.4)] font-semibold"
                : "bg-[#0a0d14] border border-[#1a2235] text-slate-400 hover:text-white hover:border-[#D4FF24]/40"
            }`}
          >
            <span>★ Saved</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                onlyBookmarked
                  ? "bg-black/20 text-black"
                  : "bg-[#111726] text-slate-500"
              }`}
            >
              {bookmarkedCount}
            </span>
          </button>
        </div>
      </div>

      {/* Secondary Controls Bar: Tags, Sort, View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1a2235]/60 text-xs">
        {/* Tags horizontal list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-slate-500 font-mono text-[11px] flex-shrink-0">
            Tags:
          </span>
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(isSelected ? "" : tag)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-[#D4FF24]/15 border border-[#D4FF24] text-[#D4FF24]"
                    : "bg-[#030407] border border-[#1a2235] text-slate-400 hover:text-slate-200"
                }`}
              >
                #{tag}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={() => {
                onSelectCategory("All");
                onSelectTag("");
                if (onlyBookmarked) onToggleOnlyBookmarked();
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 underline underline-offset-2 ml-2 flex-shrink-0"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Sort & View Mode Switcher */}
        <div className="flex items-center justify-end gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="bg-[#0a0d14] border border-[#1a2235] text-slate-300 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#1558C9] font-mono"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="reading-time-asc">Shortest Read</option>
              <option value="reading-time-desc">Longest Read</option>
            </select>
          </div>

          {/* Grid / List switch */}
          <div className="flex items-center rounded-lg border border-[#1a2235] bg-[#0a0d14] p-0.5">
            <button
              onClick={() => onToggleViewMode("grid")}
              title="Grid View"
              className={`p-1 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-[#1558C9] text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => onToggleViewMode("list")}
              title="List View"
              className={`p-1 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-[#1558C9] text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
