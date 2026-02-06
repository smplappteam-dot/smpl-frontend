// app/providers.tsx
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthBootstrap } from "@/features/auth/hooks/useAuthBootstrap";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  useAuthBootstrap();
  return (
    <QueryClientProvider client={queryClient}>
          {children}
    </QueryClientProvider>
  );
}
