import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";
import ProductBadges from "./ProductBadges";
import StockIndicator from "./StockIndicator";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="card flex flex-col sm:flex-row gap-4 hover:shadow-md transition-colors duration-200"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}
        height={200}
        className="rounded-md w-full sm:w-48 h-48 object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ⭐ {product.rating}
          </span>
          <StockIndicator stock={product.stock} />
        </div>
        <ProductBadges product={product} />
      </div>
    </Link>
  );
}
