import { BlogPost } from "@/types/blog";

export const DIPU_AUTHOR = {
  name: "Dipu Biswas",
  role: "Full-Stack Developer",
  avatar: "/dipubiswas.jpg",
  bio: "Software developer specializing in React, Next.js, distributed backends, and sleek cyber-themed UI systems.",
  socials: {
    twitter: "https://x.com/inocent_dipu",
    github: "https://github.com/dipu-77",
    linkedin: "https://linkedin.com/in/inocent-boy-dipu",
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mastering-nextjs-16-and-react-19",
    title: "Mastering Next.js 16 & React 19: The Complete Production Guide",
    excerpt:
      "A deep dive into React 19 Server Components, the React Compiler, async Request APIs, Server Actions with optimistic updates, and performance tuning for high-traffic apps.",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "React & Next.js",
    tags: ["Next.js 16", "React 19", "Server Components", "TypeScript", "Performance"],
    publishedAt: "2026-11-10T10:00:00Z",
    updatedAt: "2026-11-12T14:30:00Z",
    readingTime: "7 min read",
    featured: true,
    author: DIPU_AUTHOR,
    content: `
## Introduction

The evolution of Next.js 16 coupled with React 19 marks one of the most significant paradigm shifts in modern frontend development. In this guide, we break down real-world architectural patterns, the death of manual memoization, and how to harness asynchronous request APIs for sub-second render pipelines.

> [!NOTE]
> React 19 completely abstracts away \`useMemo\`, \`useCallback\`, and \`React.memo\` via the React Compiler. Your components are automatically memoized at the AST level during compile time.

---

## The Paradigm Shift: React Compiler in Action

Historically, frontend engineers spent hours debugging re-render cascades and writing defensive code with \`useMemo\` and \`useCallback\`. 

With the React Compiler enabled in \`next.config.ts\`, the compiler analyzes dependency graphs and applies automatic memoization without runtime overhead:

\`\`\`tsx
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // Enables AST-level compilation
  experimental: {
    ppr: true, // Partial Prerendering
  },
};

export default nextConfig;
\`\`\`

Now, standard component state updates avoid re-rendering heavy child subtrees without requiring manual hook wrappers:

\`\`\`tsx
export function MetricDashboard({ items }: { items: MetricItem[] }) {
  // No useMemo needed! React Compiler preserves computation automatically.
  const topMetrics = items
    .filter((item) => item.score > 90)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {topMetrics.map((metric) => (
        <MetricCard key={metric.id} data={metric} />
      ))}
    </div>
  );
}
\`\`\`

---

## Asynchronous Request APIs in Next.js 16

In Next.js 16, access to route parameters, query strings, cookies, and headers has migrated to asynchronous Promises. This enables the server runtime to aggressively stream static layout shells before resolving dynamic request headers.

\`\`\`tsx
// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  // Await route parameters asynchronously
  const { slug } = await params;
  const queries = await searchParams;

  const post = await fetchPostBySlug(slug);

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

> [!TIP]
> Always destructure \`params\` inside the page body after \`await\`. Avoid blocking the entire component if only a small child requires query parameter validation.

---

## Server Actions with Optimistic UI

React 19 brings \`useOptimistic\` and the enhanced \`useActionState\` hook. When paired with Server Actions, users experience instantaneous UI feedback before the server round-trip completes:

\`\`\`tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLikePost } from "@/actions/blog";

export function LikeButton({ initialLikes, slug }: { initialLikes: number; slug: string }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (state, delta: number) => state + delta
  );

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticLikes(1);
      await toggleLikePost(slug);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-all"
    >
      <span>👍</span>
      <span>{optimisticLikes}</span>
    </button>
  );
}
\`\`\`

---

## Performance Checklist for Production

Before shipping your Next.js 16 application, verify these core pillars:

1. **Partial Prerendering (PPR)**: Ensure static UI frames are delivered instantly with streaming dynamic holes.
2. **Font Optimization**: Utilize \`next/font\` to prevent Cumulative Layout Shift (CLS).
3. **Image Optimization**: Specify \`sizes\` and appropriate \`remotePatterns\` to avoid unoptimized asset payloads.
4. **Bundle Analysis**: Keep client component boundaries at the leaf nodes of your DOM tree.

> [!WARNING]
> Do not mark high-level wrapper components with \`"use client"\` unless necessary. Keep data-fetching, database querying, and file reading firmly within Server Components.
`,
  },
  {
    slug: "cyber-ui-tailwind-v4-framer-motion",
    title: "Designing Cyber-Themed Interactive UIs with Tailwind CSS v4 & Framer Motion",
    excerpt:
      "A masterclass in crafting futuristic dark-mode aesthetics: neon accents, glowing border gradients, spring physics, and canvas micro-interactions.",
    coverImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    category: "Full-Stack",
    tags: ["Tailwind v4", "Framer Motion", "UI/UX", "CSS", "Cyberpunk", "Design"],
    publishedAt: "2026-11-08T15:30:00Z",
    updatedAt: "2026-11-09T18:00:00Z",
    readingTime: "5 min read",
    featured: true,
    author: DIPU_AUTHOR,
    content: `
## The Cyberpunk Aesthetic: Beyond Ordinary Dark Mode

Modern web design has moved past flat gray palettes. Today's high-impact digital experiences leverage high-contrast neon accents, glowing radial spotlights, and smooth spring physics.

In this tutorial, we will explore the CSS architecture behind building an immersive cyber interface using Tailwind CSS v4 and Framer Motion.

---

## 1. Tailwind v4 Theme Variables

Tailwind CSS v4 introduces the native \`@theme\` directive, allowing CSS-first token definitions without messy JavaScript configuration files:

\`\`\`css
/* globals.css */
@import "tailwindcss";

:root {
  color-scheme: dark;
  --bg-base: #030407;
  --bg-surface: #0a0d14;
  --accent-blue: #1558C9;
  --accent-lime: #D4FF24;
  --border-glow: rgba(21, 88, 201, 0.4);
}

@theme inline {
  --color-cyber-base: var(--bg-base);
  --color-cyber-surface: var(--bg-surface);
  --color-cyber-blue: var(--accent-blue);
  --color-cyber-lime: var(--accent-lime);
}
\`\`\`

> [!TIP]
> Setting \`color-scheme: dark\` on \`:root\` forces native browser controls (inputs, scrollbars, dropdowns) to render in dark mode even if the user's OS has light mode enabled.

---

## 2. Animated Glowing Border Effect

One of the standout visuals is the dynamic glowing gradient border. Using CSS masks and pseudo-elements, we can create a rotating conic light beam:

\`\`\`tsx
export function NeonCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group rounded-2xl p-[1px] overflow-hidden">
      {/* Background glow spinning effect */}
      <div 
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, #1558C9 25%, #D4FF24 50%, transparent 100%)",
        }}
      />
      
      {/* Card Content Surface */}
      <div className="relative z-10 rounded-2xl bg-[#0a0d14] p-6 border border-[#1a2235] group-hover:border-transparent transition-colors">
        {children}
      </div>
    </div>
  );
}
\`\`\`

---

## 3. Spring Micro-Interactions with Framer Motion

Static hover states feel mechanical. Giving interactive elements physical weight and spring damping makes user clicks tactile and satisfying:

\`\`\`tsx
"use client";

import { motion } from "framer-motion";

export function CyberButton({ label }: { label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative px-6 py-3 rounded-xl font-medium tracking-wide text-black bg-[#D4FF24] shadow-[0_0_20px_rgba(212,255,36,0.35)] hover:shadow-[0_0_30px_rgba(212,255,36,0.55)] transition-shadow"
    >
      {label}
    </motion.button>
  );
}
\`\`\`

> [!IMPORTANT]
> Always pair scale transforms with \`will-change: transform\` and check for reduced motion preferences (\`prefers-reduced-motion\`) to maintain accessibility for all users.

---

## Key Takeaways

- Contrast is king: Combine dark voids (\`#030407\`) with piercing accents (\`#D4FF24\`, \`#1558C9\`).
- Motion adds life: Use springs instead of linear bezier transitions for interface controls.
- Glassmorphism works best when subtle: Restrict \`backdrop-blur\` to navigation bars and floating modal panels.
`,
  },
  {
    slug: "building-ultra-fast-edge-apis",
    title: "Building Ultra-Fast Edge APIs: Architecture, Caching & Distributed DBs",
    excerpt:
      "How to design sub-50ms global APIs utilizing Cloudflare / Vercel Edge runtimes, distributed caching with stale-while-revalidate, and geo-replicated data layers.",
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    category: "Architecture",
    tags: ["Edge Computing", "APIs", "Distributed Systems", "Redis", "Cloud Architecture"],
    publishedAt: "2026-11-05T08:15:00Z",
    updatedAt: "2026-11-06T11:00:00Z",
    readingTime: "6 min read",
    featured: false,
    author: DIPU_AUTHOR,
    content: `
## Why Edge Computing Matters

When your server sits in a single data center (e.g. \`us-east-1\`), users accessing your site from Singapore or London suffer 150ms+ of inescapable speed-of-light network latency before the first byte arrives.

Edge functions execute your code in hundreds of points of presence (PoPs) worldwide, bringing business logic right next to the client.

---

## Edge Runtime vs Traditional Node.js

| Feature | Node.js Runtime | Edge Runtime (V8 Isolates) |
| :--- | :--- | :--- |
| **Cold Starts** | 200ms – 1500ms | < 5ms |
| **Global Deployment** | Single region / Cluster | 300+ Edge nodes worldwide |
| **API Availability** | Full Node APIs (\`fs\`, \`net\`) | Standard Web APIs (\`fetch\`, \`crypto\`, \`Request\`) |
| **Memory Footprint** | ~50MB+ per process | < 5MB per isolate |

> [!NOTE]
> The Edge runtime uses lightweight V8 isolates rather than booting a full Node virtual machine. As a result, native Node modules like \`fs\` are unavailable, but standard Web APIs thrive.

---

## Designing an Edge Route Handler

In Next.js, switching an API route to the Edge runtime is as simple as exporting the runtime config:

\`\`\`typescript
// app/api/weather/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge"; // Runs on worldwide CDN nodes
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Kolkata";

  const res = await fetch(\`https://api.weatherapi.com/v1/current.json?q=\${city}\`, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
\`\`\`

---

## The Distributed Caching Strategy

The secret to sub-30ms response times is multi-tier caching:

1. **L1 Edge CDN Cache**: Cache responses at the edge gateway using HTTP \`Cache-Control\` with \`stale-while-revalidate\`.
2. **L2 Distributed Key-Value Store**: Upstash Redis or Cloudflare KV for user sessions and rate limiting.
3. **L3 Geo-Replicated Database**: Turso (libSQL) or Supabase with read replicas located in primary user clusters.

\`\`\`typescript
import { Redis } from "@upstash/redis/cloudflare";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getCachedData(key: string) {
  // Check L2 Redis Cache
  const cached = await redis.get(key);
  if (cached) return cached;

  // Cache miss -> Query primary database
  const fresh = await queryDatabase(key);
  await redis.set(key, fresh, { ex: 300 }); // 5 min TTL
  return fresh;
}
\`\`\`

> [!WARNING]
> Watch out for cache stampedes. When a popular cache key expires, thousands of concurrent requests can slam your origin database. Always implement staggered TTLs or mutex locks for high-throughput routes.
`,
  },
  {
    slug: "the-pragmatic-fullstack-engineer-handbook",
    title: "The Pragmatic Full-Stack Engineer: From Monoliths to Modular Systems",
    excerpt:
      "Actionable engineering principles for clean architecture, resilient error boundaries, CI/CD pipeline automation, and balancing speed with long-term code quality.",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    category: "DevOps & Cloud",
    tags: ["Architecture", "Engineering", "CI/CD", "Best Practices", "Clean Code"],
    publishedAt: "2026-11-01T12:00:00Z",
    updatedAt: "2026-11-02T16:00:00Z",
    readingTime: "8 min read",
    featured: false,
    author: DIPU_AUTHOR,
    content: `
## Engineering Wisdom in the Real World

Being a senior full-stack developer is rarely about knowing every syntax trick in the book. It is about understanding trade-offs, building resilient fault boundaries, and keeping systems simple enough that tomorrow's team can evolve them without fear.

---

## 1. The Rule of Simplicity: Modular Monolith First

Don't jump straight into microservices with Kubernetes clusters when a well-structured modular monolith does the job faster, cheaper, and with zero network serialization overhead.

A clean directory structure enforces boundaries without external orchestration:

\`\`\`text
src/
├── modules/
│   ├── auth/          # Authentication domain logic, db schemas, endpoints
│   ├── billing/       # Subscriptions, stripe webhooks, invoice generators
│   └── notifications/ # Email queues, SMS handlers, push services
└── shared/            # Common UI components, logger, db client
\`\`\`

> [!NOTE]
> If a domain boundary doesn't need to scale independently or run under different security parameters, keep it inside the same codebase. You can always split it into an independent microservice later.

---

## 2. Resilient Error Handling & Circuit Breakers

Never assume third-party APIs (Stripe, GitHub, Mailgun) are 100% reliable. Always wrap external integrations in defensive fallbacks:

\`\`\`typescript
export async function safeFetch<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error("Upstream service failure. Falling back to default:", error);
    return fallback;
  }
}
\`\`\`

---

## 3. Automated CI/CD Pipelines

Shipping code with confidence requires automated checks on every pull request. A robust GitHub Actions workflow should:

1. **Lint & Type Check**: Ensure no TypeScript or ESLint regressions.
2. **Unit & Integration Tests**: Verify business calculations and API contracts.
3. **Preview Deployments**: Spin up isolated environment URLs for QA testing before production merge.

\`\`\`yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run build
\`\`\`

---

## Conclusion

Great software is built through continuous iteration, strict automated testing, and ruthless prioritization. Write code that is easy to delete, easy to test, and effortless to read.
`,
  },
];

export const BLOG_CATEGORIES = [
  "All",
  "Full-Stack",
  "React & Next.js",
  "Architecture",
  "DevOps & Cloud",
  "AI & Tools",
] as const;

export function getAllTags(): string[] {
  const set = new Set<string>();
  BLOG_POSTS.forEach((post) => {
    post.tags.forEach((tag) => set.add(tag));
  });
  return Array.from(set);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
