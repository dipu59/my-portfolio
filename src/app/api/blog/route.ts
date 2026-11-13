import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/markdownPosts";
import { getBlogInteractions } from "@/lib/blogStorage";

export const dynamic = "force-dynamic";

export async function GET() {
  const interactions = await getBlogInteractions();
  const posts = getAllPosts();
  return NextResponse.json({
    posts,
    interactions,
  });
}
