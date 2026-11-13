import type { Metadata } from "next";
import { CyberLayout } from "@/components/CyberLayout";
import { BlogClientHub } from "@/components/blog/BlogClientHub";
import { BLOG_POSTS } from "@/data/blogPosts";
import { getBlogInteractions } from "@/lib/blogStorage";

export const metadata: Metadata = {
  title: "Blog // Dipu Biswas — Full Stack Web Developer",
  description:
    "Engineering dispatches, deep technical guides, and architectural insights into Next.js 16, React 19, distributed edge APIs, and cyber UI design.",
  openGraph: {
    title: "Engineering Blog // Dipu Biswas",
    description:
      "Deep technical explorations into Next.js 16, React 19, distributed systems, and modern UI engineering.",
    url: "https://dipubiswas.in/blog",
    siteName: "Dipu Biswas Portfolio & Blog",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dipu Biswas Engineering Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog // Dipu Biswas",
    description:
      "Deep technical explorations into Next.js 16, React 19, distributed systems, and modern UI engineering.",
    images: ["/og-image.jpg"],
  },
};

export default async function BlogPage() {
  const interactions = await getBlogInteractions();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dipu Biswas Engineering Blog",
    description:
      "Technical articles on Next.js 16, React 19, distributed edge systems, and modern web architecture.",
    url: "https://dipubiswas.in/blog",
    author: {
      "@type": "Person",
      name: "Dipu Biswas",
      url: "https://dipubiswas.in",
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `https://dipubiswas.in/blog/${post.slug}`,
    })),
  };

  return (
    <CyberLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogClientHub
        initialPosts={BLOG_POSTS}
        initialInteractions={interactions}
      />
    </CyberLayout>
  );
}
