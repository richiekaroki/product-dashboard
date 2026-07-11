import { Product } from "../types/product";

export function sortProducts(products: Product[], sortBy: string): Product[] {
  switch (sortBy) {
    case 'name-asc':
      return products.toSorted((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return products.toSorted((a, b) => b.title.localeCompare(a.title));
    case 'price-asc':
      return products.toSorted((a, b) => a.price - b.price);
    case 'price-desc':
      return products.toSorted((a, b) => b.price - a.price);
    case 'rating-desc':
      return products.toSorted((a, b) => b.rating - a.rating);
    default:
      return products;
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

  let min = products[0].price;
  let max = products[0].price;

  for (let i = 1; i < products.length; i++) {
    const price = products[i].price;
    if (price < min) min = price;
    if (price > max) max = price;
  }

  return {
    min: Math.floor(min),
    max: Math.ceil(max),
  };
}
