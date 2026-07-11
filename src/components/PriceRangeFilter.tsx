"use client";

import { useState, useEffect } from "react";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  useEffect(() => {
    const timer = setTimeout(() => {
      const clampedMin = Math.max(0, minValue);
      const clampedMax = Math.max(clampedMin, maxValue);
      onChange(clampedMin, clampedMax);
    }, 300);
    return () => clearTimeout(timer);
  }, [minValue, maxValue, onChange]);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
        Price:
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
          placeholder="Min"
          className="input w-20 text-sm"
        />
        <span className="text-slate-400 dark:text-slate-500">&ndash;</span>
        <input
          type="number"
          min={0}
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
          placeholder="Max"
          className="input w-20 text-sm"
        />
      </div>
    </div>
  );
}
