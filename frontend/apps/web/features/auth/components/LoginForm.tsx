'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@zavora/validation';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@zavora/config';

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-xl font-bold text-slate-900">Sign in to your account</h1>

      {login.error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {login.error.message}
        </div>
      )}

      <form onSubmit={handleSubmit((data) => login.mutate(data))} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex justify-end">
          <Link href={ROUTES.forgotPassword} className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" loading={login.isPending} className="w-full">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href={ROUTES.register} className="font-medium text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
