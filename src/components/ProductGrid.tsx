// src/components/ProductGrid.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../lib/api";
import { Product } from "../types/product";
import ErrorMessage from "./ErrorMessage";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

export default function ProductGrid({
  search,
  category,
}: {
  search: string;
  category: string;
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

  const products = data.products
    .filter((p: Product) =>
      search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((p: Product) =>
      category === "all" ? true : p.category === category
    );

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted dark:text-gray-400">
        No products found.
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
