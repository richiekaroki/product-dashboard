"use client";

import { useMemo } from "react";
import { Product } from "../types/product";
import { SortOption } from "./SortDropdown";
import { ViewMode } from "./ViewToggle";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import SkeletonCard from "./SkeletonCard";
import { PackageSearch } from "lucide-react";

export default function ProductGrid({
  products,
  search,
  category,
  sortBy,
  viewMode,
  priceMin,
  priceMax,
}: {
  products: Product[];
  search: string;
  category: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  priceMin: number;
  priceMax: number;
}) {
  const filtered = useMemo(() => {
    if (products.length === 0) return products;

    let result = products;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(lowerSearch));
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (priceMin > 0 || priceMax < 10000) {
      result = result.filter((p) => p.price >= priceMin && p.price <= priceMax);
    }

    switch (sortBy) {
      case "name-asc":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, search, category, sortBy, priceMin, priceMax]);

  if (products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
          <PackageSearch className="w-7 h-7 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-base font-medium text-slate-900 dark:text-white mb-1">No products found</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  const resultCount = filtered.length;
  const totalCount = products.length;
  const hasActiveFilters = resultCount !== totalCount;

  return (
    <div className="space-y-4">
      {hasActiveFilters && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-medium text-slate-700 dark:text-slate-300">{resultCount}</span> of {totalCount} products
        </p>
      )}

      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filtered.map((p) => (
            <ProductListItem key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
