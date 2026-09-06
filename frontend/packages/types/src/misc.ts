import type { ProductListItem } from './product';
import type { User } from './user';

export interface Review {
  id: number;
  product: Pick<ProductListItem, 'id' | 'name' | 'slug'>;
  user: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'>;
  rating: number;
  title?: string;
  body: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface CreateReviewPayload {
  productId: number;
  rating: number;
  title?: string;
  body: string;
  images?: string[];
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface Wishlist {
  id: number;
  items: WishlistItem[];
}

export interface WishlistItem {
  id: number;
  product: ProductListItem;
  addedAt: string;
}

export interface DeliveryMethod {
  id: number;
  name: string;
  description?: string;
  price: string;
  estimatedDays: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: string;
  minimumOrder?: string;
  expiresAt?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  imageUrl?: string;
  backgroundColor?: string;
}

export interface CategorySection {
  category: import('./category').Category;
  products: import('./product').ProductListItem[];
}

export interface HomepageData {
  heroBanners: Banner[];
  categories: import('./category').Category[];
  flashDeals: {
    products: import('./product').ProductListItem[];
    endsAt?: string;
  };
  popularProducts: import('./product').ProductListItem[];
  trendingProducts: import('./product').ProductListItem[];
  promotionalBanner?: Banner;
  categorySections: CategorySection[];
  brands: Brand[];
}
