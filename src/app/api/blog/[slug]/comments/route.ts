import { NextResponse } from "next/server";
import { addBlogComment, getBlogComments } from "@/lib/blogStorage";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const comments = await getBlogComments(slug);
  return NextResponse.json(comments);
}

export async function POST(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  try {
    const body = await request.json();
    const { authorName, authorAvatar, content } = body;

    if (!authorName || !content) {
      return NextResponse.json(
        { error: "Author name and content are required" },
        { status: 400 }
      );
    }

    const savedComment = await addBlogComment(slug, {
      authorName: String(authorName).slice(0, 80),
      authorAvatar:
        authorAvatar ||
        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
          authorName
        )}`,
      content: String(content).slice(0, 2000),
    });

    return NextResponse.json(savedComment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
