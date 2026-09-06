import { authApi } from '@zavora/api';
import type { LoginCredentials, RegisterPayload } from '@zavora/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth';

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
      useAuthStore.getState().setAuth(
        { id: 0, email: '', firstName: '', lastName: '', role: 'customer', isActive: true, isVerified: true, createdAt: '' },
        tokens.access,
        tokens.refresh
      );
      const user = await authApi.me();
      setAuth(user, tokens.access, tokens.refresh);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/(tabs)');
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
      router.replace('/(tabs)');
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
      router.replace('/(tabs)');
    },
  });
}
