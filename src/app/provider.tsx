// app/providers.tsx
"use client";

import { UtilProvider } from "@/context/UtilityContext";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
  
  return (
    <CacheProvider>
      <UtilProvider>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            
          {children}
          </QueryClientProvider>
        </ChakraProvider>
      </UtilProvider>
    </CacheProvider>
  );
}
