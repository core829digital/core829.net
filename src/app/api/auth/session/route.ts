import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

function validateToken(token: unknown): token is string {
  return typeof token === "string" && token.length >= 32 && token.length <= 256;
}

function csrfCheck(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  if (!origin && !referer) return false;
  const isDev = process.env.NODE_ENV === "development";
  const known = [
    isDev ? "http://localhost:3000" : undefined,
    "https://localhost:3000",
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[];
  const check = (url: string) => known.some((k) => url === k || url.startsWith(`${k}/`));
  if (origin && check(origin)) return true;
  if (referer && check(referer)) return true;
  return false;
}

export async function POST(request: Request) {
  if (!csrfCheck(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { token?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!validateToken(body.token)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("session_token", body.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}

export async function DELETE(request: NextRequest) {
  if (!csrfCheck(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const token = request.cookies.get("session_token")?.value;

  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "auth:deleteSession",
          args: { token },
        }),
      });
    } catch {
      // Server-side session invalidation is best-effort
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("session_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
