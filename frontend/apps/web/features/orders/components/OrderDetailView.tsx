'use client';

import Image from 'next/image';
import { useOrder } from '@/features/orders/hooks/useOrders';
import { Badge, Skeleton } from '@/components/ui';
import { formatPrice, formatDate } from '@zavora/utils';
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

export function OrderDetailView({ id }: { id: number }) {
  const { data: order, isLoading } = useOrder(id);

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;
  if (!order) return <p className="text-slate-400">Order not found.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Order #{order.orderNumber}</h1>
          <p className="text-sm text-slate-400">{formatDate(order.createdAt)}</p>
        </div>
        <Badge variant={statusVariant[order.status]}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      {/* Items */}
      <div className="rounded-xl border border-slate-200 bg-white">
        {order.items.map((item, i) => (
          <div
            key={item.id}
            className={`flex gap-4 p-4 ${i < order.items.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
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
            <div className="flex flex-1 justify-between text-sm">
              <div>
                <p className="font-medium text-slate-800">{item.product.name}</p>
                {item.variant && (
                  <p className="text-xs text-slate-400">
                    {item.variant.name}: {item.variant.value}
                  </p>
                )}
                <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">{formatPrice(item.totalPrice)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
        <p className="mb-2 font-semibold text-slate-900">Delivery Address</p>
        <p className="text-slate-600">
          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
        </p>
        <p className="text-slate-500">{order.shippingAddress.addressLine1}</p>
        <p className="text-slate-500">
          {order.shippingAddress.city}, {order.shippingAddress.state}
        </p>
        <p className="text-slate-500">{order.shippingAddress.phone}</p>
      </div>

      {/* Totals */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          {parseFloat(order.discount) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery</span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold">
            <span>Total</span>
            <span className="text-base">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
