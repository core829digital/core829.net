let cachedToken = "";

export function setSessionToken(token: string) {
  cachedToken = token;
}

export function getSessionToken(): string {
  if (typeof window === "undefined") return "";
  return cachedToken;
}
