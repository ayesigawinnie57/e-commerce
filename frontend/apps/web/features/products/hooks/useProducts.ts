import { productsApi } from '@zavora/api';
import type { ProductFilters } from '@zavora/types';
import { useQuery } from '@tanstack/react-query';

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.list(filters),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsApi.get(slug),
    enabled: !!slug,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productsApi.featured,
  });
}

export function useFlashSales() {
  return useQuery({
    queryKey: ['products', 'flash-sales'],
    queryFn: productsApi.flashSales,
  });
}

export function useRelatedProducts(slug: string) {
  return useQuery({
    queryKey: ['products', 'related', slug],
    queryFn: () => productsApi.related(slug),
    enabled: !!slug,
  });
}
