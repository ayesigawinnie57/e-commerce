import type { Metadata } from 'next';
import { SearchView } from '@/features/products/components/SearchView';

export const metadata: Metadata = { title: 'Search' };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="container-page py-8">
      <SearchView initialQuery={q ?? ''} />
    </div>
  );
}
