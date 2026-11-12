import { NextResponse } from "next/server";
import { getGalleryData, saveGalleryData, CommentItem } from "@/lib/galleryStorage";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  props: { params: Promise<{ photoId: string }> }
) {
  try {
    const { photoId } = await props.params;
    const body = await request.json();

    const rawText = typeof body?.text === "string" ? body.text.trim() : "";
    let author = typeof body?.author === "string" ? body.author.trim() : "";

    if (!rawText) {
      return NextResponse.json(
        { success: false, error: "Comment text cannot be empty" },
        { status: 400 }
      );
    }

    if (rawText.length > 500) {
      return NextResponse.json(
        { success: false, error: "Comment cannot exceed 500 characters" },
        { status: 400 }
      );
    }

    if (!author) {
      author = "guest_dev";
    } else {
      author = author.replace(/[^a-zA-Z0-9_.]/g, "").slice(0, 30) || "guest_dev";
    }

    const data = await getGalleryData();
    const current = data[photoId] || { likes: 0, likedBy: [], comments: [] };

    const newComment: CommentItem = {
      id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      author,
      text: rawText,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...(current.comments || []), newComment];

    data[photoId] = {
      ...current,
      comments: updatedComments,
    };

    await saveGalleryData(data);

    return NextResponse.json({
      success: true,
      comment: newComment,
      comments: updatedComments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
