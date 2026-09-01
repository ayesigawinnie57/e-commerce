'use client';

import { authApi } from '@zavora/api';
import { useAuthStore } from '@/store/auth';
import { useCurrentUser } from './useQueries';

export function useAuth() {
  const { user, accessToken, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  return {
    user: user ?? currentUser,
    isAuthenticated: isAuthenticated || !!currentUser,
    isLoading: isLoadingUser,
    accessToken,
    setAuth,
    clearAuth,
  };
}
