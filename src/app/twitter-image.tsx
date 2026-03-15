import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FoolsGuess — Think Like the Crowd to Win";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #6C5CE7 0%, #8B7CF6 50%, #6C5CE7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: "-2px",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          FoolsGuess
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            opacity: 0.9,
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Think Like the Crowd to Win
        </div>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            fontSize: 20,
            opacity: 0.8,
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 20px",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            Daily Challenge
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 20px",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            Solo Journey
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 20px",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            Multiplayer
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: 18,
            opacity: 0.6,
            display: "flex",
          }}
        >
          foolsguess.com
        </div>
      </div>
    ),
    { ...size }
  );
}
