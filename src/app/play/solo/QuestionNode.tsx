"use client";

export type NodeState = "locked" | "playable" | "partial" | "complete";

interface QuestionNodeProps {
  state: NodeState;
  index: number;
  onClick?: () => void;
}

const stateStyles: Record<NodeState, string> = {
  locked: "border-border bg-surface text-text-dim cursor-not-allowed",
  playable: "border-electric bg-electric/10 text-electric cursor-pointer hover:bg-electric/20 animate-node-pulse",
  partial: "border-gold bg-gold/10 text-gold cursor-pointer hover:bg-gold/20",
  complete: "border-neon-green bg-neon-green/10 text-neon-green cursor-default",
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
      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${stateStyles[state]}`}
    >
      {state === "complete" ? (
        <span>&#10003;</span>
      ) : state === "locked" ? (
        <span className="text-xs">&#128274;</span>
      ) : (
        index + 1
      )}
    </button>
  );
}
