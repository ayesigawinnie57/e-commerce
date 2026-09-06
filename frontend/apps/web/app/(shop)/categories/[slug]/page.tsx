import type { Metadata } from 'next';
import { ProductsView } from '@/features/products/components/ProductsView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, ' ') };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold capitalize text-slate-900">
        {slug.replace(/-/g, ' ')}
      </h1>
      <ProductsView initialFilters={{ category: slug }} />
    </div>
  );
}
