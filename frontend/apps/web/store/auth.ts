import { configureTokenStore } from '@zavora/api';
import type { User } from '@zavora/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, access: string, refresh: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),
      clearAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
    }),
    { name: 'zavora-auth' }
  )
);

// Wire the API client to the auth store
configureTokenStore({
  getAccess: () => useAuthStore.getState().accessToken,
  getRefresh: () => useAuthStore.getState().refreshToken,
  setTokens: (access, refresh) => {
    const { user } = useAuthStore.getState();
    if (user) useAuthStore.getState().setAuth(user, access, refresh);
  },
  clearTokens: () => useAuthStore.getState().clearAuth(),
});
