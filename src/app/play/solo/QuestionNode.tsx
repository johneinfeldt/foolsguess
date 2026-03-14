"use client";

export type NodeState = "locked" | "playable" | "partial" | "complete";

interface QuestionNodeProps {
  state: NodeState;
  index: number;
  onClick?: () => void;
}

const stateStyles: Record<NodeState, string> = {
  locked: "border-border bg-surface-alt text-text-dim cursor-not-allowed opacity-40",
  playable: "border-accent bg-accent/5 text-accent cursor-pointer hover:bg-accent/10",
  partial: "border-gold bg-gold/5 text-gold cursor-pointer hover:bg-gold/10",
  complete: "border-correct bg-correct/5 text-correct cursor-default",
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
      className={`press-effect flex h-11 w-11 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all ${stateStyles[state]}`}
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
