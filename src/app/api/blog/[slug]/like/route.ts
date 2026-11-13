import { NextResponse } from "next/server";
import { ReactionType } from "@/types/blog";
import { incrementBlogReaction } from "@/lib/blogStorage";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

const VALID_REACTIONS: ReactionType[] = ["likes", "claps", "hearts", "rockets"];

export async function POST(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  try {
    const body = await request.json();
    const reaction = body.reaction as ReactionType;

    if (!reaction || !VALID_REACTIONS.includes(reaction)) {
      return NextResponse.json(
        { error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    const updated = await incrementBlogReaction(slug, reaction);
    return NextResponse.json({ success: true, reactions: updated.reactions });
  } catch {
    return NextResponse.json(
      { error: "Failed to process reaction" },
      { status: 500 }
    );
  }
}
