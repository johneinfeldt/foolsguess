"use client";

interface DivisionTabProps {
  number: number;
  name: string;
  active: boolean;
  locked: boolean;
  onClick: () => void;
}

export default function DivisionTab({ name, active, locked, onClick }: DivisionTabProps) {
  if (locked) {
    return (
      <button
        disabled
        className="flex items-center gap-1.5 rounded-full border-2 border-border bg-surface px-4 py-2 text-sm font-bold text-text-dim opacity-40"
      >
        {name}
        <span className="text-xs">&#128274;</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`press-effect rounded-full border-2 px-4 py-2 text-sm font-bold transition-all ${
        active
          ? "border-electric bg-gradient-to-r from-electric/20 to-electric/10 text-electric shadow-lg shadow-electric/10"
          : "border-border bg-surface text-text-muted hover:border-electric/30 hover:text-text-primary"
      }`}
    >
      {name}
    </button>
  );
}
