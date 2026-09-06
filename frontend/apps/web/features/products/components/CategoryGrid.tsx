'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@zavora/api';
import { ROUTES } from '@zavora/config';
import { Skeleton } from '@/components/ui';

export function CategoryGrid() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.list,
  });

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Shop by Category</h2>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={ROUTES.category(cat.slug)}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center transition-shadow hover:shadow-md"
            >
              {cat.image ? (
                <div className="relative h-12 w-12">
                  <Image src={cat.image} alt={cat.name} fill className="object-contain" />
                </div>
              ) : (
                <span className="text-3xl">🏷️</span>
              )}
              <span className="text-xs font-medium text-slate-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
