import {
  getAllPosts,
  getPostBySlug as getPostBySlugFromMd,
  getAllTags as getAllTagsFromMd,
  BLOG_CATEGORIES as CATEGORIES,
  DIPU_AUTHOR as AUTHOR,
} from "@/lib/markdownPosts";
import { BlogPost } from "@/types/blog";

export const DIPU_AUTHOR = AUTHOR;
export const BLOG_CATEGORIES = CATEGORIES;

export const BLOG_POSTS: BlogPost[] = getAllPosts();

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPostBySlugFromMd(slug);
}

export function getAllTags(): string[] {
  return getAllTagsFromMd();
}
