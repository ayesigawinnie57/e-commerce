'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@zavora/config';
import { useBrands } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui';

export default function BrandsPage() {
  const { data: brands, isLoading } = useBrands();
  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Popular Brands</h1>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {brands?.map((brand) => (
            <Link key={brand.id} href={ROUTES.brand(brand.slug)}
              className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 hover:border-orange-300 hover:shadow-md transition-all">
              {brand.logo
                ? <div className="relative h-10 w-full"><Image src={brand.logo} alt={brand.name} fill className="object-contain" /></div>
                : <span className="text-sm font-semibold text-slate-600">{brand.name}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
