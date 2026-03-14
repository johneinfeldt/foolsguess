"use client";

import {
  AvatarConfig,
  HEAD_PATHS,
  EYE_POSITIONS,
  MOUTH_PATHS,
  COLOR_HEX,
  COLOR_HEX_LIGHT,
} from "@/lib/avatars";

interface AvatarDisplayProps {
  avatar: AvatarConfig;
  size?: number;
  className?: string;
}

export default function AvatarDisplay({
  avatar,
  size = 48,
  className = "",
}: AvatarDisplayProps) {
  const color = COLOR_HEX[avatar.color];
  const colorLight = COLOR_HEX_LIGHT[avatar.color];
  const headPath = HEAD_PATHS[avatar.headShape];
  const eyes = EYE_POSITIONS[avatar.headShape];
  const mouth = MOUTH_PATHS[avatar.headShape];

  // Use a stable ID based on avatar config to avoid conflicts
  const gid = `av-${avatar.color}-${avatar.headShape}`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorLight} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* Head */}
      <path d={headPath} fill={`url(#${gid})`} />

      {/* Eyes - white with dark pupil */}
      <circle cx={eyes.lx} cy={eyes.ly} r={3.5} fill="white" />
      <circle cx={eyes.rx} cy={eyes.ry} r={3.5} fill="white" />
      <circle cx={eyes.lx + 0.5} cy={eyes.ly + 0.5} r={1.8} fill="#1E293B" />
      <circle cx={eyes.rx + 0.5} cy={eyes.ry + 0.5} r={1.8} fill="#1E293B" />
      {/* Eye shine */}
      <circle cx={eyes.lx - 0.5} cy={eyes.ly - 1} r={0.8} fill="white" opacity={0.8} />
      <circle cx={eyes.rx - 0.5} cy={eyes.ry - 1} r={0.8} fill="white" opacity={0.8} />

      {/* Mouth */}
      <path
        d={mouth}
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />

      {/* Accessory */}
      {avatar.accessory === "glasses" && (
        <g>
          <circle cx={eyes.lx} cy={eyes.ly} r={6} fill="none" stroke="#334155" strokeWidth={1.8} />
          <circle cx={eyes.rx} cy={eyes.ry} r={6} fill="none" stroke="#334155" strokeWidth={1.8} />
          <line x1={eyes.lx + 6} y1={eyes.ly} x2={eyes.rx - 6} y2={eyes.ry} stroke="#334155" strokeWidth={1.8} />
          <line x1={eyes.lx - 6} y1={eyes.ly} x2={eyes.lx - 9} y2={eyes.ly - 3} stroke="#334155" strokeWidth={1.8} />
          <line x1={eyes.rx + 6} y1={eyes.ry} x2={eyes.rx + 9} y2={eyes.ry - 3} stroke="#334155" strokeWidth={1.8} />
        </g>
      )}
      {avatar.accessory === "cap" && (
        <g>
          <ellipse cx={32} cy={eyes.ly - 12} rx={22} ry={8} fill={color} opacity={0.9} />
          <rect x={6} y={eyes.ly - 14} width={52} height={4} rx={2} fill={color} />
          <rect x={38} y={eyes.ly - 16} width={20} height={4} rx={2} fill={color} opacity={0.7} />
        </g>
      )}
      {avatar.accessory === "headband" && (
        <g>
          <rect x={6} y={eyes.ly - 10} width={52} height={4} rx={2} fill="white" opacity={0.8} />
          <circle cx={32} cy={eyes.ly - 8} r={2} fill={color} />
        </g>
      )}
      {avatar.accessory === "bowtie" && (
        <g>
          <path
            d={`M24,${eyes.ly + 16} L32,${eyes.ly + 12} L40,${eyes.ly + 16} L32,${eyes.ly + 20} Z`}
            fill={color}
            opacity={0.9}
          />
          <circle cx={32} cy={eyes.ly + 16} r={2} fill="white" opacity={0.6} />
        </g>
      )}
    </svg>
  );
}
