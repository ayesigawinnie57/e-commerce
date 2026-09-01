import type { Category } from './category';
import type { Seller } from './seller';

export interface ProductImage {
  id: number;
  url: string;
  alt?: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  value: string;
  price: string;
  compareAtPrice?: string;
  stock: number;
  sku: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  discount?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  category: Category;
  seller: Seller;
  brand?: string;
  sku: string;
  stock: number;
  isAvailable: boolean;
  specifications: ProductSpecification[];
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
}

export interface ProductListItem {
  id: number;
  slug: string;
  name: string;
  price: string;
  compareAtPrice?: string;
  discount?: number;
  primaryImage?: ProductImage;
  category: Pick<Category, 'id' | 'name' | 'slug'>;
  seller: Pick<Seller, 'id' | 'storeName'>;
  rating: number;
  reviewCount: number;
  stock: number;
  isAvailable: boolean;
}

export interface ProductFilters {
  category?: string;
  seller?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  inStock?: boolean;
  search?: string;
  ordering?: string;
  page?: number;
  pageSize?: number;
}
