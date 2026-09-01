import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@zavora/config';

export const metadata: Metadata = { title: 'Order Confirmed' };

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="container-page flex flex-col items-center justify-center py-24 text-center">
      <span className="text-6xl">🎉</span>
      <h1 className="mt-6 text-3xl font-bold text-slate-900">Order Placed!</h1>
      <p className="mt-3 text-slate-500">
        Your order <span className="font-semibold text-slate-800">#{id}</span> has been
        confirmed. You will receive an email shortly.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href={ROUTES.order(Number(id))}>
          <Button variant="outline">Track Order</Button>
        </Link>
        <Link href={ROUTES.products}>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
