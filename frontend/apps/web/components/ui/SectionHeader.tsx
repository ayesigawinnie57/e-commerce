import Link from 'next/link';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

export function SectionHeader({ title, viewAllHref, viewAllLabel = 'View All →', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-5 flex items-center justify-between', className)}>
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
      {viewAllHref && (
        <Link href={viewAllHref} className="text-sm font-medium text-orange-500 hover:underline">
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}
