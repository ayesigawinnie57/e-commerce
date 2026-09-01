'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { sellersApi } from '@zavora/api';
import { ProductsView } from '@/features/products/components/ProductsView';
import { Skeleton } from '@/components/ui';
import { Star } from 'lucide-react';
import { use } from 'react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function SellerPage({ params }: Props) {
  const { slug } = use(params);
  const { data: seller, isLoading } = useQuery({
    queryKey: ['seller', slug],
    queryFn: () => sellersApi.get(slug),
  });

  return (
    <div className="container-page py-8">
      {isLoading ? (
        <Skeleton className="h-32 w-full rounded-xl" />
      ) : seller ? (
        <div className="mb-8 flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-6">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
            {seller.logo ? (
              <Image src={seller.logo} alt={seller.storeName} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-4xl">🏪</div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{seller.storeName}</h1>
              {seller.isVerified && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Verified</span>
              )}
            </div>
            {seller.description && <p className="mt-1 text-sm text-slate-500">{seller.description}</p>}
            <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
              <span>{seller.productCount} products</span>
              {seller.reviewCount > 0 && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {seller.rating.toFixed(1)} ({seller.reviewCount} reviews)
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <ProductsView initialFilters={seller ? { seller: String(seller.id) } : {}} />
    </div>
  );
}
