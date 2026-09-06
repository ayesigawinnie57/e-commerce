'use client';

import { useFeaturedProducts } from '@/features/products/hooks/useProducts';
import { ProductGrid } from '@/components/product/ProductGrid';

export function FeaturedProducts() {
  const { data, isLoading } = useFeaturedProducts();

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Featured Products</h2>
      <ProductGrid products={data} loading={isLoading} />
    </section>
  );
}
