import type { ApiError } from '@zavora/types';

export class ZavoraApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ZavoraApiError';
  }
}

type TokenStore = {
  getAccess: () => string | null;
  getRefresh: () => string | null;
  setTokens: (access: string, refresh: string) => void;
  clearTokens: () => void;
};

let tokenStore: TokenStore | null = null;

export function configureTokenStore(store: TokenStore) {
  tokenStore = store;
}

function getBaseUrl(): string {
  // Works for Next.js (NEXT_PUBLIC_) and Expo (EXPO_PUBLIC_)
  const url =
    (typeof process !== 'undefined' && process.env['NEXT_PUBLIC_API_URL']) ||
    (typeof process !== 'undefined' && process.env['EXPO_PUBLIC_API_URL']) ||
    'http://localhost:8000';
  return url.replace(/\/$/, '');
}

async function refreshAccessToken(): Promise<string | null> {
  if (!tokenStore) return null;
  const refresh = tokenStore.getRefresh();
  if (!refresh) return null;

  try {
    const res = await fetch(`${getBaseUrl()}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) {
      tokenStore.clearTokens();
      return null;
    }
    const data = (await res.json()) as { access: string; refresh?: string };
    tokenStore.setTokens(data.access, data.refresh ?? refresh);
    return data.access;
  } catch {
    tokenStore.clearTokens();
    return null;
  }
}

async function parseError(res: Response): Promise<ZavoraApiError> {
  let body: Partial<ApiError> = {};
  try {
    body = (await res.json()) as Partial<ApiError>;
  } catch {
    // ignore parse failure
  }
  return new ZavoraApiError(
    res.status,
    body.code ?? String(res.status),
    body.message ?? res.statusText,
    body.details
  );
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const access = tokenStore?.getAccess();
  if (access) headers['Authorization'] = `Bearer ${access}`;

  const res = await fetch(`${getBaseUrl()}${path}`, { ...options, headers });

  if (res.status === 401 && retry && tokenStore) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      return apiRequest<T>(path, options, false);
    }
    throw new ZavoraApiError(401, 'unauthorized', 'Session expired. Please log in again.');
  }

  if (!res.ok) throw await parseError(res);

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => apiRequest<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) =>
    apiRequest<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    apiRequest<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => apiRequest<T>(path, { method: 'DELETE' }),
};
