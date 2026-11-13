import { NextResponse } from "next/server";
import { getPostBySlug } from "@/data/blogPosts";
import { incrementBlogView } from "@/lib/blogStorage";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const interaction = await incrementBlogView(slug);
  return NextResponse.json({
    post,
    interaction,
  });
}
