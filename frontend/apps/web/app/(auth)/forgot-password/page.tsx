'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@zavora/validation';
import { authApi } from '@zavora/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@zavora/config';

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordInput) => authApi.forgotPassword(data.email),
  });

  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-2 text-xl font-bold text-slate-900">Forgot password</h1>
      <p className="mb-6 text-sm text-slate-500">
        Enter your email and we&apos;ll send a reset link.
      </p>

      {mutation.isSuccess ? (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Check your email for a password reset link.
        </div>
      ) : (
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="flex flex-col gap-4">
          {mutation.error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {mutation.error.message}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" loading={mutation.isPending} className="w-full">
            Send Reset Link
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link href={ROUTES.login} className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
