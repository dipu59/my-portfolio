import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/data/blogPosts";
import { getBlogInteractions } from "@/lib/blogStorage";

export const dynamic = "force-dynamic";

export async function GET() {
  const interactions = await getBlogInteractions();
  return NextResponse.json({
    posts: BLOG_POSTS,
    interactions,
  });
}
