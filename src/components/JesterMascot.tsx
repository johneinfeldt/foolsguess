"use client";

interface JesterMascotProps {
  size?: number;
  className?: string;
  mood?: "happy" | "excited" | "thinking" | "sad";
}

export default function JesterMascot({
  size = 120,
  className = "",
  mood = "happy",
}: JesterMascotProps) {
  const eyeVariants = {
    happy: { left: "M33,38 Q35,42 37,38", right: "M47,38 Q49,42 51,38" },
    excited: { left: "M32,36 L38,36", right: "M46,36 L52,36" },
    thinking: { left: "M33,38 Q35,41 37,38", right: "M51,37 A2,2 0 1,1 47,37" },
    sad: { left: "M33,40 Q35,36 37,40", right: "M47,40 Q49,36 51,40" },
  };

  const mouthVariants = {
    happy: "M36,47 Q42,55 48,47",
    excited: "M34,45 Q42,58 50,45",
    thinking: "M38,49 Q42,51 46,49",
    sad: "M37,51 Q42,47 47,51",
  };

  const eyes = eyeVariants[mood];
  const mouth = mouthVariants[mood];

  return (
    <svg
      viewBox="0 0 80 96"
      width={size * 0.83}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="q-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#8B7CF6" />
        </linearGradient>
        <linearGradient id="q-face-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE0B2" />
          <stop offset="100%" stopColor="#FFCC80" />
        </linearGradient>
        <filter id="q-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6C5CE7" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#q-shadow)">
        {/* Question mark curve - the main body */}
        <path
          d="M22,30 Q22,8 42,8 Q62,8 62,24 Q62,36 42,40 L42,52"
          fill="none"
          stroke="url(#q-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Face area - round overlay on the curve */}
        <ellipse cx="42" cy="30" rx="18" ry="18" fill="url(#q-face-grad)" />

        {/* Cheeks */}
        <circle cx="30" cy="42" r="4" fill="#FF8A80" opacity="0.3" />
        <circle cx="54" cy="42" r="4" fill="#FF8A80" opacity="0.3" />

        {/* Eyes */}
        <path d={eyes.left} stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d={eyes.right} stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Mouth */}
        <path d={mouth} stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Question mark dot */}
        <circle cx="42" cy="72" r="8" fill="url(#q-grad)" />
        {/* Dot shine */}
        <circle cx="39" cy="69" r="2.5" fill="white" opacity="0.4" />
      </g>
    </svg>
  );
}
