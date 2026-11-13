import fs from "fs";
import path from "path";
import { BlogPost, BlogCategory } from "@/types/blog";
import { calculateReadingTime } from "./readingTime";
import { DIPU_AUTHOR, BLOG_CATEGORIES } from "@/data/blogConstants";

export { DIPU_AUTHOR, BLOG_CATEGORIES };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

interface ParsedFrontmatter {
  title?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  category?: Exclude<BlogCategory, "All">;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: string;
  featured?: boolean;
}

function parseMarkdownFile(fileContent: string, fileName: string): BlogPost {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  let rawYaml = "";
  let content = fileContent;

  if (match) {
    rawYaml = match[1];
    content = match[2];
  }

  const data: Record<string, unknown> = {};
  const lines = rawYaml.split(/\r?\n/);
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("-") && currentKey && currentArray) {
      const item = trimmed
        .replace(/^-\s*/, "")
        .replace(/^["']|["']$/g, "")
        .trim();
      currentArray.push(item);
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      if (currentKey && currentArray) {
        data[currentKey] = currentArray;
        currentArray = null;
      }

      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      if (!value) {
        currentKey = key;
        currentArray = [];
        continue;
      }

      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean);
        }
        currentKey = null;
        continue;
      }

      if (value === "true") {
        data[key] = true;
      } else if (value === "false") {
        data[key] = false;
      } else if (/^\d+$/.test(value)) {
        data[key] = Number(value);
      } else {
        data[key] = value.replace(/^["']|["']$/g, "");
      }
      currentKey = null;
    }
  }

  if (currentKey && currentArray) {
    data[currentKey] = currentArray;
  }

  const fm = data as ParsedFrontmatter;
  const derivedSlug =
    fm.slug || fileName.replace(/\.md$/, "").trim().toLowerCase();

  return {
    slug: derivedSlug,
    title: fm.title || "Untitled Post",
    excerpt: fm.excerpt || "",
    coverImage:
      fm.coverImage ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: fm.category || "Full-Stack",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    publishedAt: fm.publishedAt || new Date().toISOString(),
    updatedAt: fm.updatedAt,
    readingTime: fm.readingTime || calculateReadingTime(content),
    featured: Boolean(fm.featured),
    author: DIPU_AUTHOR,
    content: content.trim(),
  };
}

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  // If cache exists and not in dev hot-reload, return cached
  if (process.env.NODE_ENV === "production" && cachedPosts) {
    return cachedPosts;
  }

  try {
    if (!fs.existsSync(POSTS_DIR)) {
      return [];
    }

    const files = fs
      .readdirSync(POSTS_DIR)
      .filter(
        (file) =>
          file.endsWith(".md") &&
          !file.startsWith("_") &&
          !file.startsWith(".")
      );

    const posts = files
      .map((fileName) => {
        const fullPath = path.join(POSTS_DIR, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        return parseMarkdownFile(fileContent, fileName);
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

    cachedPosts = posts;
    return posts;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const set = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => set.add(tag));
  });
  return Array.from(set);
}
