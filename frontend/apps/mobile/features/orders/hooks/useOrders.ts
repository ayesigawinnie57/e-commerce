import { ordersApi } from '@zavora/api';
import type { CreateOrderPayload } from '@zavora/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useOrders() {
  return useQuery({ queryKey: ['orders'], queryFn: ordersApi.list });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.get(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => ordersApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
