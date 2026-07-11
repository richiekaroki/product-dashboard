// src/components/ProductBadges.tsx
import { Product } from "../types/product";

export default function ProductBadges({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="badge">
        {product.category}
      </span>
      <span className="badge">
        {product.brand}
      </span>
    </div>
  );
}
