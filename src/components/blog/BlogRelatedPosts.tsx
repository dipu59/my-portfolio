import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

interface BlogRelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export function BlogRelatedPosts({
  currentPost,
  allPosts,
}: BlogRelatedPostsProps) {
  // Find previous and next articles in the collection
  const currentIndex = allPosts.findIndex((p) => p.slug === currentPost.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Find related posts (same category or sharing at least 1 tag, excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      let score = 0;
      if (p.category === currentPost.category) score += 3;
      p.tags.forEach((t) => {
        if (currentPost.tags.includes(t)) score += 1;
      });
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((item) => item.post);

  return (
    <div className="mt-16 pt-10 border-t border-[#1a2235] space-y-12">
      {/* ── Prev / Next Navigation ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-[#1a2235] bg-[#0a0d14]/60 hover:bg-[#0f1422] hover:border-[#1558C9] transition-all"
          >
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider group-hover:text-[#D4FF24] transition-colors">
              ← Previous Article
            </span>
            <span className="mt-2 text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-2">
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-[#1a2235] bg-[#0a0d14]/60 hover:bg-[#0f1422] hover:border-[#1558C9] transition-all text-right"
          >
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider group-hover:text-[#D4FF24] transition-colors">
              Next Article →
            </span>
            <span className="mt-2 text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-2">
              {nextPost.title}
            </span>
          </Link>
        )}
      </div>

      {/* ── Related Articles ──────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white mb-6">
            Recommended Reading
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-[#1a2235] bg-[#0a0d14] overflow-hidden hover:border-[#1558C9] hover:shadow-[0_0_25px_rgba(21,88,201,0.2)] transition-all"
              >
                <div className="relative h-28 sm:h-40 w-full overflow-hidden bg-[#111726]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold bg-[#030407]/80 backdrop-blur-md text-[#D4FF24] border border-[#D4FF24]/30 truncate max-w-[80%]">
                    {post.category}
                  </span>
                </div>
                <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-base !text-white group-hover:!text-[#D4FF24] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="mt-1.5 text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed hidden sm:block">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500">
                    <span>{post.readingTime}</span>
                    <span className="text-[#3b82f6] group-hover:translate-x-1 transition-transform">
                      <span className="hidden sm:inline">Read article </span>→
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
