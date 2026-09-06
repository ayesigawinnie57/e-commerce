'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Star } from 'lucide-react';
import { ROUTES } from '@zavora/config';
import { Skeleton } from '@/components/ui';
import { useFlashSales } from '@/hooks/useQueries';
import { formatPrice, calculateDiscount } from '@zavora/utils';
import { useAddToCart } from '@/hooks/useQueries';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import type { ProductListItem } from '@zavora/types';

function useCountdown(endsAt?: string) {
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    if (!endsAt) return;
    function tick() {
      const diff = new Date(endsAt!).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        h: Math.floor(diff / 3600000).toString().padStart(2, '0'),
        m: Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0'),
        s: Math.floor((diff % 60000) / 1000).toString().padStart(2, '0'),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return timeLeft;
}

function FlashCard({ product }: { product: ProductListItem }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const addToCart = useAddToCart();

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : (product.discount ?? 0);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { router.push(ROUTES.login); return; }
    addToCart.mutate({ productId: product.id, quantity: 1 });
  }

  return (
    <Link
      href={ROUTES.product(product.slug)}
      className="group flex w-[160px] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow sm:w-[190px]"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage.url}
            alt={product.primaryImage.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">📦</div>
        )}
        {/* Discount ribbon */}
        {discount > 0 && (
          <span className="absolute right-0 top-3 bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Stock bar */}
      <div className="bg-amber-50 px-3 py-1.5 text-center text-[11px] font-medium text-amber-700">
        {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 text-xs font-medium text-slate-800">{product.name}</p>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-500">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-2">
          <p className="text-sm font-bold text-slate-900">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-2">
            {product.compareAtPrice && (
              <p className="text-xs text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
            {discount > 0 && (
              <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

const MOCK_PRODUCTS = [
  { id: 1, slug: 'samsung-a06', name: 'Samsung Galaxy A06 4G Dual SIM - 6.7" 64GB ROM...', price: '379000', compareAtPrice: '500000', stock: 10, rating: 3.9, reviewCount: 486, discount: 24, isAvailable: true, primaryImage: { url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/82/8141201/1.jpg', alt: 'Samsung A06' }, seller: { storeName: 'TechHub' } },
  { id: 2, slug: 'hisense-32-tv', name: 'Hisense 32 Inch HD LED Digital Free To Air TV...', price: '322300', compareAtPrice: '380000', stock: 8, rating: 3.6, reviewCount: 167, discount: 15, isAvailable: true, primaryImage: { url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/20/4361201/1.jpg', alt: 'Hisense TV' }, seller: { storeName: 'ElectroMart' } },
  { id: 3, slug: 'travelmate-laptop', name: 'Travelmate 12 Inch Laptop 4GB RAM 128GB SSD...', price: '345000', compareAtPrice: '800000', stock: 10, rating: 3.5, reviewCount: 161, discount: 57, isAvailable: true, primaryImage: { url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/93/6177201/1.jpg', alt: 'Laptop' }, seller: { storeName: 'CompuStore' } },
  { id: 4, slug: 'spark-gas-cooker', name: 'SPARK 50x50cm Full Gas Standing Cooker with G...', price: '289000', compareAtPrice: '400000', stock: 10, rating: 4.1, reviewCount: 25, discount: 28, isAvailable: true, primaryImage: { url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/52/9933201/1.jpg', alt: 'Gas Cooker' }, seller: { storeName: 'HomeAppliances' } },
  { id: 5, slug: 'samsung-a16', name: 'Samsung Galaxy A16 4G 6.7" 4GB RAM 128GB...', price: '515000', compareAtPrice: '700000', stock: 10, rating: 4, reviewCount: 113, discount: 26, isAvailable: true, primaryImage: { url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/0052301/1.jpg', alt: 'Samsung A16' }, seller: { storeName: 'TechHub' } },
  { id: 6, slug: 'roch-smart-tv', name: 'Roch 43 Inch Smart Android Frameless HD...', price: '524000', compareAtPrice: '800000', stock: 10, rating: 3.9, reviewCount: 69, discount: 35, isAvailable: true, primaryImage: { url: 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/2926301/1.jpg', alt: 'Smart TV' }, seller: { storeName: 'ElectroMart' } },
] as any[];

interface FlashDealsProps {
  endsAt?: string;
}

export function FlashDeals({ endsAt }: FlashDealsProps) {
  const { data: apiProducts, isLoading } = useFlashSales();
  const { h, m, s } = useCountdown(endsAt);
  const products = apiProducts?.length ? apiProducts : MOCK_PRODUCTS;

  return (
    <section className="overflow-hidden rounded-2xl">
      {/* Red header */}
      <div className="flex items-center justify-between bg-red-600 px-5 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">Flash Sales</h2>
          {endsAt && (
            <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white">
              <Clock className="h-3.5 w-3.5" />
              {h}h : {m}m : {s}s
            </div>
          )}
        </div>
        <Link
          href={ROUTES.deals}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
        >
          See All →
        </Link>
      </div>

      {/* Cards — horizontal scroll */}
      <div className="bg-red-600 px-4 pb-5">
        {isLoading ? (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex w-[160px] shrink-0 flex-col gap-2 sm:w-[190px]">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-5 w-1/3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {products.map((p) => <FlashCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
