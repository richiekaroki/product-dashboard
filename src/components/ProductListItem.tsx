import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "../types/product";
import DiscountBadge from "./DiscountBadge";
import ProductBadges from "./ProductBadges";
import StockIndicator from "./StockIndicator";

export default function ProductListItem({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group card flex flex-col sm:flex-row gap-4 hover:shadow-card-hover hover:-translate-y-0.5 duration-200"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 220px" }}
    >
      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <DiscountBadge percentage={product.discountPercentage} />
      </div>

      <div className="flex-1 min-w-0 py-1">
        <h2 className="font-semibold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
          {product.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium tabular-nums">
              {product.rating}
            </span>
          </div>
          <StockIndicator stock={product.stock} />
        </div>
        <ProductBadges product={product} />
      </div>
    </Link>
  );
}
