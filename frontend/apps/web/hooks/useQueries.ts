import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';
import {
  addressesApi,
  authApi,
  brandsApi,
  cartApi,
  categoriesApi,
  homepageApi,
  notificationsApi,
  ordersApi,
  productsApi,
  reviewsApi,
  sellersApi,
  usersApi,
  wishlistApi,
} from '@zavora/api';
import { CART_STALE_TIME, QUERY_STALE_TIME } from '@zavora/config';
import type {
  AddToCartPayload,
  CreateAddressPayload,
  CreateOrderPayload,
  CreateReviewPayload,
  ProductFilters,
  UpdateCartItemPayload,
} from '@zavora/types';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.me(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.list(filters),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsApi.get(slug),
    staleTime: QUERY_STALE_TIME,
    enabled: !!slug,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsApi.featured(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useFlashSales() {
  return useQuery({
    queryKey: ['products', 'flashSales'],
    queryFn: () => productsApi.flashSales(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useRelatedProducts(slug: string) {
  return useQuery({
    queryKey: ['products', slug, 'related'],
    queryFn: () => productsApi.related(slug),
    staleTime: QUERY_STALE_TIME,
    enabled: !!slug,
  });
}

export function useSearchProducts(query: string, filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', 'search', query, filters],
    queryFn: () => productsApi.search(query, filters),
    staleTime: QUERY_STALE_TIME,
    enabled: !!query,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoriesApi.get(slug),
    staleTime: QUERY_STALE_TIME,
    enabled: !!slug,
  });
}

export function useCategoryTree() {
  return useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: () => categoriesApi.tree(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useSellers() {
  return useQuery({
    queryKey: ['sellers'],
    queryFn: () => sellersApi.list(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useSeller(slug: string) {
  return useQuery({
    queryKey: ['seller', slug],
    queryFn: () => sellersApi.get(slug),
    staleTime: QUERY_STALE_TIME,
    enabled: !!slug,
  });
}

export function useCart() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get(),
    staleTime: CART_STALE_TIME,
    enabled: !!user,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartApi.addItem(payload),
    onSuccess: (cart) => queryClient.setQueryData(['cart'], cart),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, payload }: { itemId: number; payload: UpdateCartItemPayload }) =>
      cartApi.updateItem(itemId, payload),
    onSuccess: (cart) => queryClient.setQueryData(['cart'], cart),
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeItem(itemId),
    onSuccess: (cart) => queryClient.setQueryData(['cart'], cart),
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useWishlist() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApi.get(),
    staleTime: QUERY_STALE_TIME,
    enabled: !!user,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => wishlistApi.addItem(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => wishlistApi.removeItem(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });
}

export function useOrders() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.list(),
    staleTime: QUERY_STALE_TIME,
    enabled: !!user,
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.get(id),
    staleTime: QUERY_STALE_TIME,
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

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ordersApi.cancel(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
}

export function useAddresses() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressesApi.list(),
    staleTime: QUERY_STALE_TIME,
    enabled: !!user,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => addressesApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<CreateAddressPayload> }) =>
      addressesApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addressesApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => addressesApi.setDefault(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });
}

export function useProductReviews(productId: number) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewsApi.list(productId),
    staleTime: QUERY_STALE_TIME,
    enabled: !!productId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewsApi.create(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', payload.productId] });
    },
  });
}

export function useNotifications() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.list(),
    staleTime: QUERY_STALE_TIME / 2,
    enabled: !!user,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => notificationsApi.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });
}

export function useHomepage() {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: () => homepageApi.get(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: () => brandsApi.list(),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useTrendingProducts() {
  return useQuery({
    queryKey: ['products', 'trending'],
    queryFn: () => productsApi.list({ ordering: '-view_count', pageSize: 10 }),
    staleTime: QUERY_STALE_TIME,
  });
}

export function usePopularProducts() {
  return useQuery({
    queryKey: ['products', 'popular'],
    queryFn: () => productsApi.list({ ordering: '-sold_count', pageSize: 10 }),
    staleTime: QUERY_STALE_TIME,
  });
}
