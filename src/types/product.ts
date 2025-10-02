// src/types/product.ts

// Type for a single product
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// API response for /products
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
