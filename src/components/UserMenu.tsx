"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/authContext";
import { useLang, t } from "@/lib/i18n";

export default function UserMenu() {
  const lang = useLang();
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <a
        href="/auth/login"
        className="text-sm font-semibold text-accent transition-colors hover:text-accent-light"
      >
        {t("auth.login", lang)}
      </a>
    );
  }

  const displayName =
    user.user_metadata?.display_name || user.email?.split("@")[0] || "Player";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-border-focus"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span className="hidden sm:inline">{displayName}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-border bg-surface shadow-lg">
          <a
            href="/profile"
            className="block px-4 py-2.5 text-sm transition-colors hover:bg-surface-alt"
          >
            {t("profile.title", lang)}
          </a>
          <a
            href="/leaderboard"
            className="block px-4 py-2.5 text-sm transition-colors hover:bg-surface-alt"
          >
            {t("leaderboard.title", lang)}
          </a>
          <button
            onClick={async () => {
              await signOut();
              setOpen(false);
            }}
            className="block w-full px-4 py-2.5 text-left text-sm text-wrong transition-colors hover:bg-surface-alt"
          >
            {t("auth.logout", lang)}
          </button>
        </div>
      )}
    </div>
  );
}
