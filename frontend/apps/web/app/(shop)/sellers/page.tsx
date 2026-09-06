'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { sellersApi } from '@zavora/api';
import { Skeleton } from '@/components/ui';
import { Star } from 'lucide-react';
import { ROUTES } from '@zavora/config';

export default function SellersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['sellers'],
    queryFn: sellersApi.list,
  });

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">All Sellers</h1>
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.results.map((seller) => (
            <Link
              key={seller.id}
              href={ROUTES.seller(seller.storeSlug)}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow"
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
                {seller.logo ? (
                  <Image src={seller.logo} alt={seller.storeName} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">🏪</div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold text-slate-900">{seller.storeName}</p>
                  {seller.isVerified && (
                    <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">✓</span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{seller.productCount} products</p>
                {seller.reviewCount > 0 && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{seller.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({seller.reviewCount})</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
