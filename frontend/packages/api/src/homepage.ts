import type { Brand, HomepageData } from '@zavora/types';
import { api } from './client';

export const homepageApi = {
  get: () => api.get<HomepageData>('/api/homepage/'),
};

export const brandsApi = {
  list: () => api.get<Brand[]>('/api/brands/'),
  get: (slug: string) => api.get<Brand>(`/api/brands/${slug}/`),
};
