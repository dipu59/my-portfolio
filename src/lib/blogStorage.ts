import fs from "fs/promises";
import path from "path";
import {
  BlogComment,
  BlogCommentsMap,
  BlogInteraction,
  BlogInteractionsMap,
  ReactionType,
} from "@/types/blog";

const DATA_DIR = path.join(process.cwd(), "data");
const INTERACTIONS_FILE = path.join(DATA_DIR, "blog-interactions.json");
const COMMENTS_FILE = path.join(DATA_DIR, "blog-comments.json");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "blog-subscribers.json");

const DEFAULT_INTERACTIONS: BlogInteractionsMap = {
  "mastering-nextjs-16-and-react-19": {
    views: 1420,
    reactions: { likes: 134, claps: 88, hearts: 92, rockets: 65 },
  },
  "building-ultra-fast-edge-apis": {
    views: 980,
    reactions: { likes: 78, claps: 45, hearts: 56, rockets: 41 },
  },
  "cyber-ui-tailwind-v4-framer-motion": {
    views: 2150,
    reactions: { likes: 210, claps: 140, hearts: 185, rockets: 120 },
  },
  "the-pragmatic-fullstack-engineer-handbook": {
    views: 860,
    reactions: { likes: 95, claps: 62, hearts: 74, rockets: 50 },
  },
};

const DEFAULT_COMMENTS: BlogCommentsMap = {
  "mastering-nextjs-16-and-react-19": [
    {
      id: "comment-1",
      authorName: "Sarah Jenkins",
      authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sarah",
      content:
        "The breakdown of Server Actions vs Edge handlers is spot on! We migrated our dashboard data layer and saw a 35% reduction in initial load.",
      createdAt: "2026-11-10T14:22:00Z",
      likes: 12,
    },
    {
      id: "comment-2",
      authorName: "Alex Rivera",
      authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
      content:
        "React Compiler eliminating manual useMemo and useCallback has made our codebases so much cleaner. Great insights Dipu!",
      createdAt: "2026-11-11T09:45:00Z",
      likes: 8,
    },
  ],
  "cyber-ui-tailwind-v4-framer-motion": [
    {
      id: "comment-3",
      authorName: "David Chen",
      authorAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=David",
      content:
        "The neon glow effects and backdrop filters on your portfolio look unbelievable! Copying the glowing star technique for my own site.",
      createdAt: "2026-11-12T18:10:00Z",
      likes: 15,
    },
  ],
};

let interactionsLoaded = false;
let interactionsCache: BlogInteractionsMap = { ...DEFAULT_INTERACTIONS };

let commentsLoaded = false;
let commentsCache: BlogCommentsMap = { ...DEFAULT_COMMENTS };

let subscribersLoaded = false;
let subscribersCache: string[] = [];

// Ensure storage directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

// ── Interactions (Views & Reactions) ─────────────────────────────────────────

export async function getBlogInteractions(): Promise<BlogInteractionsMap> {
  if (interactionsLoaded) return interactionsCache;

  await ensureDataDir();
  try {
    const raw = await fs.readFile(INTERACTIONS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    interactionsCache = { ...DEFAULT_INTERACTIONS, ...parsed };
  } catch {
    interactionsCache = { ...DEFAULT_INTERACTIONS };
  }
  interactionsLoaded = true;
  return interactionsCache;
}

export async function saveBlogInteractions(
  data: BlogInteractionsMap
): Promise<void> {
  interactionsCache = data;
  interactionsLoaded = true;
  await ensureDataDir();
  try {
    await fs.writeFile(INTERACTIONS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write blog-interactions.json:", err);
  }
}

export async function getPostInteraction(
  slug: string
): Promise<BlogInteraction> {
  const all = await getBlogInteractions();
  if (!all[slug]) {
    all[slug] = {
      views: 0,
      reactions: { likes: 0, claps: 0, hearts: 0, rockets: 0 },
    };
  }
  return all[slug];
}

export async function incrementBlogView(
  slug: string
): Promise<BlogInteraction> {
  const all = await getBlogInteractions();
  if (!all[slug]) {
    all[slug] = {
      views: 1,
      reactions: { likes: 0, claps: 0, hearts: 0, rockets: 0 },
    };
  } else {
    all[slug].views += 1;
  }
  await saveBlogInteractions(all);
  return all[slug];
}

export async function incrementBlogReaction(
  slug: string,
  reaction: ReactionType
): Promise<BlogInteraction> {
  const all = await getBlogInteractions();
  if (!all[slug]) {
    all[slug] = {
      views: 1,
      reactions: { likes: 0, claps: 0, hearts: 0, rockets: 0 },
    };
  }
  all[slug].reactions[reaction] = (all[slug].reactions[reaction] || 0) + 1;
  await saveBlogInteractions(all);
  return all[slug];
}

// ── Comments ────────────────────────────────────────────────────────────────

export async function getBlogComments(slug: string): Promise<BlogComment[]> {
  if (commentsLoaded) {
    return commentsCache[slug] || [];
  }
  await ensureDataDir();
  try {
    const raw = await fs.readFile(COMMENTS_FILE, "utf-8");
    commentsCache = { ...DEFAULT_COMMENTS, ...JSON.parse(raw) };
  } catch {
    commentsCache = { ...DEFAULT_COMMENTS };
  }
  commentsLoaded = true;
  return commentsCache[slug] || [];
}

export async function addBlogComment(
  slug: string,
  comment: Omit<BlogComment, "id" | "createdAt" | "likes">
): Promise<BlogComment> {
  const currentComments = await getBlogComments(slug);
  const newComment: BlogComment = {
    ...comment,
    id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  const updated = [newComment, ...currentComments];
  commentsCache[slug] = updated;

  await ensureDataDir();
  try {
    await fs.writeFile(
      COMMENTS_FILE,
      JSON.stringify(commentsCache, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error("Failed to write blog-comments.json:", err);
  }

  return newComment;
}

// ── Newsletter Subscribers ───────────────────────────────────────────────────

export async function addNewsletterSubscriber(email: string): Promise<{
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}> {
  await ensureDataDir();
  if (!subscribersLoaded) {
    try {
      const raw = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
      subscribersCache = JSON.parse(raw);
    } catch {
      subscribersCache = [];
    }
    subscribersLoaded = true;
  }

  const normalized = email.trim().toLowerCase();
  if (subscribersCache.includes(normalized)) {
    return {
      success: true,
      message: "You are already subscribed to tech dispatches!",
      alreadySubscribed: true,
    };
  }

  subscribersCache.push(normalized);

  try {
    await fs.writeFile(
      SUBSCRIBERS_FILE,
      JSON.stringify(subscribersCache, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error("Failed to write blog-subscribers.json:", err);
  }

  return {
    success: true,
    message: "Welcome aboard! You will receive future engineering updates.",
  };
}
