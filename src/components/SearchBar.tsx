// src/components/SearchBar.tsx
"use client";

import { Search } from "lucide-react";
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
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="input pl-9 md:w-64"
      />
    </div>
  );
}
