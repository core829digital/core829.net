"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Core829 — Something went wrong</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          backgroundColor: "#0a0a0a",
          color: "#e8e8e8",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "9999px",
            backgroundColor: "#e10600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "1.5rem",
          }}
        >
          !
        </div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Critical error
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#a0a0a0",
            marginTop: "0.5rem",
            maxWidth: "28rem",
            lineHeight: 1.5,
          }}
        >
          An unexpected error occurred. Our team has been notified.
          {error.digest && (
            <>
              <br />
              Reference: <code style={{ color: "#e10600" }}>{error.digest}</code>
            </>
          )}
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.625rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#fff",
            backgroundColor: "#e10600",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <p
          style={{
            marginTop: "3rem",
            fontSize: "0.75rem",
            color: "#555",
          }}
        >
          Core829
        </p>
      </body>
    </html>
  );
}
