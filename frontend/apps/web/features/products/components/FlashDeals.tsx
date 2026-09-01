'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@zavora/config';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui';
import { useFlashSales } from '@/hooks/useQueries';

function useCountdown(endsAt?: string) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!endsAt) return;
    function tick() {
      const diff = new Date(endsAt!).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Ended'); return; }
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setTimeLeft(`${h}:${m}:${s}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return timeLeft;
}

interface FlashDealsProps {
  endsAt?: string;
}

export function FlashDeals({ endsAt }: FlashDealsProps) {
  const { data: products, isLoading, isError, refetch } = useFlashSales();
  const countdown = useCountdown(endsAt);

  if (!isLoading && !isError && !products?.length) return null;

  return (
    <section className="rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">🔥 Flash Deals</h2>
          {countdown && (
            <div className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1 text-sm font-bold text-white">
              <span className="text-xs font-normal opacity-80">Ends in</span>
              {countdown}
            </div>
          )}
        </div>
        <Link href={ROUTES.deals} className="text-sm font-medium text-orange-500 hover:underline">
          View All →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-5 w-1/3 rounded" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <p className="text-sm text-slate-500">Unable to load flash deals.</p>
          <button onClick={() => refetch()} className="text-sm font-medium text-orange-500 hover:underline">
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products!.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
