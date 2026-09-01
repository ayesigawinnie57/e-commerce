import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Customers' };

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Customer management requires a dedicated admin API endpoint from Django.
      </div>
    </div>
  );
}
