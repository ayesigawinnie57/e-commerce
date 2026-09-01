'use client';

import { useFlashSales } from '@/hooks/useQueries';
import { ProductGrid } from '@/components/product/ProductGrid';

export default function DealsPage() {
  const { data, isLoading, isError, refetch } = useFlashSales();
  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">🔥 Flash Deals</h1>
      <ProductGrid
        products={data}
        loading={isLoading}
        error={isError}
        onRetry={refetch}
        columns="wide"
      />
    </div>
  );
}
