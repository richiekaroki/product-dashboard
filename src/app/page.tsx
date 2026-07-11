"use client";

import { Suspense, useState, useMemo, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../lib/api";
import { getPriceRange } from "../lib/productUtils";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import SortDropdown, { SortOption } from "../components/SortDropdown";
import ViewToggle, { ViewMode } from "../components/ViewToggle";
import PriceRangeFilter from "../components/PriceRangeFilter";
import ErrorMessage from "../components/ErrorMessage";
import { X } from "lucide-react";

const EMPTY_PRODUCTS: never[] = [];

function HomePageContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const { data, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = data?.products ?? EMPTY_PRODUCTS;

  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 10000 };
    return getPriceRange(products);
  }, [products]);

  const [priceMin, setPriceMin] = useState(priceRange.min);
  const [priceMax, setPriceMax] = useState(priceRange.max);

  useEffect(() => {
    setPriceMin(priceRange.min);
    setPriceMax(priceRange.max);
  }, [priceRange.min, priceRange.max]);

  const handlePriceChange = useCallback((min: number, max: number) => {
    setPriceMin(() => min);
    setPriceMax(() => max);
  }, []);

  const hasActiveFilters = search || category !== "all" || sortBy !== "name-asc" || priceMin > priceRange.min || priceMax < priceRange.max;

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("all");
    setSortBy("name-asc");
    setPriceMin(priceRange.min);
    setPriceMax(priceRange.max);
  }, [priceRange.min, priceRange.max]);

  if (isError) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <ErrorMessage onRetry={refetch} />
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
          Products
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Browse our collection and find what you need
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="space-y-3">
        {/* Primary: Search + Category */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            products={products}
            value={category}
            onChange={setCategory}
          />
        </div>
        {/* Secondary: Sort + Price + View + Clear */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <PriceRangeFilter
              min={priceMin}
              max={priceMax}
              onChange={handlePriceChange}
            />
          </div>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors duration-150"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
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
    <Suspense fallback={<div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6"><div className="space-y-1"><div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" /><div className="h-4 w-56 bg-slate-100 dark:bg-slate-800/50 rounded-md animate-pulse" /></div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="card animate-pulse"><div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4" /><div className="space-y-2.5"><div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-3/4" /><div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-1/3" /><div className="flex items-center justify-between"><div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-md w-16" /><div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-12" /></div></div></div>)}</div></div>}>
      <HomePageContent />
    </Suspense>
  );
}
