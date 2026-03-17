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

        {/* Header with mascot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "8px",
          }}
        >
          {/* Inline Jester Mascot SVG */}
          <svg
            viewBox="0 0 80 96"
            width="50"
            height="60"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Question mark curve */}
            <path
              d="M22,30 Q22,8 42,8 Q62,8 62,24 Q62,36 42,40 L42,52"
              fill="none"
              stroke="#8B7CF6"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Face */}
            <ellipse cx="42" cy="30" rx="18" ry="18" fill="#FFCC80" />
            {/* Cheeks */}
            <circle cx="30" cy="42" r="4" fill="#FF8A80" opacity="0.3" />
            <circle cx="54" cy="42" r="4" fill="#FF8A80" opacity="0.3" />
            {/* Eyes - happy */}
            <path d="M33,38 Q35,42 37,38" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M47,38 Q49,42 51,38" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Mouth - happy */}
            <path d="M36,47 Q42,55 48,47" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Dot */}
            <circle cx="42" cy="72" r="8" fill="#8B7CF6" />
            <circle cx="39" cy="69" r="2.5" fill="white" opacity="0.4" />
          </svg>
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
                    background: "linear-gradient(90deg, #6C5CE7, #a78bfa)",
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
