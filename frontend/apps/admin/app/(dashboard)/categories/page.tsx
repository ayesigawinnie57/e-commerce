'use client';

import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@zavora/api';

export default function AdminCategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: categoriesApi.list,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
          + Add Category
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Products</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{cat.name}</td>
                  <td className="px-4 py-3 text-slate-500">{cat.slug}</td>
                  <td className="px-4 py-3 text-slate-500">{cat.parent?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{cat.productCount ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
