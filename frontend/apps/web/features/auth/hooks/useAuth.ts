'use client';

import { authApi } from '@zavora/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import type { LoginCredentials, RegisterPayload } from '@zavora/types';
import { ROUTES } from '@zavora/config';

export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.me,
    enabled: isAuthenticated,
  });
}

export function useLogin() {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: async (tokens) => {
      // Fetch user after getting tokens
      const { setAuth: sa } = useAuthStore.getState();
      // Temporarily store tokens so the API client can use them
      sa({ id: 0, email: '', firstName: '', lastName: '', role: 'customer', isActive: true, isVerified: true, createdAt: '' }, tokens.access, tokens.refresh);
      const user = await authApi.me();
      setAuth(user, tokens.access, tokens.refresh);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push(ROUTES.home);
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: ({ user, tokens }) => {
      setAuth(user, tokens.access, tokens.refresh);
      router.push(ROUTES.home);
    },
  });
}

export function useLogout() {
  const { clearAuth, refreshToken } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(refreshToken ?? ''),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      router.push(ROUTES.login);
    },
  });
}
