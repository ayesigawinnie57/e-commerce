'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@zavora/config';
import { Skeleton } from '@/components/ui';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useBrands } from '@/hooks/useQueries';

export function BrandsSection() {
  const { data: brands, isLoading, isError, refetch } = useBrands();

  if (!isLoading && !isError && !brands?.length) return null;

  return (
    <section>
      <SectionHeader title="Popular Brands" />

      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-28 shrink-0 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <p className="text-sm text-slate-500">Unable to load brands.</p>
          <button onClick={() => refetch()} className="text-sm font-medium text-orange-500 hover:underline">Try Again</button>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {brands!.map((brand) => (
            <Link
              key={brand.id}
              href={ROUTES.brand(brand.slug)}
              className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 transition-all hover:border-orange-300 hover:shadow-md"
            >
              {brand.logo ? (
                <div className="relative h-8 w-20">
                  <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                </div>
              ) : (
                <span className="text-sm font-semibold text-slate-600">{brand.name}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
