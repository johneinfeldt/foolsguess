"use client";

interface DivisionTabProps {
  number: number;
  name: string;
  active: boolean;
  locked: boolean;
  onClick: () => void;
}

export default function DivisionTab({ number, name, active, locked, onClick }: DivisionTabProps) {
  if (locked) {
    return (
      <button
        disabled
        className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-dim opacity-50"
      >
        {name}
        <span className="text-xs">&#128274;</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-electric bg-electric/10 text-electric"
          : "border-border bg-surface text-text-muted hover:border-electric/30 hover:text-text-primary"
      }`}
    >
      {name}
    </button>
  );
}
