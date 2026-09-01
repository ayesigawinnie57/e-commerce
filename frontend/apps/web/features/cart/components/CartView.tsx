'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartQuery, useUpdateCartItem, useRemoveCartItem } from '@/features/cart/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui';
import { formatPrice } from '@zavora/utils';
import { ROUTES } from '@zavora/config';

export function CartView() {
  const { data: cart, isLoading } = useCartQuery();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!cart?.items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <span className="text-6xl">🛒</span>
        <p className="mt-4 text-lg font-medium">Your cart is empty</p>
        <Link href={ROUTES.products} className="mt-4">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Items */}
      <div className="lg:col-span-2">
        <ul className="flex flex-col gap-4">
          {cart.items.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {item.product.primaryImage && (
                  <Image
                    src={item.product.primaryImage.url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Link
                  href={ROUTES.product(item.product.slug)}
                  className="font-medium text-slate-800 hover:text-primary"
                >
                  {item.product.name}
                </Link>
                {item.variant && (
                  <p className="text-xs text-slate-400">
                    {item.variant.name}: {item.variant.value}
                  </p>
                )}
                <p className="text-sm font-semibold text-primary">{formatPrice(item.totalPrice)}</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() =>
                        updateItem.mutate({ itemId: item.id, quantity: item.quantity - 1 })
                      }
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 hover:bg-slate-50 disabled:opacity-40"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateItem.mutate({ itemId: item.id, quantity: item.quantity + 1 })
                      }
                      className="px-2 py-1 hover:bg-slate-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem.mutate(item.id)}
                    className="ml-auto text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="h-fit rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Order Summary</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span>{formatPrice(cart.subtotal)}</span>
          </div>
          {parseFloat(cart.discount) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(cart.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery</span>
            <span>
              {parseFloat(cart.deliveryFee) === 0 ? 'Free' : formatPrice(cart.deliveryFee)}
            </span>
          </div>
          <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-semibold">
            <span>Total</span>
            <span className="text-lg">{formatPrice(cart.total)}</span>
          </div>
        </div>
        <Link href={ROUTES.checkout} className="mt-6 block">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </Link>
        <Link href={ROUTES.products} className="mt-3 block">
          <Button variant="ghost" className="w-full" size="sm">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
