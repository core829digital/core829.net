import { ImageResponse } from "next/og";

export const alt = "Core829 — Build it. Rent it. Run it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              fontSize: "5rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#f0f0f0",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Core829
          </span>
          <div
            style={{
              width: "3rem",
              height: "0.25rem",
              borderRadius: "9999px",
              backgroundColor: "#e10600",
            }}
          />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "#a0a0a0",
              marginTop: "0.5rem",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Build it. Rent it. Run it.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
