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
    <div className="flex items-center gap-1.5">
      {Array.from({ length: MAX_ENERGY }).map((_, i) => (
        <span
          key={i}
          className={`text-lg transition-opacity ${
            i < energy ? "opacity-100" : "opacity-25"
          }`}
        >
          &#9889;
        </span>
      ))}
      <span className="ml-1 text-sm font-bold text-gold">{energy}</span>
      {energy < MAX_ENERGY && countdown && (
        <span className="ml-1 text-xs text-text-dim">{countdown}</span>
      )}
    </div>
  );
}
