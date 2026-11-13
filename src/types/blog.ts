export type BlogCategory =
  | "All"
  | "Full-Stack"
  | "React & Next.js"
  | "Architecture"
  | "DevOps & Cloud"
  | "AI & Tools"
  | "Career";

export type ReactionType = "likes" | "claps" | "hearts" | "rockets";

export interface Reactions {
  likes: number;
  claps: number;
  hearts: number;
  rockets: number;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: Exclude<BlogCategory, "All">;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  featured?: boolean;
  author: BlogAuthor;
  content: string;
}

export interface BlogInteraction {
  views: number;
  reactions: Reactions;
}

export type BlogInteractionsMap = Record<string, BlogInteraction>;
export type BlogCommentsMap = Record<string, BlogComment[]>;

export type SortOption =
  | "latest"
  | "popular"
  | "reading-time-asc"
  | "reading-time-desc";

export type ViewMode = "grid" | "list";
