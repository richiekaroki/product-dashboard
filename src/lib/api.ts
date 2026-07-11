// src/lib/api.ts
import axios from "axios";
import { Product, ProductsResponse } from "../types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com/products";

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
  const { data } = await apiClient.get<ProductsResponse>(BASE_URL);
  return data;
}

// Fetch product by ID
export async function getProductById(id: string | number): Promise<Product> {
  if (!id || id === "undefined") {
    throw new ApiError("Invalid product ID");
  }

  const { data } = await apiClient.get<Product>(`${BASE_URL}/${id}`);
  return data;
}


