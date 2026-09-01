import type { Metadata } from 'next';
import { ProductDetailView } from '@/features/products/components/ProductDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, ' ') };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <ProductDetailView slug={slug} />;
}
