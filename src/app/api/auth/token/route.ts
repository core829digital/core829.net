import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  if (!token || token.length < 32) {
    return NextResponse.json({ token: null });
  }

  return NextResponse.json({ token });
}
