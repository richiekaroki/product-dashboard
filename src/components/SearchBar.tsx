// src/components/SearchBar.tsx
"use client";

import { useEffect, useState } from "react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(localValue), 300);
    return () => clearTimeout(timeout);
  }, [localValue, onChange]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      aria-label="Search products"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className="input md:w-64"
    />
  );
}
