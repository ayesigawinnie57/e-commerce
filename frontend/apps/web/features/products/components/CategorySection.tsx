'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@zavora/config';
import { Skeleton } from '@/components/ui';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useCategories } from '@/hooks/useQueries';

export function CategorySection() {
  const { data: categories, isLoading, isError, refetch } = useCategories();

  return (
    <section>
      <SectionHeader title="Shop by Category" viewAllHref="/categories" />

      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-3 w-14 rounded" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <p className="text-sm text-slate-500">Unable to load categories.</p>
          <button onClick={() => refetch()} className="text-sm font-medium text-orange-500 hover:underline">
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={ROUTES.category(cat.slug)}
              className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-center transition-all hover:border-orange-300 hover:shadow-md"
            >
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-orange-50">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                ) : (
                  <span className="text-2xl">🏷️</span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-700 group-hover:text-orange-500 transition-colors line-clamp-2">
                {cat.name}
              </span>
              {cat.productCount !== undefined && (
                <span className="text-[10px] text-slate-400">{cat.productCount} items</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
