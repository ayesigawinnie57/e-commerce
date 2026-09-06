import type { Metadata } from 'next';
import { CartView } from '@/features/cart/components/CartView';

export const metadata: Metadata = { title: 'Cart' };

export default function CartPage() {
  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your Cart</h1>
      <CartView />
    </div>
  );
}
