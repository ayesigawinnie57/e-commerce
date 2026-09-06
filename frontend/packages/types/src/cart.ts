import type { ProductListItem, ProductVariant } from './product';

export interface CartItem {
  id: number;
  product: ProductListItem;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: string;
  discount: string;
  deliveryFee: string;
  total: string;
  itemCount: number;
}

export interface AddToCartPayload {
  productId: number;
  variantId?: number;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
