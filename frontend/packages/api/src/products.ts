import type { PaginatedResponse, Product, ProductFilters, ProductListItem } from '@zavora/types';
import { buildQueryString } from '@zavora/utils';
import { api } from './client';

export const productsApi = {
  list: (filters: ProductFilters = {}) => {
    const params: Record<string, unknown> = { ...filters };
    return api.get<PaginatedResponse<ProductListItem>>(`/api/products/?${buildQueryString(params)}`);
  },

  get: (slug: string) => api.get<Product>(`/api/products/${slug}/`),

  featured: () => api.get<ProductListItem[]>('/api/products/featured/'),

  flashSales: () => api.get<ProductListItem[]>('/api/products/flash-sales/'),

  related: (slug: string) => api.get<ProductListItem[]>(`/api/products/${slug}/related/`),

  search: (query: string, filters: Omit<ProductFilters, 'search'> = {}) => {
    const params: Record<string, unknown> = { ...filters };
    return api.get<PaginatedResponse<ProductListItem>>(
      `/api/products/?search=${encodeURIComponent(query)}&${buildQueryString(params)}`
    );
  },
};
