"use client";

export type NodeState = "locked" | "playable" | "partial" | "complete";

interface QuestionNodeProps {
  state: NodeState;
  index: number;
  onClick?: () => void;
}

const stateStyles: Record<NodeState, string> = {
  locked: "border-border bg-surface text-text-dim cursor-not-allowed opacity-40",
  playable: "border-electric bg-gradient-to-br from-electric/20 to-electric/5 text-electric cursor-pointer hover:from-electric/30 hover:to-electric/10 animate-node-pulse glow-electric",
  partial: "border-gold bg-gradient-to-br from-gold/20 to-gold/5 text-gold cursor-pointer hover:from-gold/30 hover:to-gold/10 glow-gold",
  complete: "border-neon-green bg-gradient-to-br from-neon-green/20 to-neon-green/5 text-neon-green cursor-default glow-green",
};

export default function QuestionNode({ state, index, onClick }: QuestionNodeProps) {
  const handleClick = () => {
    if (state !== "locked" && state !== "complete" && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={state === "locked"}
      className={`press-effect flex h-12 w-12 items-center justify-center rounded-xl border-2 text-sm font-extrabold transition-all ${stateStyles[state]}`}
    >
      {state === "complete" ? (
        <span className="text-base">&#10003;</span>
      ) : state === "locked" ? (
        <span className="text-xs">&#128274;</span>
      ) : (
        index + 1
      )}
    </button>
  );
}
