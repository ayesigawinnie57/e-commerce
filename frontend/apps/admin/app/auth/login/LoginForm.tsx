'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginSchema, type LoginInput } from '@zavora/validation';
import { authApi, configureTokenStore } from '@zavora/api';
import { APP_NAME } from '@zavora/config';

// Simple in-memory token store for admin
let _access: string | null = null;
let _refresh: string | null = null;
configureTokenStore({
  getAccess: () => _access,
  getRefresh: () => _refresh,
  setTokens: (a, r) => { _access = a; _refresh = r; },
  clearTokens: () => { _access = null; _refresh = null; },
});

export function AdminLoginForm() {
  const router = useRouter();
  const login = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (tokens) => {
      _access = tokens.access;
      _refresh = tokens.refresh;
      router.push('/dashboard');
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-1 text-xl font-bold text-slate-900">{APP_NAME} Admin</h1>
      <p className="mb-6 text-sm text-slate-500">Sign in to your admin account</p>

      {login.error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {login.error.message}
        </div>
      )}

      <form onSubmit={handleSubmit((d) => login.mutate(d))} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            {...register('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            {...register('password')}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={login.isPending}
          className="h-10 rounded-lg bg-primary text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {login.isPending ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
