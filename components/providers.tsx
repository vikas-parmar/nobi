"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable automatic refetching on window focus to prevent unnecessary reloads
            refetchOnWindowFocus: false,
            // Retry failed requests 3 times
            retry: 3,
            // Cache data for 5 minutes
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Keep data in cache for 10 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
