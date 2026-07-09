function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

export const ENV = {
  CONVEX_URL: requireEnv("NEXT_PUBLIC_CONVEX_URL"),
  SITE_URL: optionalEnv("NEXT_PUBLIC_SITE_URL", "https://core829.net"),
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
} as const;
