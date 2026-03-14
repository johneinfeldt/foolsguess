export type HeadShape = "round" | "square" | "oval" | "heart" | "wide";
export type AvatarColor = "purple" | "green" | "gold" | "red" | "blue";
export type Accessory = "none" | "glasses" | "cap" | "headband" | "bowtie";

export interface AvatarConfig {
  headShape: HeadShape;
  color: AvatarColor;
  accessory: Accessory;
}

export const HEAD_SHAPES: HeadShape[] = ["round", "square", "oval", "heart", "wide"];
export const AVATAR_COLORS: AvatarColor[] = ["purple", "green", "gold", "red", "blue"];
export const ACCESSORIES: Accessory[] = ["none", "glasses", "cap", "headband", "bowtie"];

export const COLOR_HEX: Record<AvatarColor, string> = {
  purple: "#6C5CE7",
  green: "#22C55E",
  gold: "#F59E0B",
  red: "#EF4444",
  blue: "#3B82F6",
};

export const COLOR_HEX_LIGHT: Record<AvatarColor, string> = {
  purple: "#8B7CF6",
  green: "#4ADE80",
  gold: "#FCD34D",
  red: "#F87171",
  blue: "#60A5FA",
};

// SVG path data for each head shape (viewBox 0 0 64 64)
export const HEAD_PATHS: Record<HeadShape, string> = {
  round:
    "M32,6 C48,6 58,16 58,32 C58,48 48,58 32,58 C16,58 6,48 6,32 C6,16 16,6 32,6 Z",
  square:
    "M14,10 L50,10 Q58,10 58,18 L58,50 Q58,58 50,58 L14,58 Q6,58 6,50 L6,18 Q6,10 14,10 Z",
  oval:
    "M32,4 C46,4 54,16 54,32 C54,48 46,60 32,60 C18,60 10,48 10,32 C10,16 18,4 32,4 Z",
  heart:
    "M32,58 C16,48 4,38 4,24 C4,12 12,6 22,6 C28,6 31,10 32,14 C33,10 36,6 42,6 C52,6 60,12 60,24 C60,38 48,48 32,58 Z",
  wide:
    "M32,10 C54,10 62,20 62,34 C62,48 52,56 32,56 C12,56 2,48 2,34 C2,20 10,10 32,10 Z",
};

// Eye positions vary by head shape
export const EYE_POSITIONS: Record<HeadShape, { lx: number; ly: number; rx: number; ry: number }> = {
  round:  { lx: 22, ly: 28, rx: 42, ry: 28 },
  square: { lx: 22, ly: 30, rx: 42, ry: 30 },
  oval:   { lx: 22, ly: 28, rx: 42, ry: 28 },
  heart:  { lx: 22, ly: 28, rx: 42, ry: 28 },
  wide:   { lx: 20, ly: 30, rx: 44, ry: 30 },
};

// Mouth positions vary by head shape
export const MOUTH_PATHS: Record<HeadShape, string> = {
  round:  "M24,38 Q32,46 40,38",
  square: "M24,42 Q32,48 40,42",
  oval:   "M24,38 Q32,46 40,38",
  heart:  "M26,38 Q32,44 38,38",
  wide:   "M22,40 Q32,48 42,40",
};

export const DEFAULT_AVATARS: AvatarConfig[] = [
  { headShape: "round", color: "purple", accessory: "none" },
  { headShape: "square", color: "green", accessory: "none" },
  { headShape: "oval", color: "gold", accessory: "none" },
  { headShape: "wide", color: "red", accessory: "none" },
];
