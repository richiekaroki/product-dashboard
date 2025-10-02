// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

// Configured query client for caching & retries
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // prevents refetching on tab switch
      retry: 2, // retry failed requests up to 2 times
      staleTime: 1000 * 60 * 2, // data stays fresh for 2 mins
    },
  },
});
