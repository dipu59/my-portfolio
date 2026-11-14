"use client";

import { useState } from "react";
import Image from "next/image";
import { BlogComment } from "@/types/blog";
import { formatDate } from "@/lib/readingTime";

interface BlogCommentsProps {
  slug: string;
  initialComments: BlogComment[];
}

export function BlogComments({ slug, initialComments }: BlogCommentsProps) {
  const [comments, setComments] = useState<BlogComment[]>(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const newCommentData = {
      authorName: authorName.trim(),
      authorAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
        authorName.trim()
      )}`,
      content: content.trim(),
    };

    // Optimistic UI
    const optimisticComment: BlogComment = {
      ...newCommentData,
      id: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments((prev) => [optimisticComment, ...prev]);
    setContent("");

    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentData),
      });

      if (res.ok) {
        const savedComment = await res.json();
        // Replace temp id with real id
        setComments((prev) =>
          prev.map((c) => (c.id === optimisticComment.id ? savedComment : c))
        );
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId: string) => {
    if (likedComments[commentId]) return;
    setLikedComments((prev) => ({ ...prev, [commentId]: true }));
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <section className="mt-14 pt-10 border-t border-[#1e2638]" id="comments">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Discussion
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#131926] border border-[#1e2638] text-sky-400">
            {comments.length}
          </span>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Markdown supported
        </span>
      </div>

      {/* New Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 p-6 rounded-2xl border border-[#1e2638] bg-[#0b0f19] shadow-xl space-y-4"
      >
        <div>
          <label
            htmlFor="comment-author"
            className="block text-xs font-mono text-slate-400 mb-1.5"
          >
            Your Name or Handle *
          </label>
          <input
            id="comment-author"
            type="text"
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="e.g. Alex Rivera (@alex_dev)"
            className="w-full px-4 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="comment-body"
            className="block text-xs font-mono text-slate-400 mb-1.5"
          >
            Share your thoughts, feedback, or questions *
          </label>
          <textarea
            id="comment-body"
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you think about this architectural approach? Any edge cases?"
            className="w-full px-4 py-2.5 rounded-xl border border-[#1e2638] bg-[#07090e] text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-slate-500">
            Constructive, professional discourse only.
          </p>
          <button
            type="submit"
            disabled={isSubmitting || !authorName.trim() || !content.trim()}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide bg-[#1558C9] hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(21,88,201,0.25)] cursor-pointer"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-[#1e2638] bg-[#0b0f19]">
            <p className="text-slate-400 text-sm">
              No comments yet. Be the first to start the discussion!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-5 rounded-2xl border border-[#1e2638] bg-[#0b0f19] space-y-3 transition-colors hover:border-[#28354d]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#1e2638] bg-[#111726]">
                    <Image
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">
                      {comment.authorName}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleLikeComment(comment.id)}
                  aria-label="Like this comment"
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                    likedComments[comment.id]
                      ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                      : "border-[#1e2638] bg-[#07090e] text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-xs">❤️</span>
                  <span>{comment.likes}</span>
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pl-11 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
