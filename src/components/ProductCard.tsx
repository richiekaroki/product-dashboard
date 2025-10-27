// src/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";
import ProductBadges from "./ProductBadges";
import StockIndicator from "./StockIndicator";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="card hover:shadow-md transition-colors duration-200"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={400}
        height={300}
        className="rounded-md mb-3 w-full h-48 object-cover"
      />
      <h2 className="font-medium truncate text-gray-900 dark:text-white mb-1">
        {product.title}
      </h2>
      <div className="mb-2">
        <StockIndicator stock={product.stock} />
      </div>
      <p className="text-gray-900 dark:text-white font-semibold text-lg mb-1">${product.price}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        ⭐ {product.rating}
      </p>
      <ProductBadges product={product} />
    </Link>
  );
}
