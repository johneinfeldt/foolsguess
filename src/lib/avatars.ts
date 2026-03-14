export type HeadShape = "short" | "long" | "curly" | "spiky" | "bald";
export type AvatarColor = "light" | "lightmed" | "medium" | "mediumdark" | "dark";
export type Accessory = "none" | "glasses" | "cap" | "headphones" | "bowtie";

export interface AvatarConfig {
  headShape: HeadShape;
  color: AvatarColor;
  accessory: Accessory;
}

export const HEAD_SHAPES: HeadShape[] = ["short", "long", "curly", "spiky", "bald"];
export const AVATAR_COLORS: AvatarColor[] = ["light", "lightmed", "medium", "mediumdark", "dark"];
export const ACCESSORIES: Accessory[] = ["none", "glasses", "cap", "headphones", "bowtie"];

// Realistic skin tones
export const COLOR_HEX: Record<AvatarColor, string> = {
  light: "#F5D0A9",
  lightmed: "#D4A574",
  medium: "#B07D4F",
  mediumdark: "#8B5E34",
  dark: "#5C3A1E",
};

export const COLOR_HEX_LIGHT: Record<AvatarColor, string> = {
  light: "#FDDCB5",
  lightmed: "#E0B68A",
  medium: "#C08E5E",
  mediumdark: "#9B6E44",
  dark: "#6C4A2E",
};

// Darker shade for shadow/shading
export const COLOR_HEX_SHADOW: Record<AvatarColor, string> = {
  light: "#E0B88C",
  lightmed: "#C09060",
  medium: "#956840",
  mediumdark: "#704828",
  dark: "#462C14",
};

// Hair colors that look natural per skin tone
export const HAIR_COLORS: Record<AvatarColor, { main: string; highlight: string }> = {
  light: { main: "#8B6914", highlight: "#A88028" },
  lightmed: { main: "#5C3D1E", highlight: "#7A5230" },
  medium: { main: "#2C1810", highlight: "#3D2418" },
  mediumdark: { main: "#1A0E08", highlight: "#2A1C12" },
  dark: { main: "#0F0A06", highlight: "#1E1410" },
};

// Cheek blush colors per skin tone
export const BLUSH_COLORS: Record<AvatarColor, string> = {
  light: "#E8967C",
  lightmed: "#C87860",
  medium: "#A06048",
  mediumdark: "#7A4838",
  dark: "#6B3C2C",
};

// Player game colors for UI identification (name colors, score colors)
// These are NOT part of the avatar — they're assigned by player index
export const PLAYER_GAME_COLORS = ["#6C5CE7", "#22C55E", "#F59E0B", "#EF4444"];
export const PLAYER_GAME_COLORS_BG = ["bg-accent", "bg-correct", "bg-gold", "bg-wrong"];

// i18n labels for hairstyles
export const HAIR_LABELS: Record<HeadShape, { en: string; de: string; es: string }> = {
  short: { en: "Short", de: "Kurz", es: "Corto" },
  long: { en: "Long", de: "Lang", es: "Largo" },
  curly: { en: "Curly", de: "Lockig", es: "Rizado" },
  spiky: { en: "Spiky", de: "Stachelig", es: "Puntiagudo" },
  bald: { en: "Bald", de: "Glatze", es: "Calvo" },
};

export const DEFAULT_AVATARS: AvatarConfig[] = [
  { headShape: "short", color: "light", accessory: "none" },
  { headShape: "curly", color: "medium", accessory: "none" },
  { headShape: "long", color: "lightmed", accessory: "none" },
  { headShape: "spiky", color: "dark", accessory: "none" },
];
