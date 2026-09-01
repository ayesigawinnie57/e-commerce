'use client';

import { useState } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { ProductFilters } from '@zavora/types';
import { PAGINATION_PAGE_SIZE } from '@zavora/config';
import { Button } from '@/components/ui/Button';

interface ProductsViewProps {
  initialFilters?: Record<string, string | undefined>;
}

export function ProductsView({ initialFilters = {} }: ProductsViewProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    pageSize: PAGINATION_PAGE_SIZE,
    ...initialFilters,
  });

  const { data, isLoading } = useProducts(filters);

  return (
    <div className="flex flex-col gap-6">
      {/* Filter bar — minimal for now */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={filters.ordering ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, ordering: e.target.value || undefined }))}
        >
          <option value="">Sort: Default</option>
          <option value="-created_at">Newest</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-rating">Top Rated</option>
        </select>
      </div>

      <ProductGrid products={data?.results} loading={isLoading} />

      {/* Pagination */}
      {data && (data.next || data.previous) && (
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            disabled={!data.previous}
            onClick={() => setFilters((f) => ({ ...f, page: (Number(f.page) || 1) - 1 }))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={!data.next}
            onClick={() => setFilters((f) => ({ ...f, page: (Number(f.page) || 1) + 1 }))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
