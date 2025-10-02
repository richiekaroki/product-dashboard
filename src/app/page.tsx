// src/app/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Check if there's a search query from global search
  useEffect(() => {
    const querySearch = searchParams.get("search");
    if (querySearch) {
      setSearch(querySearch);
    }
  }, [searchParams]);

  return (
    <main className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of products and find what you need
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      {/* Product Grid */}
      <ProductGrid search={search} category={category} />
    </main>
  );
}
