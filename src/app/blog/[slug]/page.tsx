import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CyberLayout } from "@/components/CyberLayout";
import { BlogPostClient } from "@/components/blog/BlogPostClient";
import { getAllPosts, getPostBySlug } from "@/lib/markdownPosts";
import { getBlogComments, getPostInteraction } from "@/lib/blogStorage";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found // Dipu Biswas",
    };
  }

  return {
    title: `${post.title} // Dipu Biswas`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      post.category,
      "Dipu Biswas",
      "Web Development",
      "Engineering",
    ],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [interaction, comments] = await Promise.all([
    getPostInteraction(slug),
    getBlogComments(slug),
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: "https://dipubiswas.in",
    },
    publisher: {
      "@type": "Person",
      name: "Dipu Biswas",
      url: "https://dipubiswas.in",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dipubiswas.in/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <CyberLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostClient
        post={post}
        allPosts={getAllPosts()}
        initialReactions={interaction.reactions}
        initialViews={interaction.views}
        initialComments={comments}
      />
    </CyberLayout>
  );
}
