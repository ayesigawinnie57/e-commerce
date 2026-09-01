'use client';

import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { ProductListItem } from '@zavora/types';

interface ProductSectionProps {
  title: string;
  products?: ProductListItem[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  viewAllHref?: string;
  viewAllLabel?: string;
  shopButtonLabel?: string;
  shopButtonHref?: string;
}

export function ProductSection({
  title,
  products,
  isLoading,
  isError,
  onRetry,
  viewAllHref,
  viewAllLabel,
  shopButtonLabel,
  shopButtonHref,
}: ProductSectionProps) {
  if (!isLoading && !isError && !products?.length) return null;

  return (
    <section>
      <SectionHeader title={title} viewAllHref={viewAllHref} viewAllLabel={viewAllLabel} />
      <ProductGrid
        products={products}
        loading={isLoading}
        error={isError}
        onRetry={onRetry}
      />
      {shopButtonLabel && shopButtonHref && (
        <div className="mt-6 text-center">
          <Link
            href={shopButtonHref}
            className="inline-flex items-center gap-2 rounded-xl border border-orange-500 px-6 py-2.5 text-sm font-semibold text-orange-500 hover:bg-orange-50 transition-colors"
          >
            {shopButtonLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
