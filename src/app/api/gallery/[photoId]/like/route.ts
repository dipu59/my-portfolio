import { NextResponse } from "next/server";
import { getGalleryData, saveGalleryData } from "@/lib/galleryStorage";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  props: { params: Promise<{ photoId: string }> }
) {
  try {
    const { photoId } = await props.params;
    let clientId = "anonymous";
    try {
      const body = await request.json();
      if (body?.clientId && typeof body.clientId === "string") {
        clientId = body.clientId.slice(0, 100);
      }
    } catch {
      // Body may be empty, proceed with anonymous
    }

    const data = await getGalleryData();
    const current = data[photoId] || { likes: 0, likedBy: [], comments: [] };

    const likedBy = Array.isArray(current.likedBy) ? current.likedBy : [];
    const alreadyLiked = likedBy.includes(clientId);

    let updatedLikes: number;
    let updatedLikedBy: string[];
    let isLiked: boolean;

    if (alreadyLiked && clientId !== "anonymous") {
      // Toggle unlike
      updatedLikedBy = likedBy.filter((id) => id !== clientId);
      updatedLikes = Math.max(0, current.likes - 1);
      isLiked = false;
    } else {
      // Like
      if (clientId !== "anonymous") {
        updatedLikedBy = [...likedBy, clientId];
      } else {
        updatedLikedBy = likedBy;
      }
      updatedLikes = current.likes + 1;
      isLiked = true;
    }

    data[photoId] = {
      ...current,
      likes: updatedLikes,
      likedBy: updatedLikedBy,
    };

    await saveGalleryData(data);

    return NextResponse.json({
      success: true,
      likes: updatedLikes,
      isLiked,
    });
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update like status" },
      { status: 500 }
    );
  }
}
