import Link from 'next/link';
import type { Banner } from '@zavora/types';

interface PromoBannerProps {
  banner?: Banner;
}

export function PromoBanner({ banner }: PromoBannerProps) {
  const title = banner?.title ?? 'Big Deals. Better Prices.';
  const subtitle = banner?.subtitle ?? 'Save more on selected products.';
  const buttonText = banner?.buttonText ?? 'Shop Deals';
  const buttonUrl = banner?.buttonUrl ?? '/deals';

  return (
    <section
      className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-12 text-white sm:px-12"
      style={banner?.backgroundColor ? { background: banner.backgroundColor } : undefined}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
          <p className="mt-1 text-slate-300">{subtitle}</p>
        </div>
        <Link
          href={buttonUrl}
          className="shrink-0 rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
