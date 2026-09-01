'use client';

import { cartApi } from '@zavora/api';
import type { AddToCartPayload } from '@zavora/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CART_STALE_TIME } from '@zavora/config';
import { useAuthStore } from '@/store/auth';

const CART_KEY = ['cart'];

export function useCartQuery() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: CART_KEY,
    queryFn: cartApi.get,
    enabled: isAuthenticated,
    staleTime: CART_STALE_TIME,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartApi.addItem(payload),
    onSuccess: (cart) => queryClient.setQueryData(CART_KEY, cart),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      cartApi.updateItem(itemId, { quantity }),
    onSuccess: (cart) => queryClient.setQueryData(CART_KEY, cart),
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeItem(itemId),
    onSuccess: (cart) => queryClient.setQueryData(CART_KEY, cart),
  });
}
