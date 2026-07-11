// src/app/products/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";
import { ArrowLeft, Star } from "lucide-react";
import ErrorMessage from "../../../components/ErrorMessage";
import ProductBadges from "../../../components/ProductBadges";
import SkeletonCard from "../../../components/SkeletonCard";
import ImageCarousel from "../../../components/ImageCarousel";
import RelatedProducts from "../../../components/RelatedProducts";
import StockIndicator from "../../../components/StockIndicator";
import { getProductById } from "../../../lib/api";
import type { Product } from "../../../types/product";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  if (isLoading) return <SkeletonCard />;
  if (isError || !data) return <ErrorMessage onRetry={refetch} />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Product Details */}
      <div className="card p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Carousel */}
          <div className="p-6">
            <ImageCarousel images={data.images} alt={data.title} />
          </div>

          {/* Product Info */}
          <div className="p-6 lg:border-l border-slate-200/80 dark:border-slate-800/80">
            <div className="space-y-5">
              {/* Title and Rating */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
                  {data.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                      {data.rating}
                    </span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {data.brand}
                  </span>
                </div>
              </div>

              {/* Stock */}
              <StockIndicator stock={data.stock} />

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {data.description}
              </p>

              {/* Price */}
              <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    ${data.price.toFixed(2)}
                  </span>
                  {data.discountPercentage && data.discountPercentage > 0 && (
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">
                      {Math.round(data.discountPercentage)}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Badges */}
              <ProductBadges product={data} />

              {/* Category & Brand Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Category</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                    {data.category}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Brand</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {data.brand}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProduct={data} />
    </div>
  );
}
