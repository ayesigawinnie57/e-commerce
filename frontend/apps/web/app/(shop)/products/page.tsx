import type { Metadata } from 'next';
import { ProductsView } from '@/features/products/components/ProductsView';

export const metadata: Metadata = { title: 'Products' };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">All Products</h1>
      <ProductsView initialFilters={params} />
    </div>
  );
}
