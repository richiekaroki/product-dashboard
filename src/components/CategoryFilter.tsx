// src/components/CategoryFilter.tsx
"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";

export default function CategoryFilter({
  products,
  value,
  onChange,
}: {
  products: Product[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCats = Array.from(
        new Set(products.map((p) => p.category))
      );
      setCategories(uniqueCats);
    }
  }, [products]);

  if (products.length === 0) {
    return (
      <select className="input md:w-48" disabled>
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input md:w-48"
    >
      <option value="all">All Categories</option>
      {categories.map((c) => (
        <option key={c} value={c} className="capitalize">
          {c}
        </option>
      ))}
    </select>
  );
}
