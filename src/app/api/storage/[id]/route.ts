import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@/lib/env";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string" || id.length < 10) {
      return NextResponse.json({ error: "Invalid storage ID" }, { status: 400 });
    }

    const token = request.cookies.get("session_token")?.value;
    if (!token || token.length < 32) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const storageUrl = `${ENV.CONVEX_URL}/api/storage/${encodeURIComponent(id)}`;
    const response = await fetch(storageUrl, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    });

    if (response.status === 404) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (!response.ok) {
      return NextResponse.json({ error: "Storage service error" }, { status: 502 });
    }

    const contentType = response.headers.get("Content-Type") || "application/octet-stream";
    const isViewable = ["image/", "video/", "audio/", "application/pdf"].some((t) =>
      contentType.startsWith(t)
    );

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      isViewable ? `inline; filename="${id}"` : `attachment; filename="${id}"`
    );
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("X-Content-Type-Options", "nosniff");

    return new NextResponse(response.body, { status: 200, headers });
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return NextResponse.json({ error: "Storage request timed out" }, { status: 504 });
    }
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
  }
}
