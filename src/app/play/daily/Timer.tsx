"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TimerProps {
  isActive: boolean;
  onTimeUp: () => void;
  questionIndex: number;
  duration?: number;
}

export default function Timer({ isActive, onTimeUp, questionIndex, duration = 60000 }: TimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const calledTimeUp = useRef(false);

  const stableOnTimeUp = useCallback(onTimeUp, [onTimeUp]);

  useEffect(() => {
    setRemaining(duration);
    startTimeRef.current = null;
    calledTimeUp.current = false;
  }, [questionIndex, duration]);

  useEffect(() => {
    if (!isActive) return;

    startTimeRef.current = Date.now();

    const tick = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const left = Math.max(0, duration - elapsed);
      setRemaining(left);

      if (left <= 0 && !calledTimeUp.current) {
        calledTimeUp.current = true;
        stableOnTimeUp();
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isActive, stableOnTimeUp, duration]);

  const percent = (remaining / duration) * 100;
  const seconds = Math.ceil(remaining / 1000);

  let barColor = "bg-accent";
  if (percent < 33) barColor = "bg-wrong";
  else if (percent < 66) barColor = "bg-gold";

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-alt">
        <div
          className={`h-full rounded-full transition-all duration-100 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className={`min-w-[3ch] text-right text-sm font-bold ${percent < 33 ? "text-wrong" : "text-text-muted"}`}>
        {seconds}s
      </span>
    </div>
  );
}
