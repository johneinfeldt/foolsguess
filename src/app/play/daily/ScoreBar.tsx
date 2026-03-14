"use client";

interface ScoreBarProps {
  score: number;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  return (
    <div className="text-center">
      <span className="text-sm text-text-muted">Score</span>
      <div className="text-2xl font-extrabold text-gold transition-all">
        {score}
      </div>
    </div>
  );
}
