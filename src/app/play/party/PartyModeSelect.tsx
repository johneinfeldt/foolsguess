"use client";

import { useLang, t } from "@/lib/i18n";
import JesterMascot from "@/components/JesterMascot";

interface PartyModeSelectProps {
  onSelectSameDevice: () => void;
  onSelectOnline: () => void;
}

export default function PartyModeSelect({ onSelectSameDevice, onSelectOnline }: PartyModeSelectProps) {
  const lang = useLang();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
      <div className="animate-float mb-6">
        <JesterMascot size={80} mood="excited" />
      </div>
      <h1 className="mb-2 text-3xl font-extrabold">{t("party.title", lang)}</h1>
      <p className="mb-8 text-text-muted">{t("party.chooseMode", lang)}</p>

      <div className="grid w-full max-w-sm gap-4 sm:grid-cols-2">
        <button
          onClick={onSelectSameDevice}
          className="card card-hover press-effect flex flex-col items-center gap-3 p-6 text-center transition-all hover:scale-[1.02]"
        >
          <div className="text-4xl">&#128241;</div>
          <h3 className="text-lg font-bold">{t("party.sameDevice", lang)}</h3>
          <p className="text-sm text-text-muted">{t("party.sameDevice.desc", lang)}</p>
        </button>

        <button
          onClick={onSelectOnline}
          className="card card-hover press-effect flex flex-col items-center gap-3 p-6 text-center transition-all hover:scale-[1.02]"
        >
          <div className="text-4xl">&#127760;</div>
          <h3 className="text-lg font-bold">{t("party.online", lang)}</h3>
          <p className="text-sm text-text-muted">{t("party.online.desc", lang)}</p>
        </button>
      </div>
    </div>
  );
}
