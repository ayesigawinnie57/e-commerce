import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { QUERY_STALE_TIME } from '@zavora/config';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME,
            retry: 1,
          },
        },
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
