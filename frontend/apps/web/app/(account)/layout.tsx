import Link from 'next/link';
import { ROUTES } from '@zavora/config';

const NAV = [
  { href: ROUTES.orders, label: 'Orders' },
  { href: ROUTES.wishlist, label: 'Wishlist' },
  { href: ROUTES.addresses, label: 'Addresses' },
  { href: ROUTES.profile, label: 'Profile' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-8">
      <div className="grid gap-8 md:grid-cols-4">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4">
          <nav className="flex flex-col gap-1">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
