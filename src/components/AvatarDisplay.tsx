"use client";

import {
  AvatarConfig,
  COLOR_HEX,
  COLOR_HEX_LIGHT,
  COLOR_HEX_SHADOW,
  HAIR_COLORS,
  BLUSH_COLORS,
} from "@/lib/avatars";

interface AvatarDisplayProps {
  avatar: AvatarConfig;
  size?: number;
  className?: string;
}

// Face shape — same for all, a nice rounded head
const FACE_PATH = "M32,14 C48,14 54,26 54,40 C54,54 46,62 32,62 C18,62 10,54 10,40 C10,26 16,14 32,14 Z";

// Ear shapes
const EAR_LEFT = "M10,36 Q4,36 4,42 Q4,48 10,48";
const EAR_RIGHT = "M54,36 Q60,36 60,42 Q60,48 54,48";

// Eye positions (fixed — same face shape)
const EL = { x: 24, y: 38 }; // left eye
const ER = { x: 40, y: 38 }; // right eye

export default function AvatarDisplay({
  avatar,
  size = 48,
  className = "",
}: AvatarDisplayProps) {
  const skin = COLOR_HEX[avatar.color];
  const skinLight = COLOR_HEX_LIGHT[avatar.color];
  const skinShadow = COLOR_HEX_SHADOW[avatar.color];
  const hair = HAIR_COLORS[avatar.color];
  const blush = BLUSH_COLORS[avatar.color];

  const uid = `av-${avatar.color}-${avatar.headShape}-${avatar.accessory}`;

  return (
    <svg
      viewBox="0 0 64 68"
      width={size}
      height={size * (68 / 64)}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uid}-skin`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skinLight} />
          <stop offset="100%" stopColor={skin} />
        </linearGradient>
        <linearGradient id={`${uid}-hair`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hair.highlight} />
          <stop offset="100%" stopColor={hair.main} />
        </linearGradient>
        <filter id={`${uid}-shadow`}>
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter={`url(#${uid}-shadow)`}>
        {/* Ears */}
        <path d={EAR_LEFT} fill={skin} stroke={skinShadow} strokeWidth={1} />
        <path d={EAR_RIGHT} fill={skin} stroke={skinShadow} strokeWidth={1} />

        {/* Hair behind head (for long/curly styles) */}
        <HairBack style={avatar.headShape} hairGrad={`url(#${uid}-hair)`} />

        {/* Face */}
        <path d={FACE_PATH} fill={`url(#${uid}-skin)`} />

        {/* Cheek blush */}
        <ellipse cx={16} cy={46} rx={5} ry={3} fill={blush} opacity={0.25} />
        <ellipse cx={48} cy={46} rx={5} ry={3} fill={blush} opacity={0.25} />

        {/* Nose */}
        <ellipse cx={32} cy={46} rx={2.5} ry={2} fill={skinShadow} opacity={0.35} />

        {/* Eyes */}
        <Eyes accessory={avatar.accessory} />

        {/* Eyebrows */}
        <path d="M19,31 Q24,28 28,31" stroke={hair.main} strokeWidth={1.6} strokeLinecap="round" fill="none" />
        <path d="M36,31 Q40,28 45,31" stroke={hair.main} strokeWidth={1.6} strokeLinecap="round" fill="none" />

        {/* Mouth */}
        <path d="M26,52 Q32,58 38,52" stroke="#C0756B" strokeWidth={1.8} strokeLinecap="round" fill="none" />
        {/* Upper lip line */}
        <path d="M27,52 Q32,50 37,52" stroke={skinShadow} strokeWidth={0.8} strokeLinecap="round" fill="none" opacity={0.4} />

        {/* Hair on top */}
        <HairTop style={avatar.headShape} hairGrad={`url(#${uid}-hair)`} hairColor={hair.main} />

        {/* Accessory */}
        <AccessoryLayer type={avatar.accessory} hairColor={hair.main} />
      </g>
    </svg>
  );
}

