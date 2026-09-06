'use client';

import { useQuery } from '@tanstack/react-query';
import { sellersApi } from '@zavora/api';

export default function AdminSellersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'sellers'],
    queryFn: sellersApi.list,
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Sellers</h1>

      <div className="rounded-xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Store</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.results.map((seller) => (
                <tr key={seller.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{seller.storeName}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {seller.user.firstName} {seller.user.lastName}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{seller.productCount}</td>
                  <td className="px-4 py-3">{seller.rating.toFixed(1)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${seller.isVerified ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {seller.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
