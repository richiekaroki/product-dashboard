"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../lib/api";
import { getPriceRange } from "../lib/productUtils";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import SortDropdown, { SortOption } from "../components/SortDropdown";
import ViewToggle, { ViewMode } from "../components/ViewToggle";
import PriceRangeFilter from "../components/PriceRangeFilter";

function HomePageContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const priceRange = useMemo(() => {
    if (!data?.products) return { min: 0, max: 10000 };
    return getPriceRange(data.products);
  }, [data]);

  useEffect(() => {
    if (priceRange) {
      setPriceMin(priceRange.min);
      setPriceMax(priceRange.max);
    }
  }, [priceRange]);

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

      {/* Filters and Controls */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <PriceRangeFilter
              min={priceMin}
              max={priceMax}
              onChange={(min, max) => {
                setPriceMin(min);
                setPriceMax(max);
              }}
            />
          </div>
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        search={search}
        category={category}
        sortBy={sortBy}
        viewMode={viewMode}
        priceMin={priceMin}
        priceMax={priceMax}
      />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-4 max-w-7xl mx-auto">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
