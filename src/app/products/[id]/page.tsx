// src/app/products/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ErrorMessage from "../../../components/ErrorMessage";
import ProductBadges from "../../../components/ProductBadges";
import SkeletonCard from "../../../components/SkeletonCard";
import { getProductById } from "../../../lib/api";
import type { Product } from "../../../types/product";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // only run if id exists
  });

  if (isLoading) return <SkeletonCard />;
  if (isError || !data) return <ErrorMessage onRetry={refetch} />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-brand hover:underline dark:text-gray-300"
      >
        ← Back
      </button>

      {/* Product card */}
      <div className="card">
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={800}
          height={400}
          className="rounded-lg mb-4 w-full h-64 object-cover"
        />

        <h1 className="text-2xl font-semibold text-brand dark:text-white">
          {data.title}
        </h1>
        <p className="text-muted dark:text-gray-300 mt-2">{data.description}</p>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-lg font-bold text-brand dark:text-white">
            ${data.price}
          </span>
          <span className="text-sm text-muted dark:text-gray-400">
            ⭐ {data.rating}
          </span>
        </div>

        {/* Shared ProductBadges */}
        <ProductBadges product={data} />
      </div>
    </div>
  );
}
