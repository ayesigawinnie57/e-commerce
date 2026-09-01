import type { AuthTokens, LoginCredentials, RegisterPayload, User } from '@zavora/types';
import { api } from './client';

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthTokens>('/api/auth/login/', credentials),

  register: (payload: RegisterPayload) =>
    api.post<{ user: User; tokens: AuthTokens }>('/api/auth/register/', payload),

  logout: (refreshToken: string) =>
    api.post<void>('/api/auth/logout/', { refresh: refreshToken }),

  me: () => api.get<User>('/api/auth/me/'),

  refreshToken: (refresh: string) =>
    api.post<AuthTokens>('/api/auth/token/refresh/', { refresh }),

  forgotPassword: (email: string) =>
    api.post<void>('/api/auth/password/reset/', { email }),

  resetPassword: (uid: string, token: string, password: string) =>
    api.post<void>('/api/auth/password/reset/confirm/', { uid, token, new_password: password }),
};
