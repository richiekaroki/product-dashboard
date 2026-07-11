// src/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "../types/product";
import DiscountBadge from "./DiscountBadge";
import ProductBadges from "./ProductBadges";
import StockIndicator from "./StockIndicator";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group card hover:shadow-card-hover hover:-translate-y-0.5 duration-200"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 340px" }}
    >
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
        <DiscountBadge percentage={product.discountPercentage} />
      </div>

      <div className="space-y-2">
        <h2 className="font-medium text-[15px] leading-snug text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
          {product.title}
        </h2>

        <StockIndicator stock={product.stock} />

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-slate-600 dark:text-slate-400 font-medium tabular-nums">
              {product.rating}
            </span>
          </div>
        </div>

        <ProductBadges product={product} />
      </div>
    </Link>
  );
}
