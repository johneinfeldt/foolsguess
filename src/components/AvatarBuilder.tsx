"use client";

import {
  AvatarConfig,
  HEAD_SHAPES,
  AVATAR_COLORS,
  ACCESSORIES,
  COLOR_HEX,
} from "@/lib/avatars";
import { useLang, t } from "@/lib/i18n";
import AvatarDisplay from "./AvatarDisplay";

interface AvatarBuilderProps {
  value: AvatarConfig;
  onChange: (avatar: AvatarConfig) => void;
}

export default function AvatarBuilder({ value, onChange }: AvatarBuilderProps) {
  const lang = useLang();

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Live preview */}
      <AvatarDisplay avatar={value} size={72} />

      {/* Hairstyle selector */}
      <div className="w-full">
        <p className="mb-1 text-center text-xs font-bold text-text-dim">
          {t("avatar.shape", lang)}
        </p>
        <div className="flex justify-center gap-1.5">
          {HEAD_SHAPES.map((shape) => (
            <button
              key={shape}
              type="button"
              onClick={() => onChange({ ...value, headShape: shape })}
              className={`rounded-xl border-2 p-1 transition-all ${
                value.headShape === shape
                  ? "border-accent scale-110 shadow-sm"
                  : "border-border hover:border-border-focus"
              }`}
            >
              <AvatarDisplay
                avatar={{ ...value, headShape: shape, accessory: "none" }}
                size={32}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Skin tone selector */}
      <div className="w-full">
        <p className="mb-1 text-center text-xs font-bold text-text-dim">
          {t("avatar.color", lang)}
        </p>
        <div className="flex justify-center gap-2">
          {AVATAR_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ ...value, color })}
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                value.color === color
                  ? "border-text scale-110 shadow-sm"
                  : "border-border hover:border-border-focus"
              }`}
              style={{ backgroundColor: COLOR_HEX[color] }}
            />
          ))}
        </div>
      </div>

      {/* Accessory selector */}
      <div className="w-full">
        <p className="mb-1 text-center text-xs font-bold text-text-dim">
          {t("avatar.accessory", lang)}
        </p>
        <div className="flex justify-center gap-1.5">
          {ACCESSORIES.map((acc) => (
            <button
              key={acc}
              type="button"
              onClick={() => onChange({ ...value, accessory: acc })}
              className={`rounded-xl border-2 p-1 transition-all ${
                value.accessory === acc
                  ? "border-accent scale-110 shadow-sm"
                  : "border-border hover:border-border-focus"
              }`}
            >
              <AvatarDisplay
                avatar={{ ...value, accessory: acc }}
                size={32}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
