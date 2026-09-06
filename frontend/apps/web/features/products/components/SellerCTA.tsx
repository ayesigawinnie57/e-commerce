import Link from 'next/link';
import { ROUTES } from '@zavora/config';
import { TrendingUp, Users, Package } from 'lucide-react';

export function SellerCTA() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 px-8 py-12 text-white sm:px-12">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-lg">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Grow Your Business With Zavora
          </h2>
          <p className="mt-3 text-orange-100">
            Reach more customers and grow your business by selling on Zavora. Join thousands of sellers already thriving on our platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { icon: Users, label: '500K+ Customers' },
              { icon: Package, label: '1M+ Products' },
              { icon: TrendingUp, label: 'Growing Daily' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-orange-100">
                <Icon className="h-4 w-4 text-amber-200" />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ROUTES.sellerRegister}
              className="rounded-xl bg-white px-7 py-3 text-sm font-bold text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Start Selling
            </Link>
            <Link
              href="/about"
              className="rounded-xl border-2 border-white px-7 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="hidden text-center lg:block">
          <div className="text-8xl">🏪</div>
          <p className="mt-2 text-sm font-medium text-orange-100">Open your store today</p>
        </div>
      </div>
    </section>
  );
}
