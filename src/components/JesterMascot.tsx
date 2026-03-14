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
    happy: { left: "M36,42 Q38,46 40,42", right: "M56,42 Q58,46 60,42" },
    excited: { left: "M35,39 L41,39", right: "M55,39 L61,39" },
    thinking: { left: "M36,42 Q38,45 40,42", right: "M60,40 A2,2 0 1,1 56,40" },
    sad: { left: "M36,44 Q38,40 40,44", right: "M56,44 Q58,40 60,44" },
  };

  const mouthVariants = {
    happy: "M38,52 Q48,62 58,52",
    excited: "M36,50 Q48,66 60,50",
    thinking: "M42,54 Q48,56 54,54",
    sad: "M40,56 Q48,50 56,56",
  };

  const eyes = eyeVariants[mood];
  const mouth = mouthVariants[mood];

  return (
    <svg
      viewBox="0 0 96 96"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#8B7CF6" />
        </linearGradient>
        <linearGradient id="face-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE0B2" />
          <stop offset="100%" stopColor="#FFCC80" />
        </linearGradient>
        <filter id="mascot-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6C5CE7" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#mascot-shadow)">
        {/* Hat - three-pointed jester cap */}
        <path
          d="M20,35 Q15,10 30,18 Q38,2 48,16 Q58,2 66,18 Q81,10 76,35 Z"
          fill="url(#hat-grad)"
          stroke="#5A4BD1"
          strokeWidth="1.5"
        />
        {/* Hat bells */}
        <circle cx="30" cy="17" r="3.5" fill="#FFD600" />
        <circle cx="48" cy="14" r="3.5" fill="#FFD600" />
        <circle cx="66" cy="17" r="3.5" fill="#FFD600" />
        {/* Bell shine */}
        <circle cx="29" cy="15.5" r="1" fill="#FFF9C4" />
        <circle cx="47" cy="12.5" r="1" fill="#FFF9C4" />
        <circle cx="65" cy="15.5" r="1" fill="#FFF9C4" />

        {/* Hat pattern - diamonds */}
        <path d="M35,28 L38,22 L41,28 L38,32 Z" fill="#FFD600" opacity="0.6" />
        <path d="M53,28 L56,22 L59,28 L56,32 Z" fill="#FFD600" opacity="0.6" />

        {/* Face */}
        <ellipse cx="48" cy="52" rx="22" ry="24" fill="url(#face-grad)" />

        {/* Cheeks */}
        <circle cx="33" cy="50" r="5" fill="#FF8A80" opacity="0.35" />
        <circle cx="63" cy="50" r="5" fill="#FF8A80" opacity="0.35" />

        {/* Eyes */}
        <path d={eyes.left} stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d={eyes.right} stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Mouth */}
        <path d={mouth} stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Collar */}
        <path
          d="M26,72 Q32,66 38,72 Q43,66 48,72 Q53,66 58,72 Q63,66 70,72"
          fill="none"
          stroke="url(#hat-grad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
