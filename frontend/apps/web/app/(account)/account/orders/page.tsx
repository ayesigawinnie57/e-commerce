import type { Metadata } from 'next';
import { OrdersView } from '@/features/orders/components/OrdersView';

export const metadata: Metadata = { title: 'My Orders' };

export default function OrdersPage() {
  return <OrdersView />;
}
