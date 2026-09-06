import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui';
import type { ProductListItem } from '@zavora/types';
import { cn } from '@/lib/cn';

interface ProductGridProps {
  products?: ProductListItem[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  columns?: 'default' | 'wide';
  className?: string;
}

const gridClass = {
  default: 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  wide: 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4',
};

export function ProductGrid({ products, loading, error, onRetry, columns = 'default', className }: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn(gridClass[columns], className)}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
            <Skeleton className="h-5 w-1/3 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <p className="text-sm text-slate-500">Unable to load products.</p>
        {onRetry && (
          <button onClick={onRetry} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (!products?.length) return null;

  return (
    <div className={cn(gridClass[columns], className)}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
