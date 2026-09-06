import type {
  Address,
  AddToCartPayload,
  Cart,
  Category,
  CreateAddressPayload,
  CreateOrderPayload,
  CreateReviewPayload,
  DeliveryMethod,
  Notification,
  Order,
  PaginatedResponse,
  Review,
  Seller,
  UpdateCartItemPayload,
  User,
  Wishlist,
} from '@zavora/types';
import { api } from './client';

export const categoriesApi = {
  list: () => api.get<Category[]>('/api/categories/'),
  get: (slug: string) => api.get<Category>(`/api/categories/${slug}/`),
  tree: () => api.get<Category[]>('/api/categories/tree/'),
};

export const sellersApi = {
  list: () => api.get<PaginatedResponse<Seller>>('/api/sellers/'),
  get: (slug: string) => api.get<Seller>(`/api/sellers/${slug}/`),
};

export const cartApi = {
  get: () => api.get<Cart>('/api/cart/'),
  addItem: (payload: AddToCartPayload) => api.post<Cart>('/api/cart/items/', payload),
  updateItem: (itemId: number, payload: UpdateCartItemPayload) =>
    api.patch<Cart>(`/api/cart/items/${itemId}/`, payload),
  removeItem: (itemId: number) => api.delete<Cart>(`/api/cart/items/${itemId}/`),
  clear: () => api.delete<void>('/api/cart/'),
};

export const wishlistApi = {
  get: () => api.get<Wishlist>('/api/wishlist/'),
  addItem: (productId: number) => api.post<Wishlist>('/api/wishlist/items/', { productId }),
  removeItem: (itemId: number) => api.delete<Wishlist>(`/api/wishlist/items/${itemId}/`),
};

export const ordersApi = {
  list: () => api.get<PaginatedResponse<Order>>('/api/orders/'),
  get: (id: number) => api.get<Order>(`/api/orders/${id}/`),
  create: (payload: CreateOrderPayload) => api.post<Order>('/api/orders/', payload),
  cancel: (id: number) => api.post<Order>(`/api/orders/${id}/cancel/`, {}),
};

export const addressesApi = {
  list: () => api.get<Address[]>('/api/addresses/'),
  create: (payload: CreateAddressPayload) => api.post<Address>('/api/addresses/', payload),
  update: (id: number, payload: Partial<CreateAddressPayload>) =>
    api.patch<Address>(`/api/addresses/${id}/`, payload),
  delete: (id: number) => api.delete<void>(`/api/addresses/${id}/`),
  setDefault: (id: number) => api.post<Address>(`/api/addresses/${id}/set-default/`, {}),
};

export const reviewsApi = {
  list: (productId: number) =>
    api.get<PaginatedResponse<Review>>(`/api/products/${productId}/reviews/`),
  create: (payload: CreateReviewPayload) => api.post<Review>('/api/reviews/', payload),
};

export const notificationsApi = {
  list: () => api.get<PaginatedResponse<Notification>>('/api/notifications/'),
  markRead: (id: number) => api.post<Notification>(`/api/notifications/${id}/read/`, {}),
  markAllRead: () => api.post<void>('/api/notifications/read-all/', {}),
};

export const deliveryApi = {
  methods: () => api.get<DeliveryMethod[]>('/api/delivery/methods/'),
};

export const usersApi = {
  me: () => api.get<User>('/api/auth/me/'),
  update: (payload: Partial<Pick<User, 'firstName' | 'lastName' | 'phone' | 'avatar'>>) =>
    api.patch<User>('/api/auth/me/', payload),
};
