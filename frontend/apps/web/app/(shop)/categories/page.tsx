import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { categoriesApi } from '@zavora/api';
import { ROUTES } from '@zavora/config';

export const metadata: Metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  let categories: Awaited<ReturnType<typeof categoriesApi.list>> = [];
  try {
    categories = await categoriesApi.list();
  } catch {
    // API not yet connected — render empty state
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">All Categories</h1>
      {categories.length === 0 ? (
        <p className="text-sm text-slate-400">No categories available yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={ROUTES.category(cat.slug)}
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
            >
              {cat.image ? (
                <div className="relative h-14 w-14">
                  <Image src={cat.image} alt={cat.name} fill className="object-contain" />
                </div>
              ) : (
                <span className="text-4xl">🏷️</span>
              )}
              <div>
                <p className="text-sm font-medium text-slate-800">{cat.name}</p>
                {cat.productCount !== undefined && (
                  <p className="text-xs text-slate-400">{cat.productCount} products</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
