'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@zavora/api';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SEARCH_DEBOUNCE_MS } from '@zavora/config';

export function SearchView({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set('q', debouncedQuery);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router]);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => productsApi.search(debouncedQuery),
    enabled: debouncedQuery.length > 1,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, brands, categories…"
          className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {debouncedQuery.length > 1 && (
        <p className="text-sm text-slate-500">
          {isLoading ? 'Searching…' : `${data?.count ?? 0} results for "${debouncedQuery}"`}
        </p>
      )}

      <ProductGrid
        products={data?.results}
        loading={isLoading && debouncedQuery.length > 1}
      />
    </div>
  );
}
