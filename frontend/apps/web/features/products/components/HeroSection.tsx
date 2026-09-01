import Link from 'next/link';
import { ROUTES } from '@zavora/config';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-orange-500 to-amber-500">
      <div className="container-page">
        <div className="flex flex-col items-center gap-8 py-14 text-center md:flex-row md:items-center md:justify-between md:py-20 md:text-left">
          {/* Text */}
          <div className="max-w-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-100">
              Africa's Marketplace
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Everything You Need,<br />
              <span className="text-amber-200">In One Place.</span>
            </h1>
            <p className="mt-4 text-lg text-orange-100">
              Shop quality products from trusted sellers at great prices.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href={ROUTES.products}
                className="rounded-xl bg-white px-7 py-3 text-base font-bold text-orange-500 shadow-md hover:bg-orange-50 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/categories"
                className="rounded-xl border-2 border-white px-7 py-3 text-base font-bold text-white hover:bg-white/10 transition-colors"
              >
                Explore Categories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 md:justify-start">
              {['10K+ Sellers', '1M+ Products', 'Fast Delivery'].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-orange-100">
                  <span className="text-amber-200">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Visual placeholder — replace with real banner image */}
          <div className="hidden w-full max-w-sm overflow-hidden rounded-2xl bg-white/20 shadow-2xl md:block">
            <div className="flex aspect-[4/3] items-center justify-center">
              <div className="text-center text-white">
                <div className="text-7xl">🛍️</div>
                <p className="mt-3 text-lg font-bold">Shop Everything</p>
                <p className="text-sm text-orange-100">Fashion · Electronics · Home</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
