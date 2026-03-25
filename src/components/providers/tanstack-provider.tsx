"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // never becomes stale
      gcTime: Infinity, // never garbage collected
    },
  },
});
export function TanstackProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// refetchOnWindowFocus: false, // no refetch on tab focus
// refetchOnMount: false, // no refetch on remount
// refetchOnReconnect: false, // no refetch on reconnect
