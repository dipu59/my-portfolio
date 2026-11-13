import { getAllPosts } from "@/lib/markdownPosts";

export const dynamic = "force-dynamic";

export async function GET() {
  const siteUrl = "https://dipubiswas.in";
  const posts = getAllPosts();

  const rssItemsXml = posts.map((post) => {
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <author>${post.author.name}</author>
    </item>`;
  }).join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dipu Biswas — Developer Blog &amp; Dispatches</title>
    <link>${siteUrl}/blog</link>
    <description>Engineering articles, deep technical guides, and architectural insights into Next.js, React, and modern web systems.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
