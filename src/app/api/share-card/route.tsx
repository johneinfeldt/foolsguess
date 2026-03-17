import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const score = parseInt(searchParams.get("score") || "0");
  const q1 = parseInt(searchParams.get("q1") || "0");
  const q2 = parseInt(searchParams.get("q2") || "0");
  const q3 = parseInt(searchParams.get("q3") || "0");
  const f1 = parseInt(searchParams.get("f1") || "0");
  const f2 = parseInt(searchParams.get("f2") || "0");
  const f3 = parseInt(searchParams.get("f3") || "0");
  const day = searchParams.get("day") || "1";
  const stars = parseInt(searchParams.get("stars") || "0");

  const questions = [
    { points: q1, found: f1 },
    { points: q2, found: f2 },
    { points: q3, found: f3 },
  ];

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
          background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #1a1a2e 100%)",
          fontFamily: "sans-serif",
          color: "white",
          padding: "50px 40px",
          position: "relative",
        }}
      >
        {/* Subtle glow effect */}
        <div
          style={{
            position: "absolute",
            top: "120px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: 36, display: "flex" }}>🃏</span>
          <span
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-1px",
              display: "flex",
            }}
          >
            FoolsGuess
          </span>
        </div>

        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            fontWeight: 600,
            marginBottom: "36px",
            display: "flex",
          }}
        >
          Daily #{day}
        </div>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                fontSize: 32,
                display: "flex",
                opacity: i <= stars ? 1 : 0.2,
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Big Score */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-4px",
              lineHeight: 1,
              background: "linear-gradient(135deg, #a78bfa, #6C5CE7, #8B7CF6)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 600,
              marginTop: "4px",
              display: "flex",
            }}
          >
            / 300
          </span>
        </div>

        {/* Overall progress bar */}
        <div
          style={{
            width: "400px",
            height: "12px",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.1)",
            marginBottom: "44px",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(score / 300) * 100}%`,
              height: "100%",
              borderRadius: "6px",
              background: "linear-gradient(90deg, #6C5CE7, #a78bfa)",
              display: "flex",
            }}
          />
        </div>

        {/* Question breakdown */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "400px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                    display: "flex",
                  }}
                >
                  Q{i + 1}
                </span>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.35)",
                      display: "flex",
                    }}
                  >
                    {q.found}/6 found
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "white",
                      display: "flex",
                    }}
                  >
                    {q.points}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  borderRadius: "5px",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${q.points}%`,
                    height: "100%",
                    borderRadius: "5px",
                    background:
                      q.points >= 80
                        ? "linear-gradient(90deg, #22c55e, #4ade80)"
                        : q.points >= 50
                        ? "linear-gradient(90deg, #6C5CE7, #a78bfa)"
                        : q.points >= 20
                        ? "linear-gradient(90deg, #f59e0b, #fcd34d)"
                        : "linear-gradient(90deg, #ef4444, #fca5a5)",
                    display: "flex",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.35)",
              fontWeight: 500,
              display: "flex",
            }}
          >
            foolsguess.com
          </span>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 900,
    }
  );
}
