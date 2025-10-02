// src/lib/api.ts
import axios from "axios";
import { Product, ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com/products";

// Custom error class for API errors
export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status;

      // Handle specific HTTP status codes
      switch (status) {
        case 404:
          throw new ApiError("Requested resource not found", 404);
        case 500:
          throw new ApiError("Server error, please try again later", 500);
        case 503:
          throw new ApiError("Service temporarily unavailable", 503);
        default:
          throw new ApiError(message || "Network error occurred", status);
      }
    }
    throw new ApiError("An unexpected error occurred");
  }
);

// Fetch all products
export async function getProducts(): Promise<ProductsResponse> {
  try {
    const { data } = await apiClient.get<ProductsResponse>(BASE_URL);
    return data;
  } catch (error) {
    // Re-throw the error to be handled by React Query
    throw error;
  }
}

// Fetch product by ID
export async function getProductById(id: string | number): Promise<Product> {
  try {
    // Validate ID
    if (!id || id === "undefined") {
      throw new ApiError("Invalid product ID");
    }

    const { data } = await apiClient.get<Product>(`${BASE_URL}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// Search products (optional enhancement)
export async function searchProducts(query: string): Promise<ProductsResponse> {
  try {
    if (!query.trim()) {
      return getProducts(); // Return all products if empty query
    }

    const { data } = await apiClient.get<ProductsResponse>(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// Get products by category (optional enhancement)
export async function getProductsByCategory(
  category: string
): Promise<ProductsResponse> {
  try {
    if (category === "all") {
      return getProducts();
    }

    const { data } = await apiClient.get<ProductsResponse>(
      `${BASE_URL}/category/${encodeURIComponent(category)}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
