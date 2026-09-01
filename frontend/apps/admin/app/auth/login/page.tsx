import type { Metadata } from 'next';
import { AdminLoginForm } from './LoginForm';

export const metadata: Metadata = { title: 'Admin Login' };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <AdminLoginForm />
    </div>
  );
}
