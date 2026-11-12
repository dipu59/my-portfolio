import { NextResponse } from "next/server";
import { getGalleryData } from "@/lib/galleryStorage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getGalleryData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load gallery interactions" },
      { status: 500 }
    );
  }
}
