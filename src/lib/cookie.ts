export function getSessionToken(): string {
  if (typeof window === "undefined") return "";
  return (
    document.cookie
      .split("; ")
      .find((r) => r.startsWith("session_token_client="))
      ?.split("=")[1] || ""
  );
}
