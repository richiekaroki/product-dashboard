// src/components/CategoryFilter.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import { Product } from "../types/product";

export default function CategoryFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (data?.products) {
      const uniqueCats = Array.from(
        new Set(data.products.map((p: Product) => p.category))
      );
      setCategories(uniqueCats);
    }
  }, [data]);

  if (isLoading)
    return (
      <select className="input" disabled>
        <option>Loading...</option>
      </select>
    );

  if (isError || !data)
    return (
      <select className="input" disabled>
        <option>Error</option>
      </select>
    );

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
