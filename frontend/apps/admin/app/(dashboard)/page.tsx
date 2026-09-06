import type { Metadata } from 'next';
import { ShoppingBag, Users, Package, DollarSign } from 'lucide-react';

export const metadata: Metadata = { title: 'Dashboard' };

const STATS = [
  { label: 'Total Orders', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
  { label: 'Total Customers', icon: Users, color: 'text-green-600 bg-green-50' },
  { label: 'Total Products', icon: Package, color: 'text-purple-600 bg-purple-50' },
  { label: 'Revenue', icon: DollarSign, color: 'text-orange-600 bg-orange-50' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back to Zavora Admin.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">—</p>
            <p className="mt-1 text-xs text-slate-400">Connect Django API to populate</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-slate-900">Recent Orders</h2>
          <p className="text-sm text-slate-400">Orders will appear here once the API is connected.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-slate-900">Top Products</h2>
          <p className="text-sm text-slate-400">Product stats will appear here once the API is connected.</p>
        </div>
      </div>
    </div>
  );
}
