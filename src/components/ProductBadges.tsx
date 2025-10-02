// src/components/ProductBadges.tsx
import { Product } from "../types/product";

export default function ProductBadges({ product }: { product: Product }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {/* Category */}
      <span
        className="px-2 py-1 rounded bg-gray-100 text-gray-700 
                   dark:bg-gray-800 dark:text-gray-200 text-xs"
      >
        {product.category}
      </span>

      {/* Brand */}
      <span
        className="px-2 py-1 rounded bg-gray-100 text-gray-700 
                   dark:bg-gray-800 dark:text-gray-200 text-xs"
      >
        {product.brand}
      </span>

      {/* Stock */}
      <span
        className="px-2 py-1 rounded bg-gray-100 text-gray-700 
                   dark:bg-gray-800 dark:text-gray-200 text-xs"
      >
        Stock: {product.stock}
      </span>
    </div>
  );
}
