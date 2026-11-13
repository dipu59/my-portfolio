import { NextResponse } from "next/server";
import { addNewsletterSubscriber } from "@/lib/blogStorage";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const result = await addNewsletterSubscriber(email);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to process newsletter subscription" },
      { status: 500 }
    );
  }
}
