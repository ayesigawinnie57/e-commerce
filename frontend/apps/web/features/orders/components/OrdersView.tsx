'use client';

import Link from 'next/link';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { Badge, Skeleton } from '@/components/ui';
import { formatPrice, formatDate } from '@zavora/utils';
import { ROUTES } from '@zavora/config';
import type { OrderStatus } from '@zavora/types';

const statusVariant: Record<OrderStatus, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error',
  refunded: 'default',
};

export function OrdersView() {
  const { data, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data?.results.length) {
    return (
      <div className="flex flex-col items-center py-16 text-slate-400">
        <span className="text-5xl">📦</span>
        <p className="mt-4 text-sm">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-slate-900">My Orders</h1>
      {data.results.map((order) => (
        <Link
          key={order.id}
          href={ROUTES.order(order.id)}
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <p className="font-medium text-slate-800">Order #{order.orderNumber}</p>
            <p className="text-xs text-slate-400">{formatDate(order.createdAt)}</p>
            <p className="text-xs text-slate-500">{order.items.length} item(s)</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={statusVariant[order.status]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
            <p className="font-semibold text-slate-900">{formatPrice(order.total)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
