import type { Metadata } from 'next';
import { CheckoutView } from '@/features/checkout/components/CheckoutView';

export const metadata: Metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Checkout</h1>
      <CheckoutView />
    </div>
  );
}
