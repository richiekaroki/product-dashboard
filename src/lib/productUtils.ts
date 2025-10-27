import { Product } from "../types/product";
import { SortOption } from "../components/SortDropdown";

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export function filterByPrice(products: Product[], min: number, max: number): Product[] {
  return products.filter(p => p.price >= min && p.price <= max);
}

export function getRelatedProducts(products: Product[], currentProduct: Product, limit: number = 4): Product[] {
  return products
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, limit);
}

export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 1000 };

  const prices = products.map(p => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices))
  };
}
