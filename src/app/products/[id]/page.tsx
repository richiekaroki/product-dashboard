// src/app/products/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";
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
    enabled: !!id, // only run if id exists
  });

  if (isLoading) return <SkeletonCard />;
  if (isError || !data) return <ErrorMessage onRetry={refetch} />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-700 hover:underline dark:text-gray-300"
      >
        ← Back
      </button>

      {/* Product Details */}
      <div className="card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div>
            <ImageCarousel images={data.images} alt={data.title} />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {data.title}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ⭐ {data.rating}
              </span>
              <span className="text-gray-400 dark:text-gray-600">|</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {data.brand}
              </span>
            </div>

            <div className="mb-6">
              <StockIndicator stock={data.stock} />
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {data.description}
            </p>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${data.price}
                </span>
                {data.discountPercentage && data.discountPercentage > 0 && (
                  <span className="text-lg text-green-600 dark:text-green-400 font-semibold">
                    {data.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            <ProductBadges product={data} />

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Category</p>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">
                  {data.category}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Brand</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {data.brand}
                </p>
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
