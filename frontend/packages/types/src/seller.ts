import type { User } from './user';

export interface Seller {
  id: number;
  user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;
  storeName: string;
  storeSlug: string;
  logo?: string;
  banner?: string;
  description?: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  isVerified: boolean;
  joinedAt: string;
}
