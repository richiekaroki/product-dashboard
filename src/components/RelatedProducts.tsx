"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../lib/api";
import { getRelatedProducts } from "../lib/productUtils";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const relatedProducts = getRelatedProducts(data.products, currentProduct, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
