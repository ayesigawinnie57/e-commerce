'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useUIStore } from '@/store/ui';
import { useCartQuery, useUpdateCartItem, useRemoveCartItem } from '@/features/cart/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@zavora/utils';
import { ROUTES } from '@zavora/config';

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore();
  const { data: cart, isLoading } = useCartQuery();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <h2 className="text-lg font-semibold">
            Cart {cart?.itemCount ? `(${cart.itemCount})` : ''}
          </h2>
          <button onClick={closeCart} className="rounded-lg p-1 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isLoading && <p className="text-sm text-slate-400">Loading cart…</p>}
          {!isLoading && !cart?.items.length && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <span className="text-5xl">🛒</span>
              <p className="mt-4 text-sm">Your cart is empty</p>
            </div>
          )}
          <ul className="flex flex-col gap-4">
            {cart?.items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
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
                  <p className="line-clamp-1 text-sm font-medium">{item.product.name}</p>
                  {item.variant && (
                    <p className="text-xs text-slate-400">{item.variant.name}: {item.variant.value}</p>
                  )}
                  <p className="text-sm font-semibold text-primary">{formatPrice(item.totalPrice)}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItem.mutate({ itemId: item.id, quantity: item.quantity - 1 })}
                      disabled={item.quantity <= 1}
                      className="rounded p-0.5 hover:bg-slate-100 disabled:opacity-40"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateItem.mutate({ itemId: item.id, quantity: item.quantity + 1 })}
                      className="rounded p-0.5 hover:bg-slate-100"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeItem.mutate(item.id)}
                      className="ml-auto rounded p-0.5 text-red-400 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {cart && cart.items.length > 0 && (
          <div className="border-t border-slate-200 px-4 py-4">
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
            </div>
            <Link href={ROUTES.checkout} onClick={closeCart}>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
