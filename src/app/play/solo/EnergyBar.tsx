"use client";

import { useState, useEffect } from "react";
import { getEnergyRefillCountdown } from "@/lib/journeyStorage";
import { MAX_ENERGY } from "@/lib/journeyConfig";

interface EnergyBarProps {
  energy: number;
}

export default function EnergyBar({ energy }: EnergyBarProps) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (energy >= MAX_ENERGY) return;
    const update = () => setCountdown(getEnergyRefillCountdown());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [energy]);

  return (
    <div className="flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 game-shadow">
      {Array.from({ length: MAX_ENERGY }).map((_, i) => (
        <span
          key={i}
          className={`text-base transition-all duration-300 ${
            i < energy ? "scale-100 opacity-100" : "scale-75 opacity-20 grayscale"
          }`}
        >
          &#9889;
        </span>
      ))}
      <span className="ml-1 text-xs font-extrabold text-gold">{energy}</span>
      {energy < MAX_ENERGY && countdown && (
        <span className="ml-1 text-[10px] text-text-dim">{countdown}</span>
      )}
    </div>
  );
}
