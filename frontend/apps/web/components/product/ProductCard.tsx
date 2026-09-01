'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { ProductListItem } from '@zavora/types';
import { formatPrice, calculateDiscount } from '@zavora/utils';
import { ROUTES } from '@zavora/config';
import { useAddToCart, useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/useQueries';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';

interface ProductCardProps {
  product: ProductListItem;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: wishlist } = useWishlist();
  const addToCart = useAddToCart();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : (product.discount ?? 0);

  const wishlistItem = wishlist?.items.find((i) => i.product.id === product.id);
  const isWishlisted = !!wishlistItem;

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { router.push(ROUTES.login); return; }
    if (isWishlisted && wishlistItem) {
      removeFromWishlist.mutate(wishlistItem.id);
    } else {
      addToWishlist.mutate(product.id);
    }
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { router.push(ROUTES.login); return; }
    addToCart.mutate({ productId: product.id, quantity: 1 });
  }

  return (
    <div className={cn('group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md', className)}>
      {/* Image */}
      <Link href={ROUTES.product(product.slug)} className="relative block aspect-square overflow-hidden bg-slate-100">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage.url}
            alt={product.primaryImage.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <span className="text-4xl">📦</span>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="text-sm font-semibold text-slate-500">Out of stock</span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-sm transition-all',
            isWishlisted
              ? 'border-red-200 text-red-500'
              : 'border-slate-200 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link href={ROUTES.product(product.slug)}>
          <p className="line-clamp-2 text-sm font-medium text-slate-800 hover:text-orange-500 transition-colors">
            {product.name}
          </p>
        </Link>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-slate-400">({product.reviewCount})</span>
          </div>
        )}

        {/* Seller */}
        <p className="text-xs text-slate-400 truncate">{product.seller.storeName}</p>

        {/* Price row */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-base font-bold text-slate-900">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable || addToCart.isPending}
            aria-label="Add to cart"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-40 transition-colors"
          >
            {addToCart.isPending ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
