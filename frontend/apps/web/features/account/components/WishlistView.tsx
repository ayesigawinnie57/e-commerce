'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@zavora/api';
import { formatPrice } from '@zavora/utils';
import { ROUTES } from '@zavora/config';
import { Skeleton } from '@/components/ui';
import { Trash2 } from 'lucide-react';

export function WishlistView() {
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.get,
  });

  const removeItem = useMutation({
    mutationFn: (itemId: number) => wishlistApi.removeItem(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-xl" />
        ))}
      </div>
    );
  }

  if (!wishlist?.items.length) {
    return (
      <div className="flex flex-col items-center py-16 text-slate-400">
        <span className="text-5xl">❤️</span>
        <p className="mt-4 text-sm">Your wishlist is empty.</p>
        <Link href={ROUTES.products} className="mt-3 text-sm font-medium text-primary hover:underline">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-slate-900">My Wishlist ({wishlist.items.length})</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {wishlist.items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white">
            <Link href={ROUTES.product(item.product.slug)}>
              <div className="relative aspect-square bg-slate-100">
                {item.product.primaryImage ? (
                  <Image
                    src={item.product.primaryImage.url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl">📦</div>
                )}
              </div>
              <div className="p-3">
                <p className="line-clamp-2 text-sm font-medium text-slate-800">{item.product.name}</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{formatPrice(item.product.price)}</p>
              </div>
            </Link>
            <button
              onClick={() => removeItem.mutate(item.id)}
              className="absolute right-2 top-2 rounded-lg bg-white p-1.5 text-red-400 shadow-sm hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
