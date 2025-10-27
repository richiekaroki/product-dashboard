"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../lib/api";
import { Product } from "../types/product";
import { sortProducts, filterByPrice } from "../lib/productUtils";
import { SortOption } from "./SortDropdown";
import { ViewMode } from "./ViewToggle";
import ErrorMessage from "./ErrorMessage";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import SkeletonCard from "./SkeletonCard";

export default function ProductGrid({
  search,
  category,
  sortBy,
  viewMode,
  priceMin,
  priceMax,
}: {
  search: string;
  category: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  priceMin: number;
  priceMax: number;
}) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );

  if (isError || !data) return <ErrorMessage onRetry={refetch} />;

  let products = data.products
    .filter((p: Product) =>
      search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((p: Product) =>
      category === "all" ? true : p.category === category
    );

  products = filterByPrice(products, priceMin, priceMax);
  products = sortProducts(products, sortBy);

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted dark:text-gray-400">
        No products found.
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((p: Product) => (
          <ProductListItem key={p.id} product={p} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p: Product) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
