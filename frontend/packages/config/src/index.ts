export const APP_NAME = 'Zavora';
export const APP_DESCRIPTION = 'Multi-vendor marketplace';

export const PAGINATION_PAGE_SIZE = 24;
export const SEARCH_DEBOUNCE_MS = 400;
export const CART_STALE_TIME = 1000 * 60 * 2; // 2 min
export const QUERY_STALE_TIME = 1000 * 60 * 5; // 5 min

export const ROUTES = {
  home: '/',
  products: '/products',
  product: (slug: string) => `/products/${slug}`,
  category: (slug: string) => `/categories/${slug}`,
  seller: (slug: string) => `/sellers/${slug}`,
  cart: '/cart',
  checkout: '/checkout',
  orderConfirmation: (id: number) => `/orders/${id}/confirmation`,
  orders: '/account/orders',
  order: (id: number) => `/account/orders/${id}`,
  wishlist: '/account/wishlist',
  profile: '/account/profile',
  addresses: '/account/addresses',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  search: '/search',
  sellerRegister: '/sellers/register',
  deals: '/deals',
  brands: '/brands',
  brand: (slug: string) => `/brands/${slug}`,
} as const;
