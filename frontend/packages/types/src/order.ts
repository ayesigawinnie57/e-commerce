import type { Address } from './address';
import type { ProductListItem, ProductVariant } from './product';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: number;
  product: ProductListItem;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: string;
  discount: string;
  deliveryFee: string;
  total: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface CreateOrderPayload {
  addressId: number;
  deliveryMethodId: number;
  couponCode?: string;
  notes?: string;
}