// --- Sub-components ---

function Eyes({ accessory }: { accessory: string }) {
  return (
    <g>
      {/* Eye whites */}
      <ellipse cx={EL.x} cy={EL.y} rx={4.5} ry={5} fill="white" />
      <ellipse cx={ER.x} cy={ER.y} rx={4.5} ry={5} fill="white" />
      {/* Iris */}
      <circle cx={EL.x + 0.5} cy={EL.y + 0.5} r={2.8} fill="#4A3728" />
      <circle cx={ER.x + 0.5} cy={ER.y + 0.5} r={2.8} fill="#4A3728" />
      {/* Pupil */}
      <circle cx={EL.x + 0.5} cy={EL.y + 0.5} r={1.4} fill="#1A0E08" />
      <circle cx={ER.x + 0.5} cy={ER.y + 0.5} r={1.4} fill="#1A0E08" />
      {/* Eye shine */}
      <circle cx={EL.x - 0.8} cy={EL.y - 1.2} r={1.2} fill="white" opacity={0.85} />
      <circle cx={ER.x - 0.8} cy={ER.y - 1.2} r={1.2} fill="white" opacity={0.85} />
      {/* Lower eyelid subtle line */}
      <path d={`M${EL.x - 4},${EL.y + 3} Q${EL.x},${EL.y + 5.5} ${EL.x + 4},${EL.y + 3}`} stroke="#00000020" strokeWidth={0.6} fill="none" />
      <path d={`M${ER.x - 4},${ER.y + 3} Q${ER.x},${ER.y + 5.5} ${ER.x + 4},${ER.y + 3}`} stroke="#00000020" strokeWidth={0.6} fill="none" />
      {/* Glasses rendered over eyes if selected */}
      {accessory === "glasses" && (
        <g>
          <rect x={EL.x - 7} y={EL.y - 7} width={14} height={13} rx={3} fill="none" stroke="#334155" strokeWidth={1.6} />
          <rect x={ER.x - 7} y={ER.y - 7} width={14} height={13} rx={3} fill="none" stroke="#334155" strokeWidth={1.6} />
          <line x1={EL.x + 7} y1={EL.y} x2={ER.x - 7} y2={ER.y} stroke="#334155" strokeWidth={1.6} />
          <line x1={EL.x - 7} y1={EL.y - 2} x2={10} y2={EL.y - 5} stroke="#334155" strokeWidth={1.6} />
          <line x1={ER.x + 7} y1={ER.y - 2} x2={54} y2={ER.y - 5} stroke="#334155" strokeWidth={1.6} />
          {/* Lens reflection */}
          <line x1={EL.x - 4} y1={EL.y - 4} x2={EL.x - 2} y2={EL.y - 5} stroke="white" strokeWidth={1} opacity={0.4} strokeLinecap="round" />
          <line x1={ER.x - 4} y1={ER.y - 4} x2={ER.x - 2} y2={ER.y - 5} stroke="white" strokeWidth={1} opacity={0.4} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

function HairBack({ style, hairGrad }: { style: string; hairGrad: string }) {
  switch (style) {
    case "long":
      return (
        <g>
          <path d="M8,28 Q6,42 8,58 Q10,64 16,66 L16,62 Q10,52 10,36 Z" fill={hairGrad} />
          <path d="M56,28 Q58,42 56,58 Q54,64 48,66 L48,62 Q54,52 54,36 Z" fill={hairGrad} />
        </g>
      );
    case "curly":
      return (
        <g>
          <circle cx={8} cy={34} r={6} fill={hairGrad} />
          <circle cx={6} cy={44} r={5} fill={hairGrad} />
          <circle cx={56} cy={34} r={6} fill={hairGrad} />
          <circle cx={58} cy={44} r={5} fill={hairGrad} />
        </g>
      );
    default:
      return null;
  }
}

function HairTop({ style, hairGrad, hairColor }: { style: string; hairGrad: string; hairColor: string }) {
  switch (style) {
    case "short":
      return (
        <g>
          <path d="M14,26 Q14,8 32,6 Q50,8 50,26 Q46,16 32,14 Q18,16 14,26 Z" fill={hairGrad} />
          <path d="M16,24 Q18,14 32,12 Q46,14 48,24" fill="none" stroke={hairColor} strokeWidth={1} opacity={0.3} />
        </g>
      );
    case "long":
      return (
        <g>
          <path d="M10,32 Q10,6 32,4 Q54,6 54,32 Q50,16 32,12 Q14,16 10,32 Z" fill={hairGrad} />
          <path d="M12,28 Q14,10 32,8 Q50,10 52,28" fill="none" stroke={hairColor} strokeWidth={0.8} opacity={0.3} />
        </g>
      );
    case "curly":
      return (
        <g>
          <circle cx={20} cy={12} r={8} fill={hairGrad} />
          <circle cx={32} cy={8} r={9} fill={hairGrad} />
          <circle cx={44} cy={12} r={8} fill={hairGrad} />
          <circle cx={14} cy={20} r={7} fill={hairGrad} />
          <circle cx={50} cy={20} r={7} fill={hairGrad} />
          <circle cx={26} cy={6} r={6} fill={hairGrad} />
          <circle cx={38} cy={6} r={6} fill={hairGrad} />
        </g>
      );
    case "spiky":
      return (
        <g>
          <path d="M14,26 Q14,10 32,8 Q50,10 50,26 Q46,16 32,14 Q18,16 14,26 Z" fill={hairGrad} />
          <path d="M18,18 L14,2 L24,14 Z" fill={hairGrad} />
          <path d="M28,14 L26,0 L34,10 Z" fill={hairGrad} />
          <path d="M36,14 L38,0 L40,10 Z" fill={hairGrad} />
          <path d="M44,16 L50,2 L46,14 Z" fill={hairGrad} />
        </g>
      );
    case "bald":
      return (
        <g>
          {/* Just a subtle shine on the head */}
          <ellipse cx={28} cy={18} rx={8} ry={4} fill="white" opacity={0.12} />
        </g>
      );
    default:
      return null;
  }
}

function AccessoryLayer({ type, hairColor }: { type: string; hairColor: string }) {
  switch (type) {
    case "cap":
      return (
        <g>
          <path d="M8,22 Q8,6 32,4 Q56,6 56,22 L8,22 Z" fill="#334155" />
          <rect x={4} y={20} width={56} height={4} rx={2} fill="#1E293B" />
          <rect x={42} y={18} width={20} height={4} rx={2} fill="#1E293B" />
          {/* Cap button */}
          <circle cx={32} cy={6} r={2} fill="#475569" />
        </g>
      );
    case "headphones":
      return (
        <g>
          {/* Headband */}
          <path d="M8,32 Q8,10 32,8 Q56,10 56,32" fill="none" stroke="#334155" strokeWidth={3} strokeLinecap="round" />
          {/* Left pad */}
          <rect x={3} y={30} width={8} height={14} rx={4} fill="#1E293B" />
          <rect x={4} y={32} width={6} height={10} rx={3} fill="#475569" />
          {/* Right pad */}
          <rect x={53} y={30} width={8} height={14} rx={4} fill="#1E293B" />
          <rect x={54} y={32} width={6} height={10} rx={3} fill="#475569" />
        </g>
      );
    case "bowtie":
      return (
        <g>
          <path d="M22,58 L32,54 L42,58 L32,62 Z" fill="#EF4444" />
          <circle cx={32} cy={58} r={2.5} fill="#DC2626" />
          <circle cx={32} cy={58} r={1.2} fill="white" opacity={0.3} />
        </g>
      );
    case "glasses":
      // Glasses are rendered in the Eyes component for correct layering
      return null;
    default:
      return null;
  }
}
