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
      onChange(minValue, maxValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [minValue, maxValue, onChange]);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
        Price:
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
          placeholder="Min"
          className="input w-20 text-sm"
        />
        <span className="text-gray-500 dark:text-gray-400">-</span>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
          placeholder="Max"
          className="input w-20 text-sm"
        />
      </div>
    </div>
  );
}
